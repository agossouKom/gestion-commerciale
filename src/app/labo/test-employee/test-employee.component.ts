import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-test-employee',
  templateUrl: './test-employee.component.html',
  styleUrls: ['./test-employee.component.css']
})
export class TestEmployeeComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
   // throw new Error('Method not implemented.');
  }
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEmployeeButton') addEmployeeButton: any;
  title = 'Test Employee';

  public employeeList: Employee[] = [
    {
      firstName: 'Damien',
      lastName: 'Developer expert',
      emailId: 'M',
    },
    {
      firstName: 'rirani',
      lastName: 'Developer',
      emailId: 'M',
    },
  ];

  employeeForm: FormGroup;

  employees: Employee[];
  employeesToDisplay: Employee[];
  educationOptions = [
    '10th pass',
    'diploma',
    'graduate',
    'post graduate',
    'PhD',
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = fb.group({});
    this.employees = [];
    this.employeesToDisplay = this.employees;
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      emailId: this.fb.control(''),
    });
    this.employeesToDisplay = this.employeeList;
    /*    this.employeeService.getEmployees().subscribe((res) => {
      for (let emp of res) {
        this.employees.unshift(emp);
      }
      this.employeesToDisplay = this.employees;
    }); */
  }

  addEmployee() {
    let employee: Employee = {
      firstName: this.FirstName.value,
      lastName: this.LastName.value,
      emailId: this.BirthDay.value,
    };
    this.employeeService.postEmployee(employee).subscribe((res) => {
      this.employees.unshift(res);
      this.clearForm();
    });
  }

  removeEmployee(event: any) {
    this.employees.forEach((val, index) => {
      if (val.id === parseInt(event)) {
        this.employeeService.deleteEmployee(event).subscribe((res) => {
          this.employees.splice(index, 1);
        });
      }
    });
  }

  editEmployee(event: any) {
    this.employees.forEach((val, ind) => {
      if (val.id === event) {
        this.setForm(val);
      }
    });
    this.removeEmployee(event);
    this.addEmployeeButton.nativeElement.click();
  }

  setForm(emp: Employee) {
    this.FirstName.setValue(emp.firstName);
    this.LastName.setValue(emp.lastName);
    this.BirthDay.setValue(emp.emailId);
  }

  searchEmployees(event: any) {
    let filteredEmployees: Employee[] = [];

    if (event === '') {
      this.employeesToDisplay = this.employees;
    } else {
      filteredEmployees = this.employees.filter((val, index) => {
        let targetKey =
          val.firstName?.toLowerCase() + '' + val.lastName?.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.employeesToDisplay = filteredEmployees;
    }
  }

  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
   // this.emailId.setValue('');
  }

  public get FirstName(): FormControl {
    return this.employeeForm.get('firstName') as FormControl;
  }

  public get LastName(): FormControl {
    return this.employeeForm.get('lastName') as FormControl;
  }
  public get BirthDay(): FormControl {
    return this.employeeForm.get('emailId') as FormControl;
  }


}

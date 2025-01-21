import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../employee';

@Component({
  selector: 'app-vue-test-employee',
  templateUrl: './vue-test-employee.component.html',
  styleUrls: ['./vue-test-employee.component.css']
})
export class VueTestEmployeeComponent {
  @Input() employee: Employee;
  @Output() onRemoveEmployee = new EventEmitter<number>();
  @Output() onEditEmployee = new EventEmitter<number>();

  constructor() {
    this.employee = {
      firstName: '',
      lastName: '',
      emailId: '',

    };
  }

  ngOnInit(): void {
   console.log(this.employee);
  }

  deleteEmployeeClicked() {
    this.onRemoveEmployee.emit(this.employee.id);
  }

  editEmployeeClicked(){
    this.onEditEmployee.emit(this.employee.id);
  }
}

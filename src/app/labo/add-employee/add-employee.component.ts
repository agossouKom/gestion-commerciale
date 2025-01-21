import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Save';
  title: string = 'New Employee';

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id > 0) {
      this.loadData();
      this.btnText = 'Update';
      this.title = 'Edit Employee';
    }

    this.formadd = this.formBuilder.group({
      id: 0,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
  }

  loadData() {
    this.empService
      .getById(this.id)
      .subscribe((x) => this.formadd.patchValue(x));
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formadd.invalid) {
      return;
    }

    this.loading = true;

    if (this.id > 0) {
    //  this.empService.update(this.formadd.value).subscribe((data) => {
      //  this.btnCancel();
     /// });

        this.empService
          .update(this.formadd.value.id, this.formadd.value)
          .subscribe((data) => {
            this.btnCancel();
            this.loadData();
            this.router.navigate(['employeList']);
          });

    } else {
      this.empService.create(this.formadd.value).subscribe((data) => {
        this.btnCancel();
      });
      this.router.navigate(['employeList']);
    }
  }
 
  btnCancel() {
    this.router.navigate(['employeList']);
  }
}
//employeList

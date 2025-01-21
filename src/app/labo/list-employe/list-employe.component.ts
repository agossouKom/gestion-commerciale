import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Observable, first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.css']
})
export class ListEmployeComponent {
  employees!: Employee[];
    totalrow: number = 0;

    constructor(private empService: EmployeeService,) { }

    ngOnInit(): void {
        this.loadEmployee();
    }

    loadEmployee() {
        this.empService.getAll().pipe(first())
            .subscribe(d => {
                this.employees = d;
                this.totalrow = d.length;
            });
            console.log( this.employees);
    }

    delete(emp: Employee) {
        this.empService.delete(emp.id).pipe(first())
            .subscribe(() => {
                this.loadEmployee();
            })
    }
}

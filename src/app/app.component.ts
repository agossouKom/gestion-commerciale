import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from './labo/employee';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from './labo/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'gestion-commerciale';
}

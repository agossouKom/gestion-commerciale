import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pays } from 'src/app/my-modele/pays';
import { PaysService } from 'src/app/my-service/pays.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  usersList: Pays[] = [];
  headArray1 = [
    { Head: 'User Name', FieldName: 'name' },
    { Head: 'Email', FieldName: 'email' },
    { Head: 'Contact', FieldName: 'phone' },
    { Head: 'Website', FieldName: 'website' },
    { Head: 'Action', FieldName: '' },
  ];
  headArray = [
    { Head: 'Country Name', FieldName: 'nomPays' },
    { Head: 'Currency', FieldName: 'devise' },
  ];
  constructor(private http: HttpClient, public paysService: PaysService,) {}

  ngOnInit(): void {
 
  }
 
  loadUsers() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((result: any) => {
        this.usersList = result;
      });
  }

  editUser(item: any) {
   // debugger;
   console.log(item.id);
  }
  deleteUser(item: any) {
    debugger;
  }
}

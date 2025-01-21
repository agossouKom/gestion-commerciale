import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, first } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatePaysComponent } from '../create-pays/create-pays.component';
import { PaysService } from 'src/app/my-service/pays.service';
import {  Pays } from 'src/app/my-modele/pays';
import { HttpHeaders } from '@angular/common/http';
import { DeviseService } from 'src/app/my-service/devise.service';
import { Devise } from 'src/app/my-modele/devise';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-list-pays',
  templateUrl: './list-pays.component.html',
  styleUrls: ['./list-pays.component.css'],
})
export class ListPaysComponent {
  entitiForm: FormGroup;

  deviseTab: Array<Devise> = [];
  pays: Pays = new Pays();
  devise: Devise = new Devise();
  paysListe!: Pays[];
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  afficherTout:String="Afficher les données supprimées";
  titre:String="Pays d'origine";

  control: FormControl = new FormControl('');
  constructor(
    public paysService: PaysService,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public deviseService: DeviseService, private userInfoService:UserInfoService,
  ) {
    this.entitiForm = fb.group({});
  //  this.paysListe = [];
  }
  message:String="";
  checkLoading = false;

  paysTest: Pays[] = [];

  ngOnInit() {
    this.loadActif();

       this.userInfoService.sleep(this.userInfoService.ms).then(() => {
        this.checkLoading = true;
        this.message= this.userInfoService.message;
           if(this.totalrow>0){
           this.checkLoading= false;
          }
          // console.log('data   = ', data);
      });
    //let projectNames = this.paysTest.map(((item:any)  => {
     //  return item.devise.libelleDevise;
  //  }));
   // console.log('test:',projectNames);
  }
  afficherTouteLesDonnees(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      this.loadEntity();
    } else {
      this.isCheckedShowAllRecord = false;
      this.loadActif();
    }
  }
  loadEntity() {
    this.paysService
      .getAll()
      .pipe(first())
      .subscribe((userData) => {
        this.paysTest = userData;
    //    console.log(this.paysTest);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.paysService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.paysTest = userData;
      //  console.log(this.paysTest);
      //  console.log(userData);
        this.totalrow = userData.length;
      });
  }
  delete(data: Pays) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.paysService
      .delete(data.idPays)
      .pipe(first())
      .subscribe(() => {
        // this.loadEntity();
        this.loadActif();
      },
      (error) => console.log(error));
    }

  }

  restore(data: Pays) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.paysService
      .redo(data.idPays)
      .pipe(first())
      .subscribe(() => {
        // this.loadEntity();
        this.loadActif();
      },
      (error) => console.log(error));
    }
  }


  getData() {
    this.paysService.getAll().subscribe((response) => {
      this.paysService.listData = response;
    //  console.log(response);
    });
   // console.log(this.paysService.listData);
  }


//  routerLink="/pays/edit/{{ dataList.idPays }}"
  update(id: number) {
    this.router.navigate(['/pays/edit/', id]);
  }

  loadDevise() {
    this.deviseService.getAll().subscribe(
      (response) => {
        this.deviseTab = response;
        console.log(this.devise);
      },
      //  (error) => this.toastr.warning('Login Incorrecte ')
      (error) => console.log(error)
    );
  }
}

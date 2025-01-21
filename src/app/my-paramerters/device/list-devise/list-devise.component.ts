import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DeviseService } from 'src/app/my-service/devise.service';
import { first } from 'rxjs';
import { Devise } from 'src/app/my-modele/devise';
import { Utilisateur } from 'src/app/my-modele/utlilisateur';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-list-devise',
  templateUrl: './list-devise.component.html',
  styleUrls: ['./list-devise.component.css'],
})
export class ListDeviseComponent {
  entitiForm: FormGroup;
  isCheckedShowAllRecord = false;
  devise!: Devise[];
  dataToDisplay: Devise[];
  totalrow: number = 0;
  message:String="";
  checkLoading = false;
  constructor(
    public deviseService: DeviseService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private router: Router, private userInfoService:UserInfoService,
  ) {
    this.entitiForm = fb.group({});
    this.devise = [];
    this.dataToDisplay = this.devise;
  }

 
  ngOnInit(): void {
    this.loadActif();
    this.dataToDisplay = this.devise;
    this.userInfoService.sleep(this.userInfoService.ms).then(() => {
      this.checkLoading = true;
      this.message= this.userInfoService.message;
      if(this.totalrow>0){
        this.checkLoading= false;
       }
        // console.log('data   = ', data);
    });
  }
  toggleEditable(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      this.loadEntity();
    } else {
      this.isCheckedShowAllRecord = false;
      this.loadActif();
    }
  }
  loadEntity() {
    this.deviseService
      .getAll()
      .pipe(first())
      .subscribe((userData) => {
        this.devise = userData;
        console.log(this.devise);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.deviseService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.devise = userData;
        console.log(this.devise);
        this.totalrow = userData.length;
      });
  }

  delete(data: Devise) {
    this.deviseService
      .delete(data.id)
      .pipe(first())
      .subscribe(() => {
        // this.loadEntity();
        this.loadActif();
      });
  }

 

  restore(data: Devise) {
    this.deviseService
      .redo(data.id)
      .pipe(first())
      .subscribe(() => {
        // this.loadEntity();
        this.loadActif();
      });
  }



  searchEmployees(event: any) {
  let   filtreur: Devise[] = [];

    if (event === '') {
      this.dataToDisplay = this.devise;
    } else {
      filtreur = this.devise.filter((val, index) => {
        let targetKey =
          val.libelleDevise?.toLowerCase() ;
        let searchKey = event.toLowerCase();
        console.log(targetKey);
        return targetKey.includes(searchKey);
      });
      this.dataToDisplay = filtreur;
    }
  }

}

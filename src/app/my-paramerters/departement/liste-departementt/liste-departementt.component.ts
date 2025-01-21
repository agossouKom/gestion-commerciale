import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Departement } from 'src/app/my-modele/departement';
import { Devise } from 'src/app/my-modele/devise';
import { Pays } from 'src/app/my-modele/pays';
import { DepartementService } from 'src/app/my-service/departement.service';
import { DeviseService } from 'src/app/my-service/devise.service';
import { PaysService } from 'src/app/my-service/pays.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-liste-departementt',
  templateUrl: './liste-departementt.component.html',
  styleUrls: ['./liste-departementt.component.css']
})

export class ListeDepartementtComponent {
  entitiForm: FormGroup;

  payTab: Array<Pays> = [];
 departement: Departement = new Departement();
  pays: Pays = new Pays();
  departementListe!: Departement[];
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  message:String="";
  checkLoading = false;
  afficherTout:String="Afficher les données supprimées";
  titre:String="Departements";

  control: FormControl = new FormControl('');
  constructor(
    public departementService: DepartementService,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public paysService: PaysService, private userInfoService:UserInfoService,
  ) {
    this.entitiForm = fb.group({});
    this.departementListe = [];
  }

  departements: Departement[] = [];

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

   // let projectNames = this.departements.map(((item:any)  => {
    //   return item.devise.libelleDevise;
   // }));
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
    this.departementService
      .getAll()
      .pipe(first())
      .subscribe((userData) => {
        this.departements = userData;
    //    console.log(this.DepartementTest);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.departementService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.departements = userData;
      //  console.log(this.DepartementTest);
      //  console.log(userData);
        this.totalrow = userData.length;
      });
  }
  delete(data: Departement) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.departementService
      .delete(data.id)
      .pipe(first())
      .subscribe(() => {
        // this.loadEntity();
        this.loadActif();
      },
      (error) => console.log(error));
    }

  }

  restore(data: Departement) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.departementService
      .redo(data.id)
      .pipe(first())
      .subscribe(() => {
        // this.loadEntity();
        this.loadActif();
      },
      (error) => console.log(error));
    }
  }


  getData() {
    this.departementService.getAll().subscribe((response) => {
      this.departementListe = response;
    //  console.log(response);
    });
   // console.log(this.DepartementService.listData);
  }


//  routerLink="/Departement/edit/{{ dataList.idDepartement }}"
  update(id: number) {
    this.router.navigate(['/departement/edit/', id]);
  }

  loadDevise() {
    this.paysService.getAll().subscribe(
      (response) => {
        this.payTab = response;
       // console.log(this.pays);
      },
      //  (error) => this.toastr.warning('Login Incorrecte ')
      (error) => console.log(error)
    );
  }
}

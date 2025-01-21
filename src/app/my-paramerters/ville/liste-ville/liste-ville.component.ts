import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Departement } from 'src/app/my-modele/departement';
import { Pays } from 'src/app/my-modele/pays';
import { Ville } from 'src/app/my-modele/ville';
import { DepartementService } from 'src/app/my-service/departement.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';
import { VilleService } from 'src/app/my-service/ville.service';

@Component({
  selector: 'app-liste-ville',
  templateUrl: './liste-ville.component.html',
  styleUrls: ['./liste-ville.component.css']
})
export class ListeVilleComponent {
  entitiForm: FormGroup;

  depArray: Array<Departement> = [];
  departement: Departement = new Departement();
  ville: Ville = new Ville();
  departementListe!: Departement[];
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  afficherTout:String="Afficher les données supprimées";
  titre:String="Villes";

  message:String="";
  checkLoading = false;

  control: FormControl = new FormControl('');
  constructor(
   // public departementService: DepartementService,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public villeService: VilleService,  private userInfoService:UserInfoService,

  ) {
    this.entitiForm = fb.group({});
   // this.departementListe = [];
  }

  villes: Ville[] = [];

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
    this.villeService
      .getAll()
      .pipe(first())
      .subscribe((userData) => {
        this.villes = userData;
    //    console.log(this.paysTest);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.villeService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.villes = userData;
      //  console.log(this.paysTest);
      //  console.log(userData);
        this.totalrow = userData.length;
      });
  }
  delete(data: Ville) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.villeService
      .delete(data.idVille)
      .pipe(first())
      .subscribe(() => {
        this.loadActif();
      },
      (error) => console.log(error));
    }

  }

  restore(data: Ville) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.villeService
      .redo(data.idVille)
      .pipe(first())
      .subscribe(() => {
        // this.loadEntity();
        this.loadActif();
      },
      (error) => console.log(error));
    }
  }




//  routerLink="/pays/edit/{{ dataList.idPays }}"
  update(id: number) {
    this.router.navigate(['/ville/edit/', id]);
  }


}

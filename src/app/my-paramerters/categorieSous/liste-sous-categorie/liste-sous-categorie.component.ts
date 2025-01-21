import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Arrondissement } from 'src/app/my-modele/arrondissement';
import { Quartier } from 'src/app/my-modele/quartier';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { CategorieService } from 'src/app/my-service/categorie.service';
import { SouscategorieService } from 'src/app/my-service/souscategorie.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-liste-sous-categorie',
  templateUrl: './liste-sous-categorie.component.html',
  styleUrls: ['./liste-sous-categorie.component.css']
})
export class ListeSousCategorieComponent {
  entitiForm: FormGroup;

  ArrondissementeArray: Array<Arrondissement> = [];

  sousCategorie: SousCategorie[] = [];
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  afficherTout:String="Afficher les données supprimées";
  titre:String="Sous categories";
  message:String="";
  checkLoading = false;

  control: FormControl = new FormControl('');
  constructor(
   // public departementService: DepartementService,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public service: SouscategorieService,
    private userInfoService:UserInfoService,
  ) {
    this.entitiForm = fb.group({});
    //this.departementListe = [];
  }



  ngOnInit() {
    this.loadActif();
   // let projectNames = this.ville.map(((item:any)  => {
    //   return item.Ville.libelleVille;
   // }));
   // console.log('test:',projectNames);
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
    this.service
      .getAll()
      .pipe(first())
      .subscribe((userData) => {
        this.sousCategorie = userData;
    //    console.log(this.paysTest);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.sousCategorie = userData;
      //  console.log(this.paysTest);
      //  console.log(userData);
        this.totalrow = userData.length;
      });
  }
  delete(data: SousCategorie) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.service
      .delete(data.id)
      .pipe(first())
      .subscribe(() => {
        this.loadActif();
      },
      (error) => console.log(error));
    }

  }

  restore(data: SousCategorie) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.service
      .redo(data.id)
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
    this.router.navigate(['/sousCategorie/edit/', id]);
  }
}

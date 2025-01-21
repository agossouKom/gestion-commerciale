import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Arrondissement } from 'src/app/my-modele/arrondissement';
import { Categosie } from 'src/app/my-modele/categosie';
import { Quartier } from 'src/app/my-modele/quartier';
import { CategorieService } from 'src/app/my-service/categorie.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-listed-categorie',
  templateUrl: './listed-categorie.component.html',
  styleUrls: ['./listed-categorie.component.css']
})
export class ListedCategorieComponent {
  entitiForm: FormGroup;

  ArrondissementeArray: Array<Arrondissement> = [];

 categosie: Categosie[] = [];
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  afficherTout:String="Afficher les données supprimées";
  titre:String="Categories";
  message:String="";
  checkLoading = false;
  control: FormControl = new FormControl('');
  constructor(
   // public departementService: DepartementService,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public service: CategorieService,
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
        this.categosie = userData;
    //    console.log(this.paysTest);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.categosie = userData;
      //  console.log(this.paysTest);
      //  console.log(userData);
        this.totalrow = userData.length;
      });
  }
  delete(data: Categosie) {
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

  restore(data: Categosie) {
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
    this.router.navigate(['/categorie/edit/', id]);
  }
}

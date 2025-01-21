import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Arrondissement } from 'src/app/my-modele/arrondissement';
import { Ville } from 'src/app/my-modele/ville';
import { ArrondissementService } from 'src/app/my-service/arrondissement.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-liste-arrondissementt',
  templateUrl: './liste-arrondissementt.component.html',
  styleUrls: ['./liste-arrondissementt.component.css'],
})
export class ListeArrondissementtComponent {
  entitiForm: FormGroup;

  villeArray: Array<Ville> = [];
  //ville: Ville = new Ville();
  // arrondissementt!: Arrondissementt[];
  arrondissements: Arrondissement[] = [];
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  message: String = '';
  checkLoading = false;
  afficherTout: String = 'Afficher les données supprimées';
  titre: String = 'Arrondissement';
  control: FormControl = new FormControl('');
  constructor(
    // public departementService: DepartementService,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public arrondissementtService: ArrondissementService,
    private userInfoService: UserInfoService
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
    this.arrondissementtService
      .getAll()
      .pipe(first())
      .subscribe((userData) => {
        this.arrondissements = userData;
        //    console.log(this.paysTest);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.arrondissementtService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.arrondissements = userData;
        //  console.log(this.paysTest);
        //  console.log(userData);
        this.totalrow = userData.length;
      });
  }
  delete(data: Arrondissement) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.arrondissementtService
        .delete(data.idArr)
        .pipe(first())
        .subscribe(
          () => {
            this.loadActif();
          },
          (error) => console.log(error)
        );
    }
  }

  restore(data: Ville) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.arrondissementtService
        .redo(data.idVille)
        .pipe(first())
        .subscribe(
          () => {
            // this.loadEntity();
            this.loadActif();
          },
          (error) => console.log(error)
        );
    }
  }

  //  routerLink="/pays/edit/{{ dataList.idPays }}"
  update(id: number) {
    console.log(id);
    //  routerLink="/arrondissement/edit/{{ dataList.idArr }}"
    this.router.navigate(['/arrondissement/edit/', id]);
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AnneeExercice } from 'src/app/my-modele/AnneeExercice';

import { Devise } from 'src/app/my-modele/devise';
import { Pays } from 'src/app/my-modele/pays';
import { TvaGlobale } from 'src/app/my-modele/tva-globale';
import { AnneeService } from 'src/app/my-service/annee.service';
import { TvaGlobaleService } from 'src/app/my-service/tva-globale.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-liste-tva-globale',
  templateUrl: './liste-tva-globale.component.html',
  styleUrls: ['./liste-tva-globale.component.css'],
})
export class ListeTvaGlobaleComponent {
  entitiForm: FormGroup;

  anneeTab: Array<AnneeExercice> = [];
  tvaGlobale: TvaGlobale = new TvaGlobale();

  paysListe!: TvaGlobale[];
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  afficherTout: String = 'Afficher les données supprimées';
  titre: String = 'TVA de façon générale';

  control: FormControl = new FormControl('');
  constructor(
    public service: TvaGlobaleService,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public anneeService: AnneeService,
    private userInfoService: UserInfoService,
  ) {
    this.entitiForm = fb.group({});
    this.paysListe = [];
  }

  message: String = '';
  checkLoading = false;

  tvaGlobales: TvaGlobale[] = [];

  ngOnInit() {
    this.loadActif();
    let projectNames = this.tvaGlobales.map((item: any) => {
      return item.devise.libelleDevise;
    });
    // console.log('test:',projectNames);

    this.userInfoService.sleep(this.userInfoService.ms).then(() => {
      this.checkLoading = true;
      this.message = this.userInfoService.message;
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
        this.tvaGlobales = userData;
        //    console.log(this.tvaGlobales);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.tvaGlobales = userData;
        //  console.log(this.tvaGlobales);
        //  console.log(userData);
        this.totalrow = userData.length;
      });
  }
  delete(data: TvaGlobale) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.service
        .delete(data.id)
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

  restore(data: TvaGlobale) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.service
        .redo(data.id)
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
    this.router.navigate(['/tvaGlobale/edit/', id]);
  }

  loadAnnee() {
    this.anneeService.getAll().subscribe(
      (response) => {
        this.anneeTab = response;
      },
      //  (error) => this.toastr.warning('Login Incorrecte ')
      (error) => console.log(error)
    );
  }
}

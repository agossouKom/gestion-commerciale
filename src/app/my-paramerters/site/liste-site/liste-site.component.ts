import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Pays } from 'src/app/my-modele/pays';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { Ville } from 'src/app/my-modele/ville';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-liste-site',
  templateUrl: './liste-site.component.html',
  styleUrls: ['./liste-site.component.css'],
})
export class ListeSiteComponent {
  entitiForm: FormGroup;

  siteDeVente: Array<SiteDeVente> = [];
  paysListe!: Pays[];
  villeListe!: Ville[];
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  afficherTout: String = 'Afficher les données supprimées';
  titre: String = 'Sitede vente';

  control: FormControl = new FormControl('');
  constructor(
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public service: SitevDeVenteService,
    private userInfoService: UserInfoService
  ) {
    this.entitiForm = fb.group({});
    this.paysListe = [];
  }
  message:String="";
  checkLoading = false;
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
    this.service
      .getAll()
      .pipe(first())
      .subscribe((userData) => {
        this.siteDeVente = userData;
        //    console.log(this.paysTest);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.siteDeVente = userData;
        //  console.log(this.paysTest);
        //  console.log(userData);
        this.totalrow = userData.length;
      });
  }
  delete(data: SiteDeVente) {
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

  restore(data: SiteDeVente) {
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
    this.router.navigate(['/siteDeVente/edit/', id]);
  }

  loadDevise() {
    this.service.getAll().subscribe(
      (response) => {
        this.siteDeVente = response;
        console.log(this.siteDeVente);
      },
      //  (error) => this.toastr.warning('Login Incorrecte ')
      (error) => console.log(error)
    );
  }
}

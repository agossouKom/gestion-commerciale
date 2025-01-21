import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Sortie } from 'src/app/my-modele/sortie';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { SortieService } from 'src/app/my-service/sortie.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-listing-vente',
  templateUrl: './listing-vente.component.html',
  styleUrls: ['./listing-vente.component.css'],
})
export class ListingVenteComponent {
  entitiForm: FormGroup;
  userRole = false;
  isAdmin = false;
  isUser = false;
  role: any;

  sorties: Array<Sortie> = [];
  rowPerPage: number = 10;

  sortiesParSite: Array<any> = [];
  sousCategorie!: SousCategorie;

  siteId: any;
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  afficherTout: String = 'Afficher les données supprimées';
  titre: String = 'Liste des ventes';

  control: FormControl = new FormControl('');
  constructor(
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public service: SortieService,
    public userInfoService: UserInfoService,
    public sitevDeVenteService: SitevDeVenteService
  ) {
    this.entitiForm = fb.group({});
    let site = localStorage.getItem('user_site_id');
    let user_site_id = this.userInfoService.user_site_id;
    //  this.selected_article_id = this.userInfoService.selected_article_id;
    this.siteId = Number(user_site_id);

    let roles = localStorage.getItem('user_roles');
    this.role = roles;
  }

  message: String = 'Chargement en cours...';

  ngOnInit() {
    /// this.loadActif();
    this.getByPointOfSall(this.siteId);
    this.userRole = this.userInfoService.userRole(this.role);
  }
  afficherTouteLesDonnees(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      // this.loadEntity();
      this.loadAllSalleBySite(this.siteId);
    } else {
      this.isCheckedShowAllRecord = false;
      //  this.loadActif();
      this.getByPointOfSall(this.siteId);
    }
  }

  reportPage() {
    this.router.navigate(['report']);
  }

  loadAllSalleBySite(id: any) {
    this.service
      .toutesLesVentes(id)
      .pipe(first())
      .subscribe((userData) => {
        this.sortiesParSite = userData;

        console.log('all sorties   ', this.sortiesParSite);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.sorties = userData;
        //  console.log(this.paysTest);
        //  console.log(userData);
        this.totalrow = userData.length;
      });
  }
  delete(data: Sortie) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.service
        .delete(data.id)
        .pipe(first())
        .subscribe(
          () => {
            // this.loadEntity();
            //  this.loadActif();
            this.getByPointOfSall(this.siteId);
          },
          (error) => console.log(error)
        );
    }
  }

  restore(data: Sortie) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.service
        .redo(data.id)
        .pipe(first())
        .subscribe(
          () => {
            // this.loadEntity();
            // this.loadActif();
            this.getByPointOfSall(this.siteId);
          },
          (error) => console.log(error)
        );
    }
  }

  details(id: number) {
    this.router.navigate(['detailSortie', id]);
    this.getByPointOfSall(this.siteId);
  }
  //  routerLink="/pays/edit/{{ dataList.idPays }}"
  update(id: number) {
    this.router.navigate(['/sortie/edit/', id]);
    this.getByPointOfSall(this.siteId);
  }

  getByPointOfSall(id: any) {
    this.service.getSiteVenteId(id).subscribe(
      (data: any) => {
        this.sortiesParSite = data;
        this.totalrow = this.sortiesParSite.length;
        //      this.totaClient = this.clients?.length;
        this.getBSiteDeVente(this.siteId);
        console.log('sortiesParSite   ', this.sortiesParSite);
      },
      (error: any) => console.log(error)
    );
  }

  //sitevDeVenteService
  siteDeVente: any;
  libelleSite: any;
  getBSiteDeVente(id: any) {
    this.sitevDeVenteService.getById(id).subscribe(
      (data: any) => {
        this.siteDeVente = data;
        this.libelleSite = this.siteDeVente.lib_site;
        //      this.totaClient = this.clients?.length;
        console.log('sortiesParSite   ', this.sortiesParSite);
      },
      (error: any) => console.log(error)
    );
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { Sortie } from 'src/app/my-modele/sortie';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { Base64convertorService } from 'src/app/my-service/base64convertor.service';
import { EntreeMarchandiseService } from 'src/app/my-service/entree-marchandise.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { SortieService } from 'src/app/my-service/sortie.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';
import { UtilisateurService } from 'src/app/my-service/utilisateur.service';

@Component({
  selector: 'app-point-par-site',
  templateUrl: './point-par-site.component.html',
  styleUrls: ['./point-par-site.component.css']
})
export class PointParSiteComponent {
  [x: string]: any;
  formadd: FormGroup;
  selectedItem?: any;
  sorties: Array<Sortie> = [];
  rowPerPage: number = 10;
  id!: number;
  sortiesParSite: Array<any> = [];
  sousCategorie!: SousCategorie;
  submitted = false;
  siteId: any;
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  afficherTout: String = 'Afficher les données supprimées';
  titre: String = 'Point des sorties entre deux dates et par site';

  userRole = false;
  isAdmin = false;
  isUser = false;
  role: any;


  siteDeVentes: SiteDeVente[] = [];
  entreeMarchandise: Array<any> = [];
  control: FormControl = new FormControl('');
  constructor(
    public toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    public fb: FormBuilder,
    public service: SortieService,
    public userInfoService: UserInfoService,
    public utilisateurService: UtilisateurService,
    public entreeMarchandiseService: EntreeMarchandiseService,
    public base64convertorService: Base64convertorService,
    public sitevDeVenteService: SitevDeVenteService
  ) {
    this.formadd = fb.group({});
    let site = localStorage.getItem('user_site_id');
    let user_site_id = this.userInfoService.user_site_id;
    //  this.selected_article_id = this.userInfoService.selected_article_id;
    this.siteId = Number(user_site_id);
    let roles = localStorage.getItem('user_roles');
    this.role = roles;
  }
  dataxx?: string;
  message: String = 'Chargement en cours...';

  ngOnInit() {
    this.loadActif();
    this.getByPointOfSall(this.siteId);
    this.loaSiteVente();
    this.loadArticle();
    this.userRole = this.userInfoService.userRole(this.role);
  }

  loaSiteVente() {
    this.utilisateurService
      .getActifSiteVente()
      .pipe(first())
      .subscribe((userData) => {
        this.siteDeVentes = userData;
        console.log('siteDeVentes', this.siteDeVentes);
      });
  }

  loadArticle() {
    this.entreeMarchandiseService
      .getReceptioned()
      .pipe(first())
      .subscribe((userData) => {
        this.entreeMarchandise = userData;
        console.log('entreeMarchandise liste', this.entreeMarchandise);
      });
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

  get f() {
    return this.formadd.controls;
  }

  loadAllSalleBySite(id: any) {
    this.service
      .toutesLesVentes(id)
      .pipe(first())
      .subscribe((userData) => {
        // this.sortiesParSite = userData;
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

  isLoading = false;
  loading = false;
  sortieObj: any;
  siteObject: any;
  siteName: any;

  article: Sortie | undefined;
  selectedItemFin: any;
  selectedItemArticle: any;
  selectedItemSite: any;
  debutDate: any;
  finDate: any;
  montantTotalX: number = 0;
  montantTotal = [];
  mgetontantTotal: number = 0;
  isSuccessLoadByDate = false;

  getSelectedItemValue(event: any) {
    if (this.selectedItem != null) {
      this.sortieObj = this.selectedItem;
      this.debutDate = this.selectedItem?.datesortie;
      console.log('selectedItem   for debut: ', this.debutDate);
    }
  }


  getSelectedItemValueFin(event: any) {
    if (this.selectedItemFin != null) {
      this.isSuccessLoadByDate = true;

      this.sortieObj = this.selectedItemFin;
      this.finDate = this.selectedItemFin?.datesortie;

      console.log('selectedItemFin   for fin date: ', this.finDate);
    }
  }


  //----------------------------------
  getSelectedItemValueArticle(event: any) {
    if (this.selectedItemArticle != null) {
      this.article = this.selectedItemArticle?.id;
      console.log('selectedItem   for article: ', this.article);
    }
  }

  getSelectedItemValueSite(event: any) {
    if (this.selectedItemSite != null) {
      /* !!!: alert */
      this.siteObject = this.selectedItemSite?.id;

      this.siteName = this.selectedItemSite?.lib_site;
      if (
        this.debutDate != null &&
        this.finDate != null
        &&
        this.siteObject != null
      ) {
        this.getSortieInTwoDate(this.debutDate, this.finDate, this.siteObject);
      }
      console.log('selectedItem   for siteObject: ', this.siteObject);
    }
  }
  clicled = false;
  genAnOpenBtnDeuxDate() {
    if (
      this.debutDate != null &&
      this.finDate != null &&
      this.siteObject != null
    ) {
      this.clicled = true;
      this.generateReport(this.debutDate, this.finDate, this.siteObject);
    }
  }
  printer = false;
  generateReport(debut: any, fin: any, site: any) {
    this.service.genOpen_filterParSite(this.debutDate, this.finDate, this.siteObject).subscribe(
      (data: any) => {
        console.log('data =   ', data);
        console.log("Status " + data.code);
        console.log("data.object =  " + data.object);
        console.log(" this.siteObject =  " + this.siteObject);
        console.log(" this.debutDate =  " + this.debutDate);
        if (data.code == 200) {
          // this.base64convertorService.getImage(data.object, this.debutDate, this.siteName);
          // this.printer =
          this.base64convertorService.printPdf(data.object);
          // this.base64convertorService.downloadPdf(data.object, this.debutDate, this.siteName);
        }


      },
      (error: any) => console.log(error)
    );
  }

  getSortieInTwoDate(debut: any, fin: any, site: any) {
    this.service.filterParSite(debut, fin, site).subscribe(
      (data: any) => {
        //  this.sorties = data;
        this.sortiesParSite = [{}];
        this.sortiesParSite = data;
        this.montantTotalX = 0;
        for (let i = 0; i < this.sortiesParSite.length; i++) {
          this.mgetontantTotal = this.sortiesParSite[i].montantttc;
          this.montantTotalX += this.mgetontantTotal;
        }

        console.log('montantTotalX', this.montantTotalX);
        //  console.log(userData);
        this.totalrow = data.length;

        console.log('sorties =   ', this.sortiesParSite);
      },
      (error: any) => console.log(error)
    );
  }




}

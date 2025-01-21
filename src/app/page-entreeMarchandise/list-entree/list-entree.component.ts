import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Article } from 'src/app/my-modele/article';
import { Categosie } from 'src/app/my-modele/categosie';
import { EntreeMarchandise } from 'src/app/my-modele/entree-marchandise';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { Marchandise } from 'src/app/my-modele/marchandise';
import { ModeReglement } from 'src/app/my-modele/mode-reglement';
import { Photo } from 'src/app/my-modele/photo';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { UniteMesure } from 'src/app/my-modele/unite-mesure';
import { EntreeMarchandiseService } from 'src/app/my-service/entree-marchandise.service';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { MarchandiseService } from 'src/app/my-service/marchandise.service';
import { ModeReglementService } from 'src/app/my-service/mode-reglement.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { UniteMesureService } from 'src/app/my-service/unite-mesure.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-list-entree',
  templateUrl: './list-entree.component.html',
  styleUrls: ['./list-entree.component.css'],
})
export class ListEntreeComponent {
  entitiForm: FormGroup;
  formadd!: FormGroup;
  marchandise: Array<EntreeMarchandise> = [];

  libelleCategosie!: Categosie;
  idSCat: any;
  catName: any;
  catNameForLabel: any;
  libCategorie: String | undefined;

  simpleReferenceDate!: String;
  lastRef!: number;
  referenceSorties!: any;

  libelleSousCategorie: SousCategorie | undefined;
  libelleSousCategories: Array<SousCategorie> = [];

  file!: File;
  photoDetail!: Photo;
  fileUris: Array<String> = [];

  marchandise1: Marchandise | undefined;

  marchandiseUniteVente: Marchandise | undefined;

  entreeMarchandise: EntreeMarchandise | undefined;

  photo: Photo[] = [];
  uniteMesure: UniteMesure[] = [];
  marchandises: Marchandise[] = [];
  fournisseurs: Fournisseur[] = [];
  modeReglement: ModeReglement[] = [];
  entreeMarchandises: EntreeMarchandise[] = [];

  siteDeVentes: Array<SiteDeVente> = [];
  uniteMesures: Array<UniteMesure> = [];

  fournisseur1?: Fournisseur;

  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  estExonorer = false;
  p: number = 1;
  searchText: any;

  afficherTout: String = 'Afficher les données supprimées';
  titre: String = 'Liste des entrées (commandes) ';

  userSiteName!: any; 
   id: number | undefined;
  userSiteId!: number;
  userId!: number;
  siteId: any;

  control: FormControl = new FormControl('');
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public service: EntreeMarchandiseService,
    public fournisseurservice: FournisseurService,
    public marchandiseService: MarchandiseService,
    public siteDeVenteService: SitevDeVenteService,
    public modeReglementService: ModeReglementService,
    public uniteMesureService: UniteMesureService,
    private route: ActivatedRoute,
    public userInfoService: UserInfoService
  ) {
    this.entitiForm = fb.group({});
    let user_site_id = this.userInfoService.user_site_id;
    this.siteId = Number(user_site_id);
  }

  message:String="";
  checkLoading = false;

  siteName: String | undefined | null;
  ngOnInit() {
    this.loadActif();
 
    this.loadFournisseur();
    this.loadMarchandise();
    this.lodModeReglement();
    this.loadSiteVente();

    this.loadUniteMesure();
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
     // this.loadActifBySite(this.siteId );
    } else {
      this.isCheckedShowAllRecord = false;
      this.loadActif();
     // this.loadByySiteDeVente( this.siteId );
    }
  }

  edit(id: any) {
    debugger;
    // this.onAddindCondVente.emit(id);
  }

  initFormData() {
    this.formadd = this.formBuilder.group({
      identree: 0,

      refentree: [''],
      qteentree: [''],
      montantTotalentree: [''],
      uniteVente: [''],

      montant_e_ht: [''],
      montant_e_ttc: [''],

      cmde_en_ligne_f: [''],
      dateReception: [''],
      echeance: [''],

      modeReglement: ['', Validators.required],
      fournisseur: ['', Validators.required],

      marchandiseentree: ['', Validators.required],

      supprime: [false],
    });
  }


  loadEntity() {
    this.service
      .getAll()
      .pipe(first())
      .subscribe((userData) => {
        this.marchandise = userData;
        //    console.log(this.paysTest);
        this.totalrow = userData.length;
      });
  }


  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.marchandise = userData;
        this.totalrow = userData.length;
      });
  }
  delete(data: EntreeMarchandise) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.service
        .delete(data.identree)
        .pipe(first())
        .subscribe(
          () => {
            this.loadEntity();
           // this.loadByySiteDeVente( this.siteId );
          },
          (error) => console.log(error)
        );
    }
  }

  restore(data: EntreeMarchandise) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.service
        .redo(data.identree)
        .pipe(first())
        .subscribe(
          () => {
             this.loadEntity();
           // this.loadByySiteDeVente( this.siteId );
          },
          (error) => console.log(error)
        );
    }
  }
  details(id: number) {
    this.router.navigate(['detailCommandeFournisseur', id]);
  }
  //  routerLink="/pays/edit/{{ dataList.idPays }}"
  test: any;
  siteV: any;
  fournisr: any;
  fournisr1: any;
  idFournsr: any;

  cmdEntree: any;
  fournissName: any;
  modeReglementName: any;
  uniteVenteName: any;
  ArticleNAmeName: any;
  update(id: number) {
 
    this.loadActif();
    this.router.navigate(['/commandeFournisseur/edit/', id]);
  }
  idMarch?: any;

  receptionCmd(id: any) {
    this.service.getById(id).subscribe((x) => {
  console.log('x', x);

    });

  this.router.navigate(['/receptio/r/', id]);
  }
  path: String = 'listArticle';
  list() {
    this.router.navigate([this.path]);
  }
  lodModeReglement() {
    this.modeReglementService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.modeReglement = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }

  loadMarchandise() {
    this.marchandiseService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.marchandises = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }
  loadSiteVente() {
    this.siteDeVenteService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.siteDeVentes = userData;
        // console.log("siteDeVentes",this.siteDeVentes);
      });
  }

  loadFournisseur() {
    this.fournisseurservice
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.fournisseurs = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }

  loadUniteMesure() {
    this.uniteMesureService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.uniteMesure = userData;
        this.uniteMesures = userData;

        // console.log("Pays liste",this.deviseList);
      });
  }
}

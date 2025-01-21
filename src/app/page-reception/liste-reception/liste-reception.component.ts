import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Categosie } from 'src/app/my-modele/categosie';
import { EntreeMarchandise } from 'src/app/my-modele/entree-marchandise';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { Marchandise } from 'src/app/my-modele/marchandise';
import { ModeReglement } from 'src/app/my-modele/mode-reglement';
import { Photo } from 'src/app/my-modele/photo';
import { Reception } from 'src/app/my-modele/reception';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { UniteMesure } from 'src/app/my-modele/unite-mesure';
import { EntreeMarchandiseService } from 'src/app/my-service/entree-marchandise.service';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { MarchandiseService } from 'src/app/my-service/marchandise.service';
import { ModeReglementService } from 'src/app/my-service/mode-reglement.service';
import { ReceptionService } from 'src/app/my-service/reception.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-liste-reception',
  templateUrl: './liste-reception.component.html',
  styleUrls: ['./liste-reception.component.css']
})
export class ListeReceptionComponent {
  entitiForm: FormGroup;
  formadd!: FormGroup;
  receptions: Array<Reception> = [];

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
  titre: String = 'Liste des recceptions de commandes';

  userSiteName!: any;
   id: number | undefined;
  userSiteId!: number;
  userId!: number;
  siteId: any;

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
    public receptionService: ReceptionService,
    private route: ActivatedRoute,
    public userInfoService: UserInfoService
  ) {
    this.entitiForm = fb.group({});
    let user_site_id = this.userInfoService.user_site_id;
    this.siteId = Number(user_site_id);
  }
  message: String = 'Chargement en cours...';
  siteName: String | undefined | null;
  ngOnInit() {
    this.allReceptionsV2();
  }

  afficherTouteLesDonnees(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      this.loadAll();
     // this.loadActifBySite(this.siteId );
    } else {
      this.isCheckedShowAllRecord = false;
      this.allReceptionsV2();
     // this.loadByySiteDeVente( this.siteId );
    }
  }

  edit(id: any) {
    debugger;
    // this.onAddindCondVente.emit(id);
  }

  loadAll() {
    this.receptionService
      .allReceptionDelActif()
      .pipe(first())
      .subscribe((userData) => {
        this.receptions = userData;
        //    console.log(this.paysTest);
        this.totalrow = userData.length;
      });
  }

  allReceptionsV2() {
    this.receptionService
      .allReceptionsV2()
      .pipe(first())
      .subscribe((userData) => {
        this.receptions = userData;
        this.totalrow = userData.length;
      });
  }
  delete(data: Reception) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.receptionService
        .delete(data.id)
        .pipe(first())
        .subscribe(
          () => {
            this.allReceptionsV2();
           // this.loadByySiteDeVente( this.siteId );
          },
          (error) => console.log(error)
        );
    }
  }

  restore(data: Reception) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.receptionService
        .redo(data.id)
        .pipe(first())
        .subscribe(
          () => {
             this.allReceptionsV2();
             this.list(); 
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

  update(id: number) {
    this.allReceptionsV2();
    this.router.navigate(['/commandeFournisseur/edit/', id]);
  }
  idMarch?: any;

  receptionCmd(id: any) {
    this.receptionService.getById(id).subscribe((x) => {
  console.log('x', x);

    });

  this.router.navigate(['/receptio/r/', id]);
  }



  path: String = 'listeReceptionStock';
  list() {
    this.router.navigate([this.path]);
  }








}

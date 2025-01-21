import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { IdtmpServiceService } from 'src/app/idtmp/idtmp-service.service';
import { Categosie } from 'src/app/my-modele/categosie';
import { Conditionnementvente } from 'src/app/my-modele/conditionnementvente';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { IdTmp } from 'src/app/my-modele/id-tmp';
import { Marchandise } from 'src/app/my-modele/marchandise';
import { Photo } from 'src/app/my-modele/photo';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { TypeCodeBar } from 'src/app/my-modele/type-code-bar';
import { UniteMesure } from 'src/app/my-modele/unite-mesure';
import { CategorieService } from 'src/app/my-service/categorie.service';
import { ConditionnementventeService } from 'src/app/my-service/conditionnementvente.service';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { MarchandiseService } from 'src/app/my-service/marchandise.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { SouscategorieService } from 'src/app/my-service/souscategorie.service';
import { TypeCodeBarService } from 'src/app/my-service/type-code-bar.service';
import { UniteMesureService } from 'src/app/my-service/unite-mesure.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-cond-vente',
  templateUrl: './cond-vente.component.html',
  styleUrls: ['./cond-vente.component.css']
})
export class CondVenteComponent {
  path: String = 'listeConditionnementvent';
  formadd!: FormGroup;

  paht: number = 0;
  qteAchetee: number = 0;
  packDeN: number = 0;

  id!: number;
  loading = false;
  submitted = false;
  conditionOk = true;
  btnText: string = 'Sauver';

  marchandiseName: String | undefined;
  uniteVenteDefinie?: String;
  puht: any;
  title: string = 'Associer conditinnement de vente';
  totalrow: number = 0;

  conditionnementvente: Array<Conditionnementvente> = [];
  conditionnementvent: Conditionnementvente | undefined;
  //libelleSousCategorie!: SousCategorie;
  libelleCategosie!: Categosie;
  idSCat: any;
  catName: any;
  catNameForLabel: any;
  libMarchandise: Marchandise | undefined;

  simpleReferenceDate!: String;
  lastRef!: number;
  referenceSorties!: any;

  libelleSousCategorie: SousCategorie | undefined;
  libelleSousCategories: Array<SousCategorie> = [];

  file!: File;
  photoDetail!: Photo;
  fileUris: Array<String> = [];

  photo: Photo[] = [];
  uniteMesure: UniteMesure[] = [];
  uniteMarchandiseMesure: Marchandise[] = [];
  typeCodeBars: TypeCodeBar[] = [];
  fournisseurs: Fournisseur[] = [];
  //fournisseurs: Array<Fournisseur> = [];
  categosies: Array<Categosie> = [];
  souscategories: Array<SousCategorie> = [];
  siteDeVentes: Array<SiteDeVente> = [];
  uniteMesures: Array<UniteMesure> = [];
  populateCombobox: any;
  testId: any;

  showTitre: String | undefined;
  fournisseur: Fournisseur[] | undefined;
  site: SiteDeVente[] | undefined;
  photos: Photo[] | undefined;

  uniteVente?: UniteMesure;

  marchandise?: Marchandise[] = [];
  marchandisex?: Marchandise;
  @Input()
  marchandiseId: any;

  counted = false;
  package = false;
  visible = false;
  insertion = false;
  recordCount: number = 0;

  userSiteName!: any;
  userSiteId!: number;
  userId!: number;
  siteId: any;
  siteName: String | undefined | null;
  selected_article_id: any = '';
  idTmp?: IdTmp;
  designationArt: any;
  // marchandise: Array<Marchandise> = [];

  constructor(
    private formBuilder: FormBuilder,
    public marchandiseService: MarchandiseService,
    public service: ConditionnementventeService,
    public fournisseurservice: FournisseurService,
    public categosieService: CategorieService,
    public souscategorieService: SouscategorieService,
    public siteDeVenteService: SitevDeVenteService,
    public typeCodeBarService: TypeCodeBarService,
    public uniteMesureService: UniteMesureService,
    private router: Router,
    private route: ActivatedRoute,
    public userInfoService: UserInfoService,
    public idtmpServiceService: IdtmpServiceService
  ) {
    let userId = localStorage.getItem('march_id');
    let user_site_id = this.userInfoService.user_site_id;
    //  this.selected_article_id = this.userInfoService.selected_article_id;
    this.siteId = Number(user_site_id);
  }

  ngOnInit(): void {
    this.package = false;
    // this.loadActif();
    this.initFormData();
    this.id = this.route.snapshot.params['id'];
    this.marchandisex = new Marchandise();
    if (this.id > 0) {
      // this.loadDataForUpdate();

      // this.marchandiseService.getById(this.id).subscribe((x) => this.formadd.patchValue(x));

      this.marchandiseService.getById(this.id).subscribe(
        (data: any) => {
          // console.log(data);
          this.marchandisex = data;
          this.designationArt = this.marchandisex?.designation_march,
            //  console.log('designation_march',this.marchandisex?.designation_march);
            this.formadd.patchValue({
              marchandise: this.marchandisex?.designation_march,
            });
        },
        (error: any) => console.log(error)
      );
      //  this.loadData();
      this.btnText = 'Valider';
    }

    // this.id = this.route.snapshot.params['id'];
    // if (this.id > 0) {
    //  this.getById(this.id);//redu conditionnel
    //  this.loadData();//populate form
    //   this.btnText = 'Modifier';
    //   this.title = 'Modifier';

    // } else {
    // this.loadByTmpKey() ;
    //}
    // setTimeout(() => {
    //   console.log('setTimeout');
    // }, 1000);
    // this.selected_article_id = localStorage.getItem('selected_article_id');

    this.loadmarchandise();
    this.loadUniteMesure();

  }
  goodValue = false;
  goodValueOfArticle = true;
  texte = '';
  selectedItemValueX: any;
  getSelectedItemValuXe(event: any) {
    if (this.selectedItemValueX?.designation_march != this.designationArt) {
      this.goodValue = true;
      this.texte = 'Selectionnez ' + this.designationArt + " s'il vous plait"
      this.goodValueOfArticle = false;
      setTimeout(() => {
        this.goodValue = false;
        this.goodValueOfArticle = true;
      }, 5000);

      console.log('selectedItemValueX ', this.selectedItemValueX);
    }



  }



  loadByTmpKey() {
    this.idtmpServiceService
      .getByKey('article')
      .pipe(first())
      .subscribe((data: any) => {
        this.idTmp = data.valeur;
        console.log('idTmp   = ', this.idTmp);
      });
  }

  loadByySiteDeVente(id: number) {
    this.marchandiseService
      .getBysiteVenteConventionVengte(id)
      //  .getBySiteVenteId(id)
      //  .pipe(first())
      .subscribe((data: any) => {
        this.marchandise = data;
        // console.log('data   = ', this.marchandise);
      });
  }

  remooveItemLocalStorage() {
    // this.userInfoService.remoove_selected_article_id;
  }

  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      prixVente: ['', Validators.required],
      nbrePiece: [''],
      uniteVente: ['', Validators.required],
      prixAchat: ['', Validators.required],

      // marchandise: [this.marchandiseName, Validators.required],
      marchandise: ['', Validators.required],
    });
  }

  calculerPaht() {
    this.paht = this.qteAchetee * this.puht;
    this.paht = this.packDeN * this.puht;
    console.log('paht', this.paht);
    console.log('qteAchetee', this.qteAchetee);
  }

  calculerPahtQte() {
    if (this.selectedItem?.unite == 'PACKAGE') {
      this.package = true;
      this.paht = this.qteAchetee * this.paht;
      this.paht = this.qteAchetee * this.puht;
    } else {
      this.package = false;
      this.paht = this.qteAchetee * this.puht;
    }
  }

  currentRef!: String;
  refId!: number;
  uniteV: String | undefined;
  loadRefDate() {
    this.service
      .simpleReferenceDate()
      .pipe(first())
      .subscribe((userData: String) => {
        this.simpleReferenceDate = userData;
        console.log('ref', this.simpleReferenceDate);
      });
  }
  marchId: any = 0;
  getArticleById(id: any) {
    this.service
      .geOneMarchandiseById(this.id)
      .subscribe((x) => this.formadd.patchValue(x));
    //  this.marchandiseService.getById(id).subscribe((x) => {
    //    this.libMarchandise = x;
    //   this.marchId = this.libMarchandise.id;

    //  this.marchandiseName = this.libMarchandise.designation_march;
    // this.uniteVenteDefinie = this.libMarchandise.uniteVente?.unite;

    // console.log('puht =', this.puht);
    //  console.log('marchandiseName =', this.marchandiseName);
    //  console.log(' this.libMarchandise = ', this.libMarchandise);
    // });
  }

  getById(id: number) {
    this.service.getById(id).subscribe((x) => {
      this.conditionnementvent = x;
      this.uniteV = this.conditionnementvent.uniteVente?.unite;
      if (this.uniteV == 'PACKAGE') {
        this.package = true;
        console.log('uniteV ', this.uniteV);
      }
    });
  }

  loadData() {
    this.service.getById(this.id).subscribe((x) => this.formadd.patchValue(x));
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.marchandise = userData;
        this.totalrow = userData.length;
        //console.log('marchandise', this.marchandise);
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
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

  loadmarchandise() {
    this.marchandiseService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.marchandise = userData;
        // console.log("siteDeVentes",this.siteDeVentes);
      });
  }

  isCheckedShowAllRecord = false;
  sortiePlusieurs(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      // console.log("checked "+this.isCheckedShowAllRecord );
    } else {
      this.isCheckedShowAllRecord = false;

      // console.log("unchecked "+this.isCheckedShowAllRecord );
    }
  }
  test: number = 1;
  fournisseurObj: Fournisseur | undefined;
  uniteVenteObj: UniteMesure | undefined;
  siteDeVenteObj: SiteDeVente | undefined;
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formadd.invalid) {
      return;
    }

    this.loading = true;
    this.service.create(this.formadd.value);
    console.log('post data ', this.formadd.value);
    // if (!this.isCheckedShowAllRecord) {
    this.loadActif();
    this.router.navigate([this.path]);
    //  }

  }





  btnCancel() {
    localStorage.removeItem('selected_article_id');
    this.router.navigate([this.path]);
    // this.remooveItemLocalStorage();
  }
  GoToArticleList() {
    this.router.navigate(['listeMarchandise']);
  }

  estExonorer = false;

  loadByCatId() {
    this.marchandiseService.getById(this.idSCat).subscribe((response) => {
      this.libMarchandise = response;
      console.log('libelleCategosie liste', this.libelleSousCategorie);
      this.catNameForLabel = this.libelleCategosie.lib_cat;
    });
  }





  selectedItem?: UniteMesure;
  selectedItemValue: any;
  getSelectedItemValue(event: any) {
    if (this.selectedItem?.unite == 'PACKAGE') {
      this.package = true;
      console.log('package ' + this.package);
    } else {
      this.package = false;
    }
    this.selectedItemValue = this.selectedItem?.unite;
    console.log('item ' + event.target.value);
    console.log('selectedItem ', this.selectedItem?.unite);
  }
  compareData(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

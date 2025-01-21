import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { first } from 'rxjs';
import { Aib } from 'src/app/my-modele/aib';
import { Article } from 'src/app/my-modele/article';
import { Categosie } from 'src/app/my-modele/categosie';
import { Client } from 'src/app/my-modele/client';
import { Conditionnementvente } from 'src/app/my-modele/conditionnementvente';
import { EntreeMarchandise } from 'src/app/my-modele/entree-marchandise';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { GroupeTaxe } from 'src/app/my-modele/groupe-taxe';
import { Marchandise } from 'src/app/my-modele/marchandise';
import { Reception } from 'src/app/my-modele/reception';
import { ReferenceSortie } from 'src/app/my-modele/reference-sortie';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { Sortie } from 'src/app/my-modele/sortie';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { Stock } from 'src/app/my-modele/stock';
import { TvaGlobale } from 'src/app/my-modele/tva-globale';
import { TypeFacture } from 'src/app/my-modele/type-facture';
import { UniteMesure } from 'src/app/my-modele/unite-mesure';
import { ArticleService } from 'src/app/my-service/article.service';
import { CategorieService } from 'src/app/my-service/categorie.service';
import { ClientService } from 'src/app/my-service/client.service';
import { ConditionnementventeService } from 'src/app/my-service/conditionnementvente.service';
import { EntreeMarchandiseService } from 'src/app/my-service/entree-marchandise.service';
import { FactureService } from 'src/app/my-service/facture.service';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { MarchandiseService } from 'src/app/my-service/marchandise.service';
import { ReceptionService } from 'src/app/my-service/reception.service';
import { ReferenceSortieService } from 'src/app/my-service/reference-sortie.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { SortieService } from 'src/app/my-service/sortie.service';
import { SouscategorieService } from 'src/app/my-service/souscategorie.service';
import { StockService } from 'src/app/my-service/stock.service';
import { TvaGlobaleService } from 'src/app/my-service/tva-globale.service';
import { TypeCodeBarService } from 'src/app/my-service/type-code-bar.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';
import { UtilisateurService } from 'src/app/my-service/utilisateur.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

@Component({
  selector: 'app-create-sortie',
  templateUrl: './create-sortie.component.html',
  styleUrls: ['./create-sortie.component.css'],
})
export class CreateSortieComponent {
  sortie: Array<Sortie> = [];

  path: String = 'listeSortie';
  formadd!: FormGroup;
  libelleSite: any;
  id!: number;
  siteId: number;
  loading = false;
  submitted = false;
  isVisible = false;

  terminer = false;
  isNormalized = false;
  isSuccesVente = false;
  checkMontantRecu = false;
  uniteVenteIsChecked = false;

  isValidSold = true;
  genReference = false;
  btnText: string = 'Enregistrer';
  title: string = 'ADJÔ VIVI ';
  totalrow: number = 0;
  message: string = 'Vente effectuée avec succàs ';
  messageMontantRecu: string = '';
  enAttrnteDeReference: string =
    'En attente de la reference de sortie, cliquez pour générer la reference !';

  //libelleSousCategorie!: SousCategorie;
  libelleCategosie!: Categosie;
  idSCat: any;
  catName: any;
  referenceSorties!: String;
  uniteVenteLib: UniteMesure | undefined;

  refValue!: ReferenceSortie;
  catNameForLabel: any;
  libCategorie: String | undefined;
  receptionX: Reception | undefined;
  reception: any;
  conditionnementvente: Array<Conditionnementvente> = [];
  libelleSousCategorie: SousCategorie | undefined;
  libelleSousCategories: Array<SousCategorie> = [];

  entreeMarchandiseX: any | undefined;

  stock?: Stock;

  uniteMesure: UniteMesure[] = [];
  clients: Client[] = [];
  fournisseurs: Fournisseur[] = [];
  //fournisseurs: Array<Fournisseur> = [];
  categosies: Array<Categosie> = [];
  souscategories: Array<SousCategorie> = [];
  siteDeVentes: Array<SiteDeVente> = [];
  uniteMesures: Array<UniteMesure> = [];
  entreeMarchandise: Array<any> = [];

  siteDeVentesX?: SiteDeVente;

  populateCombobox: any;

  referenceSortie: ReferenceSortie | undefined;

  marchandise?: Marchandise;
  fournisseurObj: Fournisseur | undefined;
  uniteVenteObj: UniteMesure | undefined;
  siteDeVenteObj: SiteDeVente | undefined;
  testId: any;
  montantRecu: any;
  reliqa: any;
  dateReception!: any;
  dateCmd!: any;
  stockReception!: any;
  qteRecu!: any;
  qteCmd!: any;
  appreciation: string = '';
  selectedMarchandise = false;
  stockState = false;
  appreciationState = false;
  prix: any;
  uniteVentes: String | undefined;
  checkId!: any;
  uv!: any;
  uvCurrent: any = '';

  checkboxId: any[] = [];
  tabResteId: any[] = [];
  nameCheckBos!: string;
  hashMap = new Map<string, number>();
  checkId2!: any;
  isActive: boolean = false;
  finishToAddToCat: boolean = false;
  stockStatemessage: string = '';
  referenceSortieX: string = '';
  panier: Sortie[] = [];

  cocherUniteVente: string = "Cochez l'unité de vente svp!";

  constructor(
    private formBuilder: FormBuilder,
    public serviceArticle: ArticleService,
    public entreeMarchandiseService: EntreeMarchandiseService,
    public fournisseurservice: FournisseurService,
    public categosieService: CategorieService,
    public souscategorieService: SouscategorieService,
    public siteDeVenteService: SitevDeVenteService,
    public typeCodeBarService: TypeCodeBarService,
    public clientService: ClientService,
    public sortieService: SortieService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public tokenStorageService: TokenStorageService,
    public utilisateurService: UtilisateurService,
    public userInfoService: UserInfoService,
    public marchandiseService: MarchandiseService,
    public conditionnementventeService: ConditionnementventeService,
    public tvaGlobaleService: TvaGlobaleService,
    public receptionService: ReceptionService,
    public referenceSortieService: ReferenceSortieService,
    public factureService: FactureService,
    public stockService: StockService
  ) {
    let site = localStorage.getItem('user_site_id');
    let user_site_id = this.userInfoService.user_site_id;
    //  this.selected_article_id = this.userInfoService.selected_article_id;
    this.siteId = Number(user_site_id);
  }

  ngOnInit(): void {
    this.libelleSousCategorie = new SousCategorie();
    this.id = this.route.snapshot.params['id'];
    console.log('s.id  ' + this.id);
    if (this.id > 0) {
      this.loadData();
      this.btnText = 'Modifier';
      this.title = 'Modifier la vente';
      //  this.fillTextField(this.id);
    }
    //this.initSelect();
    this.initFormData();
    this.loadMarchandise();
    this.loadActifTva();
    this.loadArticle();
    this.loadClient();
    this.loadSiteVente(this.siteId);
    // this.manageCheckBox();

    this.genRef();
  }

  manageCheckBox() {
    (document.getElementById('normaliserFact') as any).disabled = true;
  }

  marchandises: Marchandise[] = [];
  loadMarchandise() {
    this.marchandiseService
      .getConventionnedProduct()
      .pipe(first())
      .subscribe((userData) => {
        this.marchandises = userData;
        console.log('marchandises liste', this.marchandises);
      });
  }

  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      qtesortie: ['', Validators.required],
      montantht: [''],
      montantttc: [''],
      montanttotal: ['0'],
      montantrecu: ['', Validators.required],
      remise: ['0'],
      relica: [''],
      normaliser: [''],
      client: [''],
      marchandise: [''],
      siteDeVente: [''],
      reference: [''],
    });
  }

  emptyFields() {
    this.formadd = this.formBuilder.group({});
  }

  loadActif() {
    this.sortieService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.sortie = userData;
        this.totalrow = userData.length;
      });
  }

  getMarchandiseById(id: any) {
    //console.log('id ' + id);
    this.marchandiseService.getById(id).subscribe(
      (data: any) => {
        //  console.log(data);
        this.marchandise = data;
        this.seuilAlerte = this.marchandise?.seuil_alerte;
        //this.marchandise =  this.marchandiseObj;
        console.log('Marchandise /', this.marchandise);
        //   console.log('societe ' + data);
      },
      (error: any) => console.log(error)
    );
  }

  refe?: String = '';
  refeTmp?: String = '';
  getReferenceSortieX() {
    this.referenceSortieService
      .getReferenceSortie()
      .pipe(first())
      .subscribe((userData) => {
        this.referenceSortie = userData;
        this.refe = this.referenceSortie.ref;
        this.refeTmp = this.refe;
        if (this.refeTmp?.length === 0) {
          this.genReference = false;
        } else {
          this.genReference = true;
        }
        // console.log('referenceSortie', this.refe);
        // this.formadd.patchValue({
        // reference: this.refe,
        // });
      });
  }
  reportPage() {
    this.router.navigate(['report']);
  }
  genRef() {
    this.getReferenceSortieX();
  }

  // this.formadd.value.referenceSortie.ref
  loadReference() {
    this.sortieService
      .getReference()
      .pipe(first())
      .subscribe((userData) => {
        this.referenceSorties = userData;
        //  this.refValue.ref = this.referenceSortie;
        console.log('Reference', this.referenceSorties);
        this.formadd.patchValue({
          reference: this.referenceSorties,
        });
        //    console.log('refValue.ref', this.refValue);
      });
  }
  selectedItem?: any;
  seuilAlerte?: any;
  getSelectedItemValue(event: any) {
    if (this.selectedItem != null) {
      this.isVisible = true;
      this.isSuccesVente = false;
      // console.log('isVisible : ', this.isVisible);
    }
    console.log('selectedItem   for output: ', this.selectedItem);

    this.exonored = this.selectedItem.exonore;
    console.log('exonored : ', this.exonored);
    this.getMarchandiseById(this.selectedItem.id);
    this.loadByConditionnementMarchandiseId(this.selectedItem.id);
    this.stochReceptionByMarchendiseId(this.selectedItem.id);
    this.stockArticle(this.selectedItem.id);
    //console.log('this.selectedItem.id : ',this.selectedItem.id);

    // this.findByMarchandiseName(this.selectedItem.designation_march
    //  );
  }

  stochReceptionByMarchendiseId(id: any) {
    this.receptionService
      .stockByMarchandise(id)
      .pipe(first())
      .subscribe((userData: any) => {
        this.reception = userData;
        console.log('this.reception', this.reception);
        console.log('stockReception', userData.cumulqterecu);
        if (this.reception != null) {
          this.selectedMarchandise = true;
          // this.dateReception = this.reception.datereception;
          this.stockReception = userData.cumulstock;
          console.log('stockReception', this.stockReception);
          this.qteRecu = userData.cumulqterecu;
          this.qteCmd = userData.cumulqteactuelcmdmd;

          if (this.stockReception < 5) {
            this.appreciationState = true;
            this.appreciation = 'Approvisionnement nécéssaire';
          }
          if (this.stockReception == 0) {
            this.appreciationState = true;
            this.appreciation = 'Rupture de stock';
          }

          setTimeout(() => {
            this.selectedMarchandise = false;
            this.appreciationState = false;
          }, 10000);
        }

        // console.log("MarchandiseName",this.entreeMarchandiseX);
      });
  }

  findByMarchandiseName(name: any) {
    this.entreeMarchandiseService
      .getByArticleName(name)
      .pipe(first())
      .subscribe((userData) => {
        console.log('MarchandiseName', userData);
        this.entreeMarchandiseX = userData;
        // console.log("MarchandiseName",this.entreeMarchandiseX);
      });
  }
  resteArticle: any = 0;

  stockArticle(id: any) {
    this.stockService
      .getStockCountByIdArticle(id)
      .pipe(first())
      .subscribe((data) => {
        // console.log('MarchandiseName', userData);
        this.stock = data;
        this.resteArticle = 0;
        this.resteArticle = this.stock.qtestk;
        console.log('stock=', this.stock);

        console.log('resteArticle=', this.resteArticle);
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
  }

  loadData() {
    this.sortieService
      .getById(this.id)
      .subscribe((x) => this.formadd.patchValue(x));
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
  loadClient() {
    this.clientService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.clients = userData;
        console.log('clients liste', this.clients);
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

  loadCategorie() {
    this.categosieService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.categosies = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }
  loadSousCategorie() {
    this.souscategorieService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.souscategories = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }
  loadSiteVente(id: any) {
    this.siteDeVenteService
      .getById(id)
      .pipe(first())
      .subscribe((userData) => {
        this.siteDeVentesX = userData;
        this.siteDeVentesObj = userData;
        this.libelleSite = this.siteDeVentesX.lib_site;
        // console.log('siteDeVentes', this.siteDeVentesX);
      });
  }

  marchandiseObj: Marchandise | undefined;
  siteDeVentesObj: SiteDeVente | undefined;

  somMtHt: number = 0;
  somMtTtc: number = 0;
  total: number = 0;
  btnCancel() {
    this.router.navigate([this.path]);
  }

  terminerBtn() {
    this.finishToAddToCat = true;
  }
  annulerBtn() {
    this.panier = [{}];
    this.finishToAddToCat = false;
    this.somMtHt = 0;
    this.somMtTtc = 0;
    this.total = 0;
    this.nbrArticle = 0;
  }

  nbrArticle: number = 0;

  addToCat() {
    if (this.qteAchetee > 0 && this.resteArticle > 0) {

      this.terminer = true;
      this.uniteVenteIsChecked = true;
      this.formadd.value.normaliser = this.isCheckedNormaliserFact;
      this.formadd.value.siteDeVente = this.siteDeVentesObj;
      this.formadd.value.reference = this.refeTmp;
      //this.isSuccesVente = true;
      console.log('this.formadd.value', this.formadd.value);

      this.panier.push(this.formadd.value);
      this.getUniteVenteByLielle(this.uvCurrent);
      this.nbrArticle++;
      this.somMtHt += this.formadd.value.montantht;
      this.somMtTtc += this.formadd.value.montantttc;
      this.total += this.formadd.value.qtesortie;
    } else {
      this.stockState = true;
      // console.log('stockState x', this.stockState);
      if (this.stockState) {
        this.stockStatemessage = 'Stock insuffisant, votre stock actuel est de ' + this.resteArticle + ', pensez à vous approvisionner ici  ';
      }
    }

  }

  voir() {
    for (let i = 0; i < this.panier.length; i++) {
      console.log('panier', this.panier[i]);
    }
  }

  isCheckedShowAllRecord = false;
  sortiePlusieurs(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      // console.log("checked "+this.isCheckedShowAllRecord );
    } else {
      this.isCheckedShowAllRecord = false;
      this.loadReference();
      // console.log("unchecked "+this.isCheckedShowAllRecord );
    }
  }

  isCheckedNormaliserFact = false;
  normaliserFact(event: any) {
    if (event.target.checked) {
      this.isCheckedNormaliserFact = true;
    } else {
      this.isCheckedNormaliserFact = false;
    }
  }

  clientdropdownSettings!: IDropdownSettings;
  selectedItemsClient = [];

  //typeCodeBardropdownSettings!: IDropdownSettings;
  //selectedItemsTypeCodeBar = [];

  // uniteMesuredropdownSettings!: IDropdownSettings;
  //selectedItemsuniteMesure = [];

  initSelect() {
    this.clientdropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'raisonSocialeClient',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 10000,
      allowSearchFilter: true,
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onSelectScat(e: any) {
    //this.catName = e.target.value,
    /// this.formadd.controls['lib_scat'].disable();
    // console.log('catName :' , this.catName.lib_scat);
    // this.loadSousCatByLibelle(  this.catName.lib_scat);
    // console.log( this.catName.lib_scat);
  }

  loadSousCatByLibelle(libelle: string) {
    this.souscategorieService.getByLibSousCat(libelle).subscribe(
      (data: any) => {
        console.log(data);
        this.libelleSousCategories = data;

        //  this.libCategorie = this.libelleSousCategorie?.categorie?.lib_cat;
        //  console.log('libelleSousCategorie liste', this.libelleSousCategorie);
        //  console.log('libCategorie ',  this.libCategorie);

        for (let a of this.libelleSousCategories) {
          this.libCategorie = a.categorie?.lib_cat;
          console.log('libCategorie ', this.libCategorie);
        }
      },
      (error: any) => console.log(error)
    );
  }

  exonored: Boolean = false;
  scatProcuct: String | undefined;

  pu_marchValue: any;
  visible: Boolean = false;
  tvaArray: TvaGlobale[] = [];
  tox?: any = 0;
  tva: number = 0;
  puht: any;

  paht: number = 0;
  qteAchetee: number = 0;
  packDeN: number = 0;
  mTTC: number = 0;

  loadActifTva() {
    this.tvaGlobaleService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.tvaArray = userData;
        this.tvaArray.forEach((item: any) => {
          this.tox = item.tauxTva;
        });

        // console.log('tox ', this.tox);
      });
  }

  calculeRelicat() {
    this.reliqa = this.montantRecu - this.mTTC;
    if (this.montantRecu < this.mTTC) {
      this.checkMontantRecu = true;
      this.isValidSold = false;
      this.messageMontantRecu =
        'Fond insuffisant, entrez un montant supérieur à ' + this.mTTC;
    } else {
      setTimeout(() => {
        this.checkMontantRecu = false;
        this.isValidSold = true;
      }, 1000);
    }
    // console.log('reliqa', this.reliqa);
  }

  calculerPaht() {
    this.paht = this.qteAchetee * this.pu_marchValue;
    this.paht = this.packDeN * this.puht;
    console.log('paht', this.paht);
    console.log('qteAchetee', this.qteAchetee);
  }

  messageForCheckbox() {
    if (!this.uniteVenteIsChecked) {
      this.cocherUniteVente = 'Cochez lèunite de vente svp!';
    }
  }

  calculerPahtQte() {
    this.stockState = true;
    console.log('stockState x', this.stockState);
    if (this.stockState) {
      //console.log('qteAchetee x', this.qteAchetee);
      // console.log('resteArticle x', this.resteArticle);
      if (this.qteAchetee > this.resteArticle) {
        // const lien='<a routerLink="/addCommandeFournisseur">Entrées</a>'
        //    let dom=new DOMParser().parseFromString(lien,'text/html');
        this.stockStatemessage = 'Stock insuffisant, votre stock actuel est de ' + this.resteArticle + ', pensez à vous approvisionner ici  ';
      }
    }
    this.paht = this.qteAchetee * this.pu_marchValue;
    let t: number = Number(this.tox);
    if (this.exonored) {
      console.log('uvCurrent', this.uvCurrent);

      if (this.nameCheckBos) {
        this.uvCurrent = this.nameCheckBos;
        if (
          this.resteArticle == 0 ||
          this.resteArticle < 0 ||
          this.qteAchetee > this.resteArticle
        ) {
          this.stockStatemessage = 'Stock insuffisant';
        }
        this.stockStatemessage =
          'Stock insuffisant, votre stock est : ' +
          this.resteArticle +
          ' ' +
          this.uvCurrent;
      } else {
        this.stockStatemessage =
          'Stock insuffisant, votre stock est : ' + this.resteArticle;
      }

      this.mTTC = this.qteAchetee * this.pu_marchValue;
    } else {
      if (this.nameCheckBos) {
        if (
          this.resteArticle == 0 ||
          this.resteArticle < 0 ||
          this.qteAchetee > this.resteArticle
        ) {
          this.stockStatemessage = 'Stock insuffisant';
        }
        this.uvCurrent = this.nameCheckBos;
        this.stockStatemessage =
          'Stock insuffisant, votre stock est : ' +
          this.resteArticle +
          ' ' +
          this.uvCurrent;
      } else {
        this.stockStatemessage =
          'Stock insuffisant, votre stock est : ' + this.resteArticle;
      }

      this.mTTC = this.calculerTva(this.paht, t);
    }





    if (this.qteAchetee > this.stockReception) {
      this.stockState = true;
      this.isValidSold = false;
    } else {
      this.stockState = false;
      this.isValidSold = true;
      //  setTimeout(() => {
      //  this.stockState = false;
      //   this.isValidSold = true;
      //  }, 5000);
    }
    if (this.qteAchetee > this.resteArticle) {
      this.stockState = true;
      this.isValidSold = false;
    }
    if (this.qteAchetee <= 0) {
      this.stockState = true;
      this.isValidSold = false;
    }
  }
  // this.tva
  calculerTva(montantHt: number, tox: number): number {
    let t: number = Number(this.tox);
    let tvaDecimal = t / 100; //tva=18/100
    let tva = tvaDecimal * montantHt; //0.18*mht
    let tvaReel = tva + montantHt;
    // console.log(tvaReel);
    return tvaReel;
  }

  loadByCatId() {
    this.categosieService.getById(this.idSCat).subscribe((response) => {
      this.libelleCategosie = response;
      console.log('libelleCategosie liste', this.libelleSousCategorie);
      this.catNameForLabel = this.libelleCategosie.lib_cat;
    });
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.tokenStorageService.clearToken();
      this.router.navigate(['login']);
    }
  }
  compareData(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  compareDataClient(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  setLogout() {
    this.utilisateurService.logout();
    this.doLogout();
  }

  getUniteVenteCheckedValueId(event: any) {
    if (event.target.checked) {
      this.uniteVenteIsChecked = true;
      this.nameCheckBos = event.target.value;
      this.checkId2 = event.target.id;
      //this.hashMap.clear();
      this.uvCurrent = event.target.id;
      for (let data in this.checkboxId) {
        console.log('data: ', this.checkboxId[data]);

        if (this.checkboxId[data] != this.checkId2) {
          console.log('test ');
          (document.getElementById(this.checkboxId[data]) as any).disabled =
            true;

          this.tabResteId.push(this.checkboxId[data]);
        }
      }

      let elem = document.getElementById(this.checkId2);
      //console.log('elem: ', elem);
      console.log('event.target.value id: ', this.checkId2);
      console.log('event.target.value: ', this.nameCheckBos);
      console.log('uv: ', this.nameCheckBos);
      this.uvCurrent = this.nameCheckBos;
      console.log('uvCurrent: ', this.uvCurrent);
      //  this.getUniteVenteByLielle(this.uvCurrent);
      console.log('hm: ', this.hashMap.get(this.nameCheckBos as string));
      this.pu_marchValue = this.hashMap.get(this.nameCheckBos as string);
    } else {
      this.uniteVenteIsChecked = false;
    }

    if (!event.target.checked && this.checkboxId.length > 1) {
      console.log('unCheck: ');
      // console.log('hashMap: ',this.hashMap);
      for (let hash in this.tabResteId) {
        let numId: number = Number(hash);
        console.log('numId hash: ', this.tabResteId[numId]);
        (document.getElementById(this.tabResteId[numId]) as any).disabled =
          false;
      }
    }
  }

  loadByConditionnementMarchandiseId(id: number) {
    this.conditionnementventeService
      .geOneMarchandiseById(id)
      .pipe(first())
      .subscribe((userData) => {
        this.conditionnementvente = userData;
        this.checkboxId = [];
        for (let data of this.conditionnementvente) {
          this.pu_marchValue = data.prixVente;
          console.log('data: ', data);
          // console.log('art: ', data.uniteVente?.unite +' '+data.prixVente

          //  );
          this.uniteVenteObj = data.uniteVente;
          this.prix = data.prixVente;
          this.uv = data.uniteVente?.unite;
          this.checkboxId.push(data.uniteVente?.id);

          this.hashMap.set(this.uv, this.prix);
          console.log('uv ...: ', data.uniteVente);
          console.log('checkboxId array  id: ', this.checkboxId);
          this.checkId = data.uniteVente?.id;
          console.log('uniteVente id: ', data.uniteVente?.id);
        }
        console.log('hashMap: ', this.hashMap);
        //  this.totalrow = userData.length;
      });
  }
  uniteVentesd: UniteMesure | undefined;

  getUniteVenteByLielle(libeeleUv: any) {
    //console.log('id ' + id);
    this.sortieService.getUniteVenteByLibelle(libeeleUv).subscribe(
      (data: any) => {
        this.uniteVenteLib = data;
        //this.marchandise =  this.marchandiseObj;
        console.log('uniteVenteLib = ', this.uniteVenteLib);
        //   console.log('societe ' + data);
      },
      (error: any) => console.log(error)
    );
  }

  onSubmit() {
    this.submitted = true;
    this.isValidSold = true;

    console.log('submitted', this.submitted);
    // stop here if form is invalid
    if (this.formadd.invalid) {
      console.log('invalid form');
      return;
    }

    this.loading = true;
    console.log('loading', this.loading);
    if (this.id > 0) {
      this.sortieService
        .update(this.formadd.value.id, this.formadd.value)
        .subscribe((data) => {
          //  console.log("pays list "+data);
          this.btnCancel();
          this.loadActif();
          this.router.navigate([this.path]);
        });

      setTimeout(() => {
        this.isSuccesVente = false;
        this.annulerBtn();
        this.terminer = false;
      }, 1000);


    } else {
      //       [disabled]="loading" btn
      this.formadd.value.normaliser = this.isCheckedNormaliserFact;
      //  this.formadd.value.marchandise = this.marchandise;
      this.formadd.value.siteDeVente = this.siteDeVentesObj;
      this.formadd.value.reference = this.refeTmp;

      for (let i = 0; i < this.panier.length; i++) {
        //  this.sortieService.create(this.formadd.value);
        //console.log('panier', this.panier[i]);
        this.sortieService.create(this.panier[i]);
      }
      this.isSuccesVente = true;
      this.getReferenceSortieX();

      //this.formadd.value.
      //console.log('this.formadd.value', this.formadd.value);

      this.getUniteVenteByLielle(this.uvCurrent);

      setTimeout(() => {
        // console.log('setTimeout');
        this.isSuccesVente = false;
        this.annulerBtn();
        this.terminer = false;
        //  this.formadd.value="";
      }, 1000);
      //this.btnCancel();
    }
  }
}

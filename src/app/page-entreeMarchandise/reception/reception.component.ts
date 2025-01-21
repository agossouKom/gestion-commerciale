import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AnneeExercice } from 'src/app/my-modele/AnneeExercice';
import { Categosie } from 'src/app/my-modele/categosie';
import { Conditionnementvente } from 'src/app/my-modele/conditionnementvente';
import { EntreeMarchandise } from 'src/app/my-modele/entree-marchandise';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { Marchandise } from 'src/app/my-modele/marchandise';
import { ModeReglement } from 'src/app/my-modele/mode-reglement';
import { Photo } from 'src/app/my-modele/photo';
import { Reception } from 'src/app/my-modele/reception';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { TvaGlobale } from 'src/app/my-modele/tva-globale';
import { UniteMesure } from 'src/app/my-modele/unite-mesure';
import { AnneeService } from 'src/app/my-service/annee.service';
import { ConditionnementventeService } from 'src/app/my-service/conditionnementvente.service';
import { EntreeMarchandiseService } from 'src/app/my-service/entree-marchandise.service';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { MarchandiseService } from 'src/app/my-service/marchandise.service';
import { ModeReglementService } from 'src/app/my-service/mode-reglement.service';
import { ReceptionService } from 'src/app/my-service/reception.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { TvaGlobaleService } from 'src/app/my-service/tva-globale.service';
import { UniteMesureService } from 'src/app/my-service/unite-mesure.service';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css'],
})
export class ReceptionComponent {
  path: String = 'listeCommandeFournisseur';
  // path: String = 'listeCommandeFournisseur';
  formadd!: FormGroup;

  Receptions: Reception[] = [];
  Reception: Reception | undefined;
  id: number = 0;
  loading = false;
  submitted = false;
  btnText: string = '';
  titleValue: String = 'Reception de la commande relative à ';
  title: String | undefined;
  title1: String | undefined;
  designationArticle: String | undefined;
  totalrow: number = 0;

  marchandise: Array<EntreeMarchandise> = [];

  //libelleSousCategorie!: SousCategorie;
  libelleCategosie!: Categosie;
  idSCat: any;
  catName: any;
  catNameForLabel: any;
  libCategorie: String | undefined;
  selectedValue?: String;

  simpleReferenceDate!: String;
  lastRef!: number;
  referenceSorties!: any;

  cumulStock!: any;

  cumulqteactuelCmdmdX!: any;


  libelleSousCategorie: SousCategorie | undefined;
  libelleSousCategories: Array<SousCategorie> = [];

  file!: File;
  photoDetail!: Photo;
  fileUris: Array<String> = [];

  marchandise1: Marchandise | undefined;

  marchandiseUniteVente: Marchandise | undefined;
  conditionnementvente: Array<Conditionnementvente> = [];

  receptionChecking: Array<Reception> = [];
  entreeMarchandise: EntreeMarchandise | undefined;
  annee!: AnneeExercice[];
  annee2!: AnneeExercice;
  photo: Photo[] = [];
  uniteMesure: UniteMesure[] = [];
  marchandises: Marchandise[] = [];
  fournisseurs: Fournisseur[] = [];
  modeReglement: ModeReglement[] = [];
  entreeMarchandises: EntreeMarchandise[] = [];
  getByArticleNameList: any[] = [];
  siteDeVentes: Array<SiteDeVente> = [];
  uniteMesures: Array<UniteMesure> = [];
  populateCombobox: any;
  testId: any;
  listItem: any;
  counted = false;
  recordCount: number = 0;
  stockVar: number = 0;
  modeReglementUpdatingValue: any = '';

  quantiteVar: any;
  qtedejarecVaru = 0;
  qteactuelCmdVar: any;

  marchId: any;
  sumStcks: any;

  montant: any = 0;
  qte: any = 0;
  mtht: any = 0;

  cmupVar?: any = 0;
  vsVar?: any = 0;
  mttcVar?: any = 0;
  constructor(
    private formBuilder: FormBuilder,
    public service: EntreeMarchandiseService,
    public receptionService: ReceptionService,
    public fournisseurservice: FournisseurService,
    public marchandiseService: MarchandiseService,
    public siteDeVenteService: SitevDeVenteService,
    public modeReglementService: ModeReglementService,
    public uniteMesureService: UniteMesureService,
    public anneeService: AnneeService,
    public conditionnementventeService: ConditionnementventeService,
    public tvaGlobaleService: TvaGlobaleService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.loadRecordCount();
    this.initFormData();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.entreeMarchandise = new EntreeMarchandise();
    if (this.id > 0) {
      // this.loadDataForUpdate();
      // commandeObject
      this.service.getById(this.id).subscribe(
        (data: any) => {
          console.log(data);
          this.entreeMarchandise = data;
          this.title =
            this.entreeMarchandise?.marchandiseentree?.designation_march;
          this.marchId = this.entreeMarchandise?.marchandiseentree?.id;
          //  this.sumStock(this.marchId);
          this.commandeObject = data;
          this.qte = this.entreeMarchandise?.qteentree;
          this.mtht = this.entreeMarchandise?.montant_e_ht;
          this.montant = this.mtht / this.qte;
          // console.log('data ' ,   data);
          this.title1 = this.titleValue + '' + this.title;




          this.receptionService.stockByMarchandise(this.marchId).subscribe((x: any) => {
            this.cumulqteactuelCmdmdX = x;

            this.quantiteVar = this.entreeMarchandise?.qteentree;
            this.cumulqteactuelCmdmdX = x.cumulqteactuelCmdmd;
            this.mttcVar = this.entreeMarchandise?.montant_e_ttc;
            this.vsVar = this.mttcVar + this.cumulqteactuelCmdmdX * this.montant;
            this.cmupVar = (this.vsVar / (this.cumulqteactuelCmdmdX + this.entreeMarchandise?.qteentree))
            // console.log('this.sumStcks.sum ',x.cumul);

            // console.log('somme stock ' ,   this.cumulStock );

            //  console.log('quantiteVar ', this.quantiteVar);
            //  quantite: Number(this.quantiteVar)  ,
            //   qteactuelCmd:  Number(this.quantiteVar)

            this.receptionOf = this.entreeMarchandise?.qteentree;
            console.log('somme stock1 ', this.cumulqteactuelCmdmdX);
            console.log('somme stock2 ', this.entreeMarchandise?.qteentree);

            console.log('somme stock ', this.cumulqteactuelCmdmdX + this.entreeMarchandise?.qteentree);

            this.formadd.patchValue({
              quantite: this.entreeMarchandise?.qteentree,
              qteactuelCmd: this.entreeMarchandise?.qteentree,
              stock: this.cumulqteactuelCmdmdX,
            });
          });


        },
        (error: any) => console.log(error)
      );

      //  this.loadData();
      this.btnText = 'Valider';
    }

    this.loadMarchandise();
    this.lodModeReglement();
    this.loadActifTva();
  }

  estNormalisee = false;

  sumStock(id: any) {
    this.receptionService.sumStock(id).subscribe((x: any) => {
      this.sumStcks = x;

      // console.log('this.sumStcks.sum ',x.cumul);
      this.cumulStock = x.cumul;
    });
  }

  stockByMarchandise(id: any) {
    this.receptionService.stockByMarchandise(id).subscribe((x: any) => {
      this.sumStcks = x;

      // console.log('this.sumStcks.sum ',x.cumul);
      this.cumulStock = x.cumulqteactuelCmdmd;
    });
  }



  estNormaliser(event: any) {
    if (event.target.checked) {
      this.estNormalisee = true;
    } else {
      this.estNormalisee = false;
    }
  }

  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      quantite: ['', Validators.required],
      // stock: [this.stockVar, Validators.required],
      stock: ['', Validators.required],
      qtedejarecu: [this.qtedejarecVaru, Validators.required],
      qteactuelCmd: [' ', Validators.required],
      commandeChezFournisseur: [''],
      normalized: [this.estNormalisee],
      cmup: [''],
      valrStock: [''],
    });
  }
  recept: number = 0;
  deTropValue: boolean = false;
  checkIfReceptionExist: boolean = false;
  receptionOf: any = 0;
  message: String = '';
  messageVerificationReception: String =
    'Vous ne pouvez pas receptionner la même commande plusieurs fois';
  receptionOfCmd(e: any) {
    if (e.target.value.length == 0) {
      this.receptionOf = 0;
    } else {
      if (e.target.value > this.quantiteVar) {
        this.deTropValue = true;
        this.message = 'Vous ne pouvez pas receptionner cette quantité';
      }

      if (e.target.value <= this.quantiteVar) {
        this.deTropValue = false;
        this.message = '';
      }
      this.receptionOf = e.target.value;
    }
  }

  currentRef!: String;
  refId!: number;

  loadRefDate() {
    this.service
      .simpleReferenceDate()
      .pipe(first())
      .subscribe((userData: String) => {
        this.simpleReferenceDate = userData;
        //  console.log('ref', this.simpleReferenceDate);
      });
  }

  uniteV: UniteMesure | undefined;
  uniteVx: String | undefined;
  /** getMarchandiseById(id: number) {
    this.service.getById(id).subscribe((x) => {
      this.marchandiseUniteVente = x;
      this.uniteVx = this.marchandiseUniteVente.uniteVente?.unite;
      console.log('uniteVx ' +   this.uniteVx);

    });
  } */

  libSousCat: String | undefined;

  loadRecordCount() {
    this.service
      .getCount()
      .pipe(first())
      .subscribe((userData: number) => {
        this.recordCount = userData;
        console.log('recordCount', this.recordCount);
        this.counted = true;
        console.log(this.counted);
        if (this.recordCount > 0) {
          if (this.counted) {
            this.counted = true;
            console.log(this.counted);
            this.service.getReferenceDate().subscribe((userData: String) => {
              this.referenceSorties = userData;
              console.log(this.referenceSorties);
              this.lastRef = this.recordCount;
              this.refId = this.lastRef + 1;
              if (this.id == undefined) {
                this.formadd.patchValue({
                  refentree:
                    'CMD' + this.referenceSorties.reference + this.refId,
                });
              }
            });
          }
        }
        if (this.recordCount == 0) {
          this.counted = true;
          console.log(this.counted);
          this.service.getReferenceDate().subscribe((userData: String) => {
            this.referenceSorties = userData;
            console.log(this.referenceSorties);
            this.lastRef = this.recordCount;
            this.refId = this.lastRef + 1;
            if (this.id == undefined) {
              this.formadd.patchValue({
                refentree: 'CMD' + this.referenceSorties.reference + this.refId,
              });
            }
          });
        }
      });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.entreeMarchandises = userData;
        this.totalrow = userData.length;
      });
  }
  // loadByySiteDeVente(id: number) {
  // this.service
  //  .getBySiteVenteId(id)
  //  .pipe(first())
  // .subscribe((userData) => {
  //  this.entreeMarchandises = userData;
  //  this.totalrow = userData.length;
  //  });
  //}
  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
  }
  cmdEntree: any;
  fournissName: any;
  modeReglementName: any;
  uniteVenteName: any;
  ArticleNAmeName: any;
  /**this.formadd.patchValue({
    fournisseur: this.fournissName
     });
*/
  idFournisseur: any;
  userIdLocal: number = 0;

  idModeReglement: any;
  idModeReg: number = 0;

  loadData() {
    this.service.getById(this.id).subscribe((x) => {
      this.cmdEntree = x;
      this.fournissName = this.cmdEntree.fournisseur?.nom_fsr;
      this.idFournisseur = this.cmdEntree.fournisseur?.id;
      //this.formadd.get('fournisseur')?.setValue(this.idFournisseur);

      let numId: number = Number(this.idFournisseur);
      this.userIdLocal = numId;
      this.formadd.get('fournisseur')?.patchValue(numId);

      this.modeReglementName = this.cmdEntree.modeReglement?.lib_mode_rglt;
      this.idModeReglement = this.cmdEntree.modeReglement?.id;
      let mr: number = Number(this.idModeReglement);
      this.idModeReg = mr;
      this.formadd.get('modeReglement')?.patchValue(this.idModeReg);

      console.log('idModeReglement ', this.idModeReglement);
      console.log('idFournisseur ', this.idFournisseur);
      console.log('fournissName ', this.fournissName);
      console.log('modeReglementName ', this.modeReglementName);
    });
  }

  setFournisseur() {
    this.formadd.get('fournisseur')?.patchValue(this.userIdLocal);
  }
  loadDataForUpdate() {
    this.service.getById(this.id).subscribe((x) => this.formadd.patchValue(x));
  }

  btnCancel() {
    this.router.navigate([this.path]);
  }

  isCheckedShowAllRecord = false;

  nouveauProduit(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      //  this.formadd.value.nouveaute= true;
      // console.log("nouveauProduit "+this.formadd.value.nouveaute);
    } else {
      this.isCheckedShowAllRecord = false;
      //  this.formadd.value.nouveaute= false;
      // console.log("nouveauProduit "+this.formadd.value.nouveaute);
    }
  }
  onLine = false;
  cmdEnLigne(event: any) {
    if (event.target.checked) {
      this.onLine = true;
    } else {
      this.onLine = false;
    }
  }

  estFactured = false;
  cmdfFactured(event: any) {
    if (event.target.checked) {
      this.estFactured = true;
    } else {
      this.estFactured = false;
    }
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
      .getConventionnedProduct()
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

  loadAnneeExerciceActif() {
    this.anneeService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.annee = userData;
        this.annee.forEach((item) => {
          // console.log('annee:', item.libelleAnSco);
          this.formadd.patchValue(item);

          // console.log('annee2:', anneeExercice);
        });
      });
  }

  compareData(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  compareDataAnnee(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.idAnSco === c2.idAnSco : c1 === c2;
  }
  //selectedItem?: UniteMesure;
  selectedItem?: any;
  pu_marchValue: any;
  visible: Boolean = false;

  currentAnnee: any;
  fournisseur: any;
  uniteVente: any;

  commandeObject: EntreeMarchandise | undefined;
  uniteVenteObj: UniteMesure | undefined;
  siteDeVenteObj: SiteDeVente | undefined;

  exonored: Boolean = false;
  scatProcuct: String | undefined;
  //artcle
  getSelectedItemValue(event: any) {
    if (this.selectedItem != null) {
      this.visible = true;
    }
    // console.log('item: ' , event.target.value);
    console.log('selectedItem :', this.selectedItem);
    this.scatProcuct = this.selectedItem.sousCategorie.lib_scat;
    console.log('sousCategorie :', this.selectedItem.sousCategorie.lib_scat);
    console.log('designation_march :', this.selectedItem.designation_march);
    console.log('article id:', this.selectedItem.id);
    this.loadByConditionnementMarchandiseId(this.selectedItem.id);
    // this.loadAnneeExerciceActif();
    //this.loadByArticleName(this.selectedItem.designation_march);
    this.formadd.patchValue({
      uniteVente: this.selectedItem?.uniteVente?.unite,
      //  siteDeVente:this.selectedItem?.siteDeVente?.s,
    });

    this.selectedItem?.fournisseur.forEach((item: any) => {
      this.fournisseur = item?.nomFsr;
      //  this.fournisseurObj = item;
      // console.log('item: ', item);
      // console.log('fournisseur: ', this.fournisseur);
    });
    this.uniteVenteObj = this.selectedItem?.uniteVente;
    this.siteDeVenteObj = this.selectedItem?.siteDeVente;

    this.exonored = this.selectedItem?.exonore;
    this.uniteVente = this.selectedItem?.uniteVente?.unite;
    console.log('pu_march: ', this.pu_marchValue);
    console.log('uniteVente: ', this.selectedItem?.uniteVente?.unite);
  }
  prix: any;
  uniteVentes: String | undefined;
  checkId!: any;
  uv!: any;
  checkboxId: any[] = [];
  tabResteId: any[] = [];
  nameCheckBos!: string;
  hashMap = new Map<string, number>();
  checkId2!: any;
  isActive: boolean = false;
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
          this.prix = data.prixVente;
          this.uv = data.uniteVente?.unite;
          this.checkboxId.push(data.uniteVente?.id);

          this.hashMap.set(this.uv, this.prix);

          console.log('checkboxId array  id: ', this.checkboxId);
          this.checkId = data.uniteVente?.id;
          console.log('uniteVente id: ', data.uniteVente?.id);
        }
        console.log('hashMap: ', this.hashMap);
        //  this.totalrow = userData.length;
      });
  }

  getUniteVenteCheckedValueId(event: any) {
    if (event.target.checked) {
      this.nameCheckBos = event.target.value;
      this.checkId2 = event.target.id;
      //this.hashMap.clear();

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
      console.log('hm: ', this.hashMap.get(this.nameCheckBos as string));
      this.pu_marchValue = this.hashMap.get(this.nameCheckBos as string);
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

  conditionnementVente(id: any) {
    this.conditionnementventeService.getById(id).subscribe((x) => { });
  }
  puht: any;

  paht: number = 0;
  qteAchetee: number = 0;
  packDeN: number = 0;
  mTTC: number = 0;
  calculerPaht() {
    this.paht = this.qteAchetee * this.pu_marchValue;
    this.paht = this.packDeN * this.puht;
    console.log('paht', this.paht);
    console.log('qteAchetee', this.qteAchetee);
  }

  calculerPahtQte() {
    if (this.visible) {
      this.paht = this.qteAchetee * this.pu_marchValue;
      let t: number = Number(this.tox);
      if (this.exonored) {
        this.mTTC = this.qteAchetee * this.pu_marchValue;
      } else {
        this.mTTC = this.calculerTva(this.paht, t);
      }
      console.log('mTTC', this.mTTC);
    }
  }

  tvaArray: TvaGlobale[] = [];
  tox?: any = 0;
  tva: number = 0;
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

  // this.tva
  calculerTva(montantHt: number, tox: number): number {
    let t: number = Number(this.tox);
    let tvaDecimal = t / 100;
    let valCa = tvaDecimal * montantHt;
    let tvaReel = valCa + montantHt;
    console.log(tvaReel);
    return tvaReel;
  }

  loadByArticleName(name: String) {
    this.service
      .getByArticleName(name)
      .pipe(first())
      .subscribe((userData) => {
        this.getByArticleNameList = userData;
        console.log('getByArticleNameList ', this.getByArticleNameList);
        //  this.totalrow = userData.length;
      });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formadd.invalid) {
      return;
    }
    this.formadd.value.commandeChezFournisseur = this.commandeObject;
    this.formadd.value.quantite = this.quantiteVar;
    this.formadd.value.cmup = this.cmupVar;
    this.formadd.value.valrStock = this.vsVar;

   // this.receptionService.create(this.formadd.value);
   // this.loadActif();
   //this.router.navigate([this.path]);


    //console.log('receptionChecking identree', this.commandeObject?.identree);
    this.receptionService
      .checkIfReceptionExiste(this.commandeObject?.identree)
      .pipe(first())
      .subscribe((userData) => {
        this.receptionChecking = userData;

        if (this.receptionChecking.length > 0) {
          this.checkIfReceptionExist = true;
          setTimeout(() => {
            this.checkIfReceptionExist = false;
          }, 6000);
        } else {

          this.receptionService.create(this.formadd.value);

          this.loadActif();
          this.router.navigate([this.path]);
        }

      });
  }



  /**
   *
      this.receptionService.sumStock(this.marchId).subscribe((x: any) => {
            this.sumStcks = x;

            this.quantiteVar = this.entreeMarchandise?.qteentree;
            this.cumulStock = x.cumul;
            this.mttcVar=this.entreeMarchandise?.montant_e_ttc;
            this.vsVar = this.mttcVar+this.cumulStock * this.montant;
            this.cmupVar=(this.vsVar /  (this.cumulStock + this.entreeMarchandise?.qteentree))
            // console.log('this.sumStcks.sum ',x.cumul);

            // console.log('somme stock ' ,   this.cumulStock );

            //  console.log('quantiteVar ', this.quantiteVar);
            //  quantite: Number(this.quantiteVar)  ,
            //   qteactuelCmd:  Number(this.quantiteVar)

            this.receptionOf = this.entreeMarchandise?.qteentree;
            console.log('somme stock1 ' ,   this.cumulStock );
            console.log('somme stock2 ' ,   this.entreeMarchandise?.qteentree);

            console.log('somme stock ' ,   this.cumulStock + this.entreeMarchandise?.qteentree);

            this.formadd.patchValue({
              quantite: this.entreeMarchandise?.qteentree,
              qteactuelCmd: this.entreeMarchandise?.qteentree,
              stock: this.cumulStock,
            });
          });


   */
}

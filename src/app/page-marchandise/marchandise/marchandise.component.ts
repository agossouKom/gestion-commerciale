import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { first } from 'rxjs';
import { Aib } from 'src/app/my-modele/aib';
import { Categosie } from 'src/app/my-modele/categosie';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { GroupeTaxe } from 'src/app/my-modele/groupe-taxe';
import { Marchandise } from 'src/app/my-modele/marchandise';
import { Photo } from 'src/app/my-modele/photo';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { TypeCodeBar } from 'src/app/my-modele/type-code-bar';
import { TypeFacture } from 'src/app/my-modele/type-facture';
import { UniteMesure } from 'src/app/my-modele/unite-mesure';
import { CategorieService } from 'src/app/my-service/categorie.service';
import { FactureService } from 'src/app/my-service/facture.service';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { MarchandiseService } from 'src/app/my-service/marchandise.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { SouscategorieService } from 'src/app/my-service/souscategorie.service';
import { TypeCodeBarService } from 'src/app/my-service/type-code-bar.service';
import { UniteMesureService } from 'src/app/my-service/unite-mesure.service';

@Component({
  selector: 'app-marchandise',
  templateUrl: './marchandise.component.html',
  styleUrls: ['./marchandise.component.css'],
})
export class MarchandiseComponent {
  path: String = 'listeMarchandise';
  formadd!: FormGroup;

  id: number= 0;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter article tyype';
  totalrow: number = 0;

  marchandise: Array<Marchandise> = [];

  //libelleSousCategorie!: SousCategorie;
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

  photo: Photo[] = [];
  uniteMesure: UniteMesure[] = [];
  typeCodeBars: TypeCodeBar[] = [];
  fournisseurs: Fournisseur[] = [];
  //fournisseurs: Array<Fournisseur> = [];
  categosies: Array<Categosie> = [];
  souscategories: Array<SousCategorie> = [];
  siteDeVentes: Array<SiteDeVente> = [];
  uniteMesures: Array<UniteMesure> = [];
  populateCombobox: any;
  testId: any;

  counted = false;
  recordCount: number = 0;



  aib: Aib [] = [];
  taxGroup: GroupeTaxe [] = [];
  typeFacture: TypeFacture [] = [];

  constructor(
    private formBuilder: FormBuilder,

    public service: MarchandiseService,
    public fournisseurservice: FournisseurService,
    public categosieService: CategorieService,
    public souscategorieService: SouscategorieService,
    public siteDeVenteService: SitevDeVenteService,
    public typeCodeBarService: TypeCodeBarService,
    public uniteMesureService: UniteMesureService,
    private router: Router,
    private route: ActivatedRoute,
    public factureService: FactureService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.initFormData();
    this.loadRecordCount();
     //this.lastReferenceIndex();
  }

  ngOnInit(): void {
    this.libelleSousCategorie = new SousCategorie();
    this.id = this.route.snapshot.params['id'];
   // console.log('id ' +   this.id);

    if (this.id > 0) {
      this.loadData();
      this.btnText = 'Modifier';
      this.title = 'Modifier article type';
      this.getSousCatById(this.id);
      this.getMarchandiseById(this.id);
    }

    // this.loadRecordCount();

    this.initSelect();
    //this.initFormData();
    this.loadFournisseur();
    this.loadCategorie();
    this.loadSousCategorie();
    this.loadSiteVente();
    this.loadTypeCodeBar();
    this.loadUniteMesure();
    this.loadPhoto();
    this.getDgiInvoiceParam();
    //this.recordCount

    //this.lastReferenceIndex();
  }
  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      ref_march: [''],
      designation_march: ['', Validators.required],
      //createdAt: [new Date()]
      exonore: [this.estExonorer],
      nouveaute: [this.isCheckedShowAllRecord],
      description: [''],
      seuil_alerte: ['',Validators.required],
      typeCodeBar: ['', Validators.required],
      fournisseur: ['', Validators.required],
      photo: [''],
      sousCategorie: ['', Validators.required],
    // siteDeVente: ['', Validators.required],
      iscondvent: [false],
      disponible: [true],

      aib: ['', Validators.required],
      groupetaxe: ['', Validators.required],
      typefacture: ['', Validators.required],
 
    });
  }
  currentRef!: String;
  refId!: number;

  loadRefDate() {
    this.service
      .simpleReferenceDate()
      .pipe(first())
      .subscribe((userData: String) => {
        this.simpleReferenceDate = userData;
        console.log('ref', this.simpleReferenceDate);
      });
  }

  selectFile(event: any) {
    this.file = event.target.files.item(0);
    console.log('test = ', this.file.name);
    if (this.file) {
      this.uploadFile();
    }
  }
  idPhoto!: number;

  uploadFile() {
    this.service.upload(this.file).subscribe({
      next: (data) => {
        this.photoDetail = data;
        this.fileUris.push(this.photoDetail.fileUri);
        this.loadPhoto();
        this.getById(this.photoDetail.id);

        // alert('Fileupload successfully');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  uniteV: UniteMesure | undefined;
  uniteVx: String | undefined;
  getMarchandiseById(id: number) {
    this.service.getById(id).subscribe((x) => {
      this.marchandiseUniteVente = x;
     // this.uniteVx = this.marchandiseUniteVente.uniteVente?.unite;
      console.log('uniteVx ' +   this.uniteVx);

    });
  }

  getById(id: number) {
    this.service.getPhotById(id).subscribe((x) => {
      this.photoDetail = x;
      //   console.log('photoDetail ' +   this.photoDetail?.photoName);
      // console.log('photoDetail ' +   this.photoDetail?.id);
    });
  }
  libSousCat: String | undefined;
  getSousCatById(id: number) {
    this.service.getById(id).subscribe((x) => {
      this.marchandise1 = x;
      this.libSousCat = this.marchandise1.sousCategorie?.lib_scat;
     //   [selected]="this.libSousCat"

      // console.log('photoDetail ' +   this.photoDetail?.id);
    });
  }

  loadPhoto() {
    this.service
      .getActifPhoto()
      .pipe(first())
      .subscribe((userData) => {
        this.photo = userData;
        for (let a of this.photo) {
          this.idPhoto = a.id;
          console.log('idPhoto ', this.idPhoto);
        }

        // console.log("Pays liste",this.deviseList);
      });
  }


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
              if (this.id==undefined) {
                this.formadd.patchValue({
                  ref_march: 'M' + this.referenceSorties.reference + this.refId,
                });
              }

            });
          }
        }else    if (this.recordCount== 0) {
          if (this.counted) {
            this.counted = true;
            console.log(this.counted);
            this.service.getReferenceDate().subscribe((userData: String) => {
              this.referenceSorties = userData;
              console.log(this.referenceSorties);
              this.lastRef = this.recordCount;
              this.refId = this.lastRef + 1;
              if (this.id==undefined) {
                this.formadd.patchValue({
                  ref_march: 'M' + this.referenceSorties.reference + this.refId,
                });
              }

            });
          }
        }
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

  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
  }

  loadData() {
    this.service.getById(this.id).subscribe((x) => this.formadd.patchValue(x));
  }

  loadFournisseur() {
    this.fournisseurservice
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.fournisseurs = userData;
      console.log("loadFournisseur  ",this.fournisseurs);
      });
  }

  loadTypeCodeBar() {
    this.typeCodeBarService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.typeCodeBars = userData;
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
  loadSiteVente() {
    this.siteDeVenteService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.siteDeVentes = userData;
        // console.log("siteDeVentes",this.siteDeVentes);
      });
  }

  onSubmit() {
    this.submitted = true;
     // stop here if form is invalid
    if (this.formadd.invalid) {
      return;
    }

    this.loading = true;

    if (this.id > 0) {
      this.formadd.value.nouveaute = this.isCheckedShowAllRecord;
      this.service
        .update(this.formadd.value.id, this.formadd.value)
        .subscribe((data) => {
          //  console.log("pays list "+data);
          this.btnCancel();
          this.loadActif();
          this.router.navigate([this.path]);
        });
    } else {
      this.formadd.value.nouveaute = this.isCheckedShowAllRecord;
     // this.formadd.value.createdAt = new Date();
     // console.log("data value : ",this.formadd.value.createdAt);
      this.service.create(this.formadd.value);
      this.loadActif();
   //  console.log('created ',this.formadd.value);
      //this.btnCancel();
      this.router.navigate([this.path]);
    }
  }
  btnCancel() {
    this.router.navigate([this.path]);
  }

  isCheckedShowAllRecord = false;
  estExonorer = false;
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

  articleExonorer(event: any) {
    if (event.target.checked) {
      this.estExonorer = true;
    } else {
      this.estExonorer = false;
    }
  }

  fournisseurdropdownSettings!: IDropdownSettings;
  selectedItemsfournisseur = [];

  typeCodeBardropdownSettings!: IDropdownSettings;
  selectedItemsTypeCodeBar = [];

  uniteMesuredropdownSettings!: IDropdownSettings;
  selectedItemsuniteMesure = [];

  phtoedropdownSettings!: IDropdownSettings;
  selectedItemsPhoto = [];

  initSelect() {
    this.fournisseurdropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nomFsr',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 1000,
      allowSearchFilter: true,
    };

    this.typeCodeBardropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'lib_code_bar',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 1000,
      allowSearchFilter: true,
    };
    this.uniteMesuredropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'unite',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 1000,
      allowSearchFilter: true,
    };
    this.phtoedropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'photoName',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 1000,
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
        // console.log(data);
        this.libelleSousCategories = data;
        for (let a of this.libelleSousCategories) {
          this.libCategorie = a.categorie?.lib_cat;
          // console.log('libCategorie ', this.libCategorie);
        }
      },
      (error: any) => console.log(error)
    );
  }
  compareData(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  loadByCatId() {
    this.categosieService.getById(this.idSCat).subscribe((response) => {
      this.libelleCategosie = response;
      console.log('libelleCategosie liste', this.libelleSousCategorie);
      this.catNameForLabel = this.libelleCategosie.lib_cat;
    });
  }


  
  getDgiInvoiceParam() {
    this.getAib();
    this.getTaxGroup();
    this.getTypeFacture();
  }

  getAib() {
    this.factureService
      .getaid_endPoint()
      .pipe(first())
      .subscribe((userData) => {
        this.aib = userData;
     
       // console.log('aib', this.aib.libelle);
     
      });
  }

  getTypeFacture() {
    this.factureService
      .gettype_facture_endPoint()
      .pipe(first())
      .subscribe((userData) => {
        this.typeFacture = userData;
        
       // console.log('referenceSortie', this.typeFacture.libelle);
      
      });
  }

  getTaxGroup() {
    this.factureService
      .gettaxGroup_endpoint()
      .pipe(first())
      .subscribe((userData) => {
        this.taxGroup = userData;
       //  console.log('referenceSortie', this.taxGroup.libelle);
 
      });
  }
}

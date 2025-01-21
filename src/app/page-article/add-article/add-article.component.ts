import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Article } from 'src/app/my-modele/article';
import { Categosie } from 'src/app/my-modele/categosie';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { ArticleService } from 'src/app/my-service/article.service';
import { CategorieService } from 'src/app/my-service/categorie.service';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { SouscategorieService } from 'src/app/my-service/souscategorie.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TypeCodeBar } from 'src/app/my-modele/type-code-bar';
import { TypeCodeBarService } from 'src/app/my-service/type-code-bar.service';
import { UniteMesure } from 'src/app/my-modele/unite-mesure';
import { UniteMesureService } from 'src/app/my-service/unite-mesure.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent {
  path: String = 'listArticle';
  formadd!: FormGroup;

  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter article';
  totalrow: number = 0;

  article: Array<Article> = [];

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
  constructor(
    private formBuilder: FormBuilder,
    public service: ArticleService,
    public fournisseurservice: FournisseurService,
    public categosieService: CategorieService,
    public souscategorieService: SouscategorieService,
    public siteDeVenteService: SitevDeVenteService,
    public typeCodeBarService: TypeCodeBarService,
    public uniteMesureService: UniteMesureService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.libelleSousCategorie = new SousCategorie();
    this.id = this.route.snapshot.params['id'];

    if (this.id > 0) {
      this.loadData();
      this.btnText = 'Modifier';
      this.title = 'Modifier article';
      //  this.fillTextField(this.id);
    }
    this.loadRecordCount();
    this.initSelect();
    this.initFormData();
    this.loadFournisseur();
    this.loadCategorie();
    this.loadSousCategorie();
    this.loadSiteVente();
    this.loadTypeCodeBar();
    this.loadUniteMesure();

    if (this.recordCount == 0) {
      this.service
      .getReferenceDate()
      .subscribe((userData) => {
        this.referenceSorties = userData;
        this.formadd.patchValue({
          ref_article: 'A' + this.referenceSorties.reference + 1,
        });
      });
    }
    this.lastReferenceIndex();
    if (this.recordCount != 0) {
      this.loadReferenceFromDate();
    }

  }
  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      ref_article: [''],
      designa_article: ['', Validators.required],
      codebar_article: [''],
      date_peremption: [''],
      // createdAt: [new Date()],
      exonore: [this.estExonorer],
      nouveaute: [this.isCheckedShowAllRecord],
      pa_article: [''],
      pv_article: [''],
      pu_article: [''],
      qte_init_article: [''],
      qte_min_article: [''],
      qteAchete: [''],
      uniteMesure: ['', Validators.required],
      typeCodeBar: ['', Validators.required],
      fournisseur: ['', Validators.required],
      //categorie: [''],
      sousCategorie: [''],
      siteDeVente: [''],
      // photo: [''],
      supprime: [false],
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

  lastReferenceIndex() {
    this.service
      .lastRef() .pipe(first()).subscribe((userData) => {
        if (userData != null) {
          this.lastRef = userData;
          this.refId = this.lastRef + 1;
          console.log('lastRef =', this.lastRef);
          console.log('lastRef =', this.lastRef + 1);

          this.service
          .getReferenceDate()
          .pipe(first())
          .subscribe((userData) => {
            this.referenceSorties = userData;
            //  this.refValue.ref = this.referenceSortie;
            console.log('Reference', this.referenceSorties);
            this.formadd.patchValue({
              ref_article: 'A' + this.referenceSorties.reference + this.refId,
            });
          });

        }
      },
      (error) => console.log(error)
    );

  }

  loadReferenceFromDate() {
    this.service
      .getReferenceDate()
      .pipe(first())
      .subscribe((userData) => {
        this.referenceSorties = userData;
        //  this.refValue.ref = this.referenceSortie;
        console.log('Reference', this.referenceSorties);
        this.formadd.patchValue({
          ref_article: 'A' + this.referenceSorties.reference + this.refId,
        });
      });
  }

  loadRecordCount() {
    this.service
      .getCount()
      .pipe(first())
      .subscribe((userData) => {
        this.recordCount = userData;
        //  this.refValue.ref = this.referenceSortie;
        console.log('recordCount', this.recordCount);
        //  this.formadd.patchValue({

        //  ref_article: "A"+this.referenceSorties.reference+this.refId
        //  });
      });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.article = userData;
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
        // console.log("Pays liste",this.deviseList);
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
      this.formadd.value.createdAt = new Date();
      //  console.log("createdAt "+this.formadd.value.createdAt);
      this.service.create(this.formadd.value);
      console.log('created ' + this.formadd.value);
      this.btnCancel();
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

  initSelect() {
    this.fournisseurdropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nom_fsr',
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

  loadByCatId() {
    this.categosieService.getById(this.idSCat).subscribe((response) => {
      this.libelleCategosie = response;
      console.log('libelleCategosie liste', this.libelleSousCategorie);
      this.catNameForLabel = this.libelleCategosie.lib_cat;
    });
  }

//retire desousCategori permet d'otenirlelibelee delaselection
//twoway binding
//(change)="onSelectScat($event)"
//[(ngModel)]="catName"
//

}

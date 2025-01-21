import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { IdtmpServiceService } from 'src/app/idtmp/idtmp-service.service';
import { Article } from 'src/app/my-modele/article';
import { Categosie } from 'src/app/my-modele/categosie';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { IdTmp } from 'src/app/my-modele/id-tmp';
import { Marchandise } from 'src/app/my-modele/marchandise';
import { Photo } from 'src/app/my-modele/photo';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { TypeCodeBar } from 'src/app/my-modele/type-code-bar';
import { UniteMesure } from 'src/app/my-modele/unite-mesure';
import { Utilisateur } from 'src/app/my-modele/utlilisateur';
import { CategorieService } from 'src/app/my-service/categorie.service';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { MarchandiseService } from 'src/app/my-service/marchandise.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { SouscategorieService } from 'src/app/my-service/souscategorie.service';
import { TypeCodeBarService } from 'src/app/my-service/type-code-bar.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-list-marchandise',
  templateUrl: './list-marchandise.component.html',
  styleUrls: ['./list-marchandise.component.css'],
})
export class ListMarchandiseComponent {
  entitiForm: FormGroup;
  formTmpData: FormGroup;
  idTmp?: IdTmp;
  //formadd!: FormGroup;
  marchandise: Array<Marchandise> = [];
  marchandisex?: Marchandise;
  typeCodeBar!: TypeCodeBar;
  fournisseur!: Fournisseur;
  photo!: Photo;
  categorie!: Categosie;
  sousCategorie!: SousCategorie;
  siteDeVente!: SiteDeVente;
  utilisateur!: Utilisateur;

  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  estExonorer = false;
  checkLoading = false;
  p: number = 1;
  searchText: any;

  @Output() onAddindCondVente = new EventEmitter<any>();

  afficherTout: String = 'Afficher les données supprimées';
  titre: String = 'Liste des articles types';

  userSiteName!: any;
  userSiteId!: number;
  userId!: number;
  siteId: any;
  selected_article_id: any;

  control: FormControl = new FormControl('');
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public tmpFb: FormBuilder,
    public service: MarchandiseService,
    public fournisseurservice: FournisseurService,
    public categosieService: CategorieService,
    public souscategorieService: SouscategorieService,
    public siteDeVenteService: SitevDeVenteService,
    public typeCodeBarService: TypeCodeBarService,
    public userInfoService: UserInfoService,
    public idtmpServiceService: IdtmpServiceService
  ) {
    this.entitiForm = fb.group({});
    this.formTmpData = tmpFb.group({});
    // let user_site_id = this.userInfoService.user_site_id;
    //this.selected_article_id = this.userInfoService.selected_article_id;
    // this.siteId = Number(user_site_id);
  }
  message: String = '';
  siteName: String | undefined | null;
  ngOnInit() {
    this.loadActif();
    //this.siteName = this.userInfoService.user_site;

    //this.loadByySiteDeVente(this.siteId);

    this.fournisseurservice.getActif();
    this.categosieService.getActif();
    this.souscategorieService.getActif();
    this.siteDeVenteService.getActif();
    this.typeCodeBarService.getActif();
 

    this.userInfoService.sleep(10000).then(() => {
      this.checkLoading = true;
      this.message= this.userInfoService.message;
      if(this.totalrow>0){
        this.checkLoading= false;
       }
        // console.log('data   = ', data);
    });



  }

  sleep(ms: any): Promise<any> {
    return new Promise((r) => setTimeout(r, ms));
  }

  loadByySiteDeVente(id: number) {
    this.service
      .getBySiteVenteId(id)
      //  .pipe(first())
      .subscribe((data: any) => {
        this.marchandise = data;
        this.totalrow = data.length;
        // console.log('data   = ', data);
        // console.log('ListMarchandise id  = ', data.id);
      });
  }

  loadActifBySite(idSite: number) {
    this.service
      .getBySiteVenteAll(idSite)
      .pipe(first())
      .subscribe((userData: any) => {
        this.marchandise = userData;
        this.totalrow = userData.length;
        //  console.log('ListMarchandise all  = ', userData);
      });
  }

  afficherTouteLesDonnees(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      this.loadEntity();

      //this.loadActifBySite(this.siteId);
    } else {
      this.isCheckedShowAllRecord = false;
      this.loadActif();
      // this.loadByySiteDeVente(this.siteId);
    }
  }

  edit(id: any) {
    debugger;
    this.onAddindCondVente.emit(id);
  }

  initFormData() {
    this.entitiForm = this.formBuilder.group({
      id: 0,
      ref_march: [''],
      designation_march: ['', Validators.required],

      // date_peremption: [''],
      createdAt: [new Date()],
      exonore: [this.estExonorer],
      nouveaute: [this.isCheckedShowAllRecord],

      description: [''],
      pu_march: [''],
      stk_init_march: [''],
      seuil_alerte: [''],
      totalMarch: [''],

      codebar_march: [''],
      uniteVente: ['', Validators.required],
      typeCodeBar: ['', Validators.required],
      fournisseur: ['', Validators.required],
      photo: [''],
      sousCategorie: ['', Validators.required],
      //  siteDeVente: ['', Validators.required],
      supprime: [false],
    });
  }

  initFormTmpData() {
    this.formTmpData = this.formBuilder.group({
      id: 0,
      clef: [''],
      valeur: [''],
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

        // for (let a of this.article?.sousCategorie) {
        //    this.libCategorie = a.categorie?.lib_cat;
        //     console.log('libCategorie ', this.libCategorie);
        //   }
        // this.sousCategorie=  this.article.;
        //  console.log(this.paysTest);
        console.log(this.marchandise);
        this.totalrow = userData.length;
      });
  }
  delete(data: Article) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.service
        .delete(data.id)
        .pipe(first())
        .subscribe(
          () => {
            this.loadActif();
            //  this.loadByySiteDeVente(this.siteId);
          },
          (error) => console.log(error)
        );
    }
  }

  restore(data: Article) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.service
        .redo(data.id)
        .pipe(first())
        .subscribe(
          () => {
            this.loadActif();
            // this.loadByySiteDeVente(this.siteId);
          },
          (error) => console.log(error)
        );
    }
  }
  details(id: number) {
    this.loadActif();
    this.router.navigate(['detailMarchandise', id]);
  }
  //  routerLink="/pays/edit/{{ dataList.idPays }}"
  test: any;
  sCatName: any;
  update(id: number) {
    this.service.getById(id).subscribe((x) => {
      this.sCatName = x.sousCategorie?.lib_scat;
      this.entitiForm.patchValue({
        sousCategorie: this.sCatName,
      });
      // console.log("sc", this.sCatName );
    });
    this.router.navigate(['/marchandise/edit/', id]);
  }
  idMarch?: any;
  uniteVente?: UniteMesure;
  marchandiseName: String | undefined;
  uniteVenteDefinie?: String;
  puht: any;
  package = false;

  condVente(id: any) {
    this.service.getById(id).subscribe((x) => {
      console.log('x', x);
    });

    this.router.navigate(['/condVente/c/', id]);
  }

  //  (click)="conditionnementVente(dataList.id,$event)"
  conditionnementVente(id: any, $event: { preventDefault: () => void }) {
    $event.preventDefault();
    this.service
      .getById(id)
      .pipe(first())
      .subscribe((data: any) => {
        this.marchandise = data.id;
        // localStorage.setItem('selected_article_id', data.id);

        this.formTmpData.value.clef = 'article';
        this.formTmpData.value.valeur = this.marchandise;
        this.idtmpServiceService.create(this.formTmpData.value);
        //  localStorage.setItem( data.ref_march, data.id);
        // console.log('tmp  : ', this.formTmpData.value);
      });

    //console.log('id', id);
    // conditionnementvent/edit/
    this.router.navigate(['addConditionnementvent']);
  }

  loadDevise() {
    this.service.getAll().subscribe(
      (response) => {
        this.marchandise = response;
        // console.log(this.siteDeVente);
      },
      //  (error) => this.toastr.warning('Login Incorrecte ')
      (error) => console.log(error)
    );
  }
}

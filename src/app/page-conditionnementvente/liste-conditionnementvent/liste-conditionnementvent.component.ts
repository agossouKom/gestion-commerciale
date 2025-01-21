import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Article } from 'src/app/my-modele/article';
import { Categosie } from 'src/app/my-modele/categosie';
import { Conditionnementvente } from 'src/app/my-modele/conditionnementvente';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { Photo } from 'src/app/my-modele/photo';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { TypeCodeBar } from 'src/app/my-modele/type-code-bar';
import { Utilisateur } from 'src/app/my-modele/utlilisateur';
import { CategorieService } from 'src/app/my-service/categorie.service';
import { ConditionnementventeService } from 'src/app/my-service/conditionnementvente.service';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { MarchandiseService } from 'src/app/my-service/marchandise.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { SouscategorieService } from 'src/app/my-service/souscategorie.service';
import { TypeCodeBarService } from 'src/app/my-service/type-code-bar.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-liste-conditionnementvent',
  templateUrl: './liste-conditionnementvent.component.html',
  styleUrls: ['./liste-conditionnementvent.component.css'],
})
export class ListeConditionnementventComponent {
  entitiForm: FormGroup;
  //formadd!: FormGroup;
  conditionnementvente: Array<Conditionnementvente> = [];

  typeCodeBar!: TypeCodeBar;
  fournisseur!: Fournisseur;
  photo!: Photo;
  categorie!: Categosie;
  sousCategorie!: SousCategorie;
  siteDeVente!: SiteDeVente;
  utilisateur!: Utilisateur;
  conditionnementventeX!: Conditionnementvente;
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  estExonorer = false;
  p: number = 1;
  searchText: any;
  siteName: String | undefined | null;

  @Output() onAddindCondVente = new EventEmitter<any>();

  afficherTout: String = 'Afficher les données supprimées';
  titre: String = 'Liste des conditionnements de ventes';

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
    public marchandiseService: MarchandiseService,
    public service: ConditionnementventeService,
    public fournisseurservice: FournisseurService,
    public categosieService: CategorieService,
    public souscategorieService: SouscategorieService,
    public siteDeVenteService: SitevDeVenteService,
    public typeCodeBarService: TypeCodeBarService,
    public userInfoService: UserInfoService
  ) {
    this.entitiForm = fb.group({});
   // let user_site_id = this.userInfoService.user_site_id;
   //  this.siteId = Number(user_site_id);
  }
  message:String="";
  checkLoading = false;
 // .getBysiteVenteConventionVengte(id)
  ngOnInit() {
    this.loadActif();
   // this.loadByySiteDeVente(this.siteId);
    this.fournisseurservice.getActif();
    this.categosieService.getActif();
    this.souscategorieService.getActif();
    this.siteDeVenteService.getActif();
    this.typeCodeBarService.getActif();

    this.entitiForm.patchValue({
      sousCategorie: this.test,
      siteDeVente: this.siteV,
    });


    this.userInfoService.sleep(this.userInfoService.ms).then(() => {
      this.checkLoading = true;
      this.message= this.userInfoService.message;
      if(this.totalrow>0){
        this.checkLoading= false;
       }
        // console.log('data   = ', data);
    });
  }

  edit(id: any) {
    debugger;
    this.onAddindCondVente.emit(id);
  }


  loadByySiteDeVente(id: number) {
    this.service
      .getBySiteVenteId(id)
      //  .pipe(first())
      .subscribe((data: any) => {
        this.conditionnementvente  = data;
        this.totalrow = data.length;
       // console.log('data   = ', data);
        // console.log('ListMarchandise id  = ', data.id);
      });
  }


  initFormData() {
    this.entitiForm = this.formBuilder.group({
      id: 0,
      ref_march: [''],
      designation_march: ['', Validators.required],

      date_peremption: [''],
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
      siteDeVente: ['', Validators.required],
      supprime: [false],
    });
  }

  afficherTouteLesDonnees(event: any) {
    if (event.target.checked) {
       event.preventDefault()
      this.isCheckedShowAllRecord = true;
      this.loadEntity();
    } else {
       event.preventDefault()
      this.isCheckedShowAllRecord = false;
      this.loadActif();
    }
  }
  loadEntity() {
    this.service
      .getAll()
      .pipe(first())
      .subscribe((userData) => {
        this.conditionnementvente = userData;
        //    console.log(this.paysTest);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.conditionnementvente = userData;

        // for (let a of this.article?.sousCategorie) {
        //    this.libCategorie = a.categorie?.lib_cat;
        //     console.log('libCategorie ', this.libCategorie);
        //   }
        // this.sousCategorie=  this.article.;
        //  console.log(this.paysTest);
        //  console.log( this.article );
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
            // this.loadEntity();
            this.loadActif();
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
            // this.loadEntity();
            this.loadActif();
          },
          (error) => console.log(error)
        );
    }
  }
  details(id: number) {
    this.router.navigate(['detailConditionnementvent', id]);
  }
  //  routerLink="/pays/edit/{{ dataList.idPays }}"
  test: any;
  siteV: any;
  uniteVente?: String;
  update(id: number) {
    this.service.getById(id).subscribe((x) => {
      this.uniteVente = x.uniteVente?.unite;
      if (this.uniteVente == 'PACKAGE') {
        this.package = true;
        localStorage.setItem('PACKAGE', 'true');
      //  console.log('package ', this.package);
    //    console.log('uniteVente ', this.uniteVente);
      } else {
        this.package = false;
        localStorage.setItem('PACKAGE', 'false');
      }
    });
    this.router.navigate(['/conditionnementvent/edit/', id]);
  }
  idMarch?: any;

  conditionnementVente(id: any) {
    this.service.getById(id).subscribe((x) => {});
    console.log('id', id);
    // this. marchandiseId=id;

    //localStorage.removeItem('march_id');
    localStorage.setItem('march_id', id);

    // this. edit(id);
    this.router.navigate(['addConditionnementvent']);
    //  this.router.navigate(['/marchandise/edit/', id]);
  }

  counted = false;
  package = false;
  visible = false;
}

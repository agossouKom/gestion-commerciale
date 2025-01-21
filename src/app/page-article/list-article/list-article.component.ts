import { Component } from '@angular/core';
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
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { Photo } from 'src/app/my-modele/photo';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { TypeCodeBar } from 'src/app/my-modele/type-code-bar';
import { Utilisateur } from 'src/app/my-modele/utlilisateur';
import { ArticleService } from 'src/app/my-service/article.service';
import { CategorieService } from 'src/app/my-service/categorie.service';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { SouscategorieService } from 'src/app/my-service/souscategorie.service';
import { TypeCodeBarService } from 'src/app/my-service/type-code-bar.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css'],
})
export class ListArticleComponent {
  entitiForm: FormGroup;
  //formadd!: FormGroup;
  article: Array<Article> = [];

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
  p: number = 1;
  searchText: any;
  afficherTout: String = 'Afficher les données supprimées';
  titre: String = 'Liste des articles';

  control: FormControl = new FormControl('');
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public service: ArticleService,
    public fournisseurservice: FournisseurService,
    public categosieService: CategorieService,
    public souscategorieService: SouscategorieService,
    public siteDeVenteService: SitevDeVenteService,
    public typeCodeBarService: TypeCodeBarService ,
     private userInfoService:UserInfoService,
  ) {
    this.entitiForm = fb.group({});
  }
  message:String="";
  checkLoading = false;


  ngOnInit() {
    this.loadActif();
    this.fournisseurservice.getActif();
    this.categosieService.getActif();
    this.souscategorieService.getActif();
    this.siteDeVenteService.getActif();
    this.typeCodeBarService.getActif();
    // this.initFormData();
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

  initFormData() {
    this.entitiForm = this.formBuilder.group({
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

  afficherTouteLesDonnees(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      this.loadEntity();
    } else {
      this.isCheckedShowAllRecord = false;
      this.loadActif();
    }
  }
  loadEntity() {
    this.service
      .getAll()
      .pipe(first())
      .subscribe((userData) => {
        this.article = userData;
        //    console.log(this.paysTest);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.article = userData;
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
    this.router.navigate(['detailArticle', id]);
  }
  //  routerLink="/pays/edit/{{ dataList.idPays }}"
  test: any;
  siteV: any;
  update(id: number) {
    this.service.getById(id).subscribe((x) => {
      this.test = x.sousCategorie?.lib_scat;
      this.siteV = x.siteDeVente?.lib_site;
      //
      // console.log( this.siteV );
      // this.entitiForm.patchValue({
      //  sousCategorie: this.test,
      //  siteDeVente: this.siteV,
      // siteDeVente:' this.siteV',
      //  });

      // console.log('lib_scat', this.test);
    });
    this.router.navigate(['/article/edit/', id]);
  }

  loadDevise() {
    this.service.getAll().subscribe(
      (response) => {
        this.article = response;
        console.log(this.siteDeVente);
      },
      //  (error) => this.toastr.warning('Login Incorrecte ')
      (error) => console.log(error)
    );
  }

  sleep(ms: any): Promise<any> {
    return new Promise((r) => setTimeout(r, ms));
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/my-modele/article';
import { Banque } from 'src/app/my-modele/banque';
import { Categosie } from 'src/app/my-modele/categosie';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { Societe } from 'src/app/my-modele/societe';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { TypeCodeBar } from 'src/app/my-modele/type-code-bar';
import { ArticleService } from 'src/app/my-service/article.service';
import { CategorieService } from 'src/app/my-service/categorie.service';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { SouscategorieService } from 'src/app/my-service/souscategorie.service';
import { TypeCodeBarService } from 'src/app/my-service/type-code-bar.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css'],
})
export class DetailArticleComponent {
  id: number | undefined;
  article: Article | undefined;
  path: String = 'listArticle';
  deatil: String = "Détail sur l'article";

  titre: String | undefined;
  showTitre: String | undefined;
  typeCodeBars: TypeCodeBar[] | undefined;
  fournisseur: Fournisseur[] | undefined;
  //fournisseurs: Array<Fournisseur> = [];
  categosies: Array<Categosie> = [];
  souscategories: Array<SousCategorie> = [];
  siteDeVentes: Array<SiteDeVente> = [];
  banqueListes: Banque[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public service: ArticleService,
    public fournisseurservice: FournisseurService,
    public categosieService: CategorieService,
    public souscategorieService: SouscategorieService,
    public siteDeVenteService: SitevDeVenteService,
    public typeCodeBarService: TypeCodeBarService
  ) {}

  ngOnInit() {
    this.article = new Article();
    this.id = this.route.snapshot.params['id'];
    this.service.getById(this.id).subscribe(
      (data: any) => {
          console.log(data);
        this.article = data;
        this.typeCodeBars = this.article?.typeCodeBar;
        this.fournisseur = this.article?.fournisseur;
        this.titre = this.article?.designa_article;
        this.showTitre =this.deatil +" " +this.titre;
        //   console.log('banqueListes ' +  this.banqueListes);
        //   console.log('societe ' + data);
      },
      (error: any) => console.log(error)
    );
  }

  list() {
    this.router.navigate([this.path]);
  }
}

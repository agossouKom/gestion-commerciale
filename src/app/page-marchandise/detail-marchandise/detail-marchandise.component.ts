import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/my-modele/article';
import { Banque } from 'src/app/my-modele/banque';
import { Categosie } from 'src/app/my-modele/categosie';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { Marchandise } from 'src/app/my-modele/marchandise';
import { Photo } from 'src/app/my-modele/photo';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { TypeCodeBar } from 'src/app/my-modele/type-code-bar';
import { CategorieService } from 'src/app/my-service/categorie.service';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { MarchandiseService } from 'src/app/my-service/marchandise.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { SouscategorieService } from 'src/app/my-service/souscategorie.service';
import { TypeCodeBarService } from 'src/app/my-service/type-code-bar.service';

@Component({
  selector: 'app-detail-marchandise',
  templateUrl: './detail-marchandise.component.html',
  styleUrls: ['./detail-marchandise.component.css'],
})
export class DetailMarchandiseComponent {
  id: number | undefined;
  marchandise: Marchandise | undefined;
  path: String = 'listArticle';
  deatil: String = "Détail sur l'article type";

  titre: String | undefined;
  showTitre: String | undefined;
  typeCodeBars: TypeCodeBar[] | undefined;
  fournisseur: Fournisseur[] | undefined;
  site: SiteDeVente[] | undefined;
  photos: Photo[] | undefined;

  uri: Marchandise | undefined;
  //fournisseurs: Array<Fournisseur> = [];
  categosies: Array<Categosie> = [];
  souscategories: Array<SousCategorie> = [];
  siteDeVentes: Array<SiteDeVente> = [];
  banqueListes: Banque[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public service: MarchandiseService,
    public fournisseurservice: FournisseurService,
    public categosieService: CategorieService,
    public souscategorieService: SouscategorieService,
    public siteDeVenteService: SitevDeVenteService,
    public typeCodeBarService: TypeCodeBarService
  ) {}

  ngOnInit() {
    this.marchandise = new Article();
    this.id = this.route.snapshot.params['id'];
    this.service.getById(this.id).subscribe(
      (data: any) => {
        console.log(data);
        this.marchandise = data;
        this.typeCodeBars = this.marchandise?.typeCodeBar;
        this.fournisseur = this.marchandise?.fournisseur;
        this.titre = this.marchandise?.designation_march;
        this.showTitre = this.deatil + ' ' + this.titre;
        this.photos = this.marchandise?.photo;

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

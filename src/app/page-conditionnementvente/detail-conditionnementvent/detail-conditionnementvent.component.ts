import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/my-modele/article';
import { Banque } from 'src/app/my-modele/banque';
import { Categosie } from 'src/app/my-modele/categosie';
import { Conditionnementvente } from 'src/app/my-modele/conditionnementvente';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { Marchandise } from 'src/app/my-modele/marchandise';
import { Photo } from 'src/app/my-modele/photo';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { TypeCodeBar } from 'src/app/my-modele/type-code-bar';
import { UniteMesure } from 'src/app/my-modele/unite-mesure';
import { ConditionnementventeService } from 'src/app/my-service/conditionnementvente.service';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { MarchandiseService } from 'src/app/my-service/marchandise.service';

@Component({
  selector: 'app-detail-conditionnementvent',
  templateUrl: './detail-conditionnementvent.component.html',
  styleUrls: ['./detail-conditionnementvent.component.css']
})
export class DetailConditionnementventComponent {
  id: number | undefined;
  conditionnementvente: Conditionnementvente | undefined;
  path: String = 'listArticle';
  deatil: String = 'Détail sur la marchandise';

  titre: String | undefined;
  showTitre: String | undefined;

  marchandises?: Marchandise[] ;
  //uniteMesures?: UniteMesure[] ;

  uniteMesures: Array<UniteMesure> = [];
  uri: Marchandise | undefined;

  uniteMesure: UniteMesure | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public marchandiseService: MarchandiseService,
    public service: ConditionnementventeService,
    public fournisseurservice: FournisseurService,
  ) {}

  ngOnInit() {
    this.conditionnementvente = new Conditionnementvente();
    this.id = this.route.snapshot.params['id'];
    this.service.getById(this.id).subscribe(
      (data: any) => {
        console.log(data);
        this.conditionnementvente = data;
      // this.marchandises = this.conditionnementvente!.marchandise;
        this.uniteMesure = this.conditionnementvente?.uniteVente;
        //this.titre = this.conditionnementvente?.designation_march;
        this.showTitre = this.deatil + ' ' + this.titre;


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

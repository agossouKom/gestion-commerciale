import { Categosie } from './categosie';
import { Fournisseur } from './fournisseur';
import { Photo } from './photo';
import { SiteDeVente } from './site-de-vente';
import { SousCategorie } from './sous-categorie';
import { TypeCodeBar } from './type-code-bar';
import { UniteMesure } from './unite-mesure';
import { Utilisateur } from './utlilisateur';

export class Article {
  id?: any;
  ref_article?: String;
  designa_article?: String;
  codebar_article?: String;

  date_peremption?: Date;
  createdAt?: Date;

  nouveaute?: Boolean;
  pa_article?: number;
  pv_article?: number;

  qteAchete?: number;
  pu_article?: number;

  qte_init_article?: number;
  qte_min_article?: number;

  stockFinal?: number;
  valStock?: number;
  appreciation?: String;

  uniteMesure?: UniteMesure;
  typeCodeBar?: TypeCodeBar[];
  fournisseur?: Fournisseur[];
  //photo?: Photo;
  categorie?: Categosie;
  sousCategorie?: SousCategorie;
  siteDeVente?: SiteDeVente;

  utilisateur?: Utilisateur;
  exonore?: Boolean;
  supprime?: Boolean;
  disponible?: Boolean;

}

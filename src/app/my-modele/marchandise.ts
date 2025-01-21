import { Aib } from './aib';
import { Categosie } from './categosie';
import { Fournisseur } from './fournisseur';
import { GroupeTaxe } from './groupe-taxe';
import { Photo } from './photo';
import { SiteDeVente } from './site-de-vente';
import { SousCategorie } from './sous-categorie';
import { TypeCodeBar } from './type-code-bar';
import { TypeFacture } from './type-facture';
import { UniteMesure } from './unite-mesure';
import { Utilisateur } from './utlilisateur';

export class Marchandise {
  id?: any;
  ref_march?: String;
  designation_march?: String;
  description?: String;
  seuil_alerte?: number;
  typeCodeBar?: TypeCodeBar[];
  fournisseur?: Fournisseur[];
  photo?: Photo[];
  sousCategorie?: SousCategorie;
 // siteDeVente?: SiteDeVente;
  exonore?: Boolean;
  nouveaute?: Boolean;
  disponible?: Boolean;
  iscondvent?: Boolean;
  aib?: Aib ;
  groupetaxe?:  GroupeTaxe ;
  typefacture?:  TypeFacture ;
}

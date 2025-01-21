import { EntreeMarchandise } from './entree-marchandise';
import { Fournisseur } from './fournisseur';
import { SiteDeVente } from './site-de-vente';
import { UniteMesure } from './unite-mesure';

export class Reception {
  id?: any;
  quantite?: number;
  stock?: number;
  qtedejarecu?: number;
  qteactuel_cmd?: number;
  commandeChezFournisseur?: EntreeMarchandise;
  normalized?: Boolean;
  datereception: any;
  appreciation: any;
  cmup?: number;
  valrStock?: number;
}

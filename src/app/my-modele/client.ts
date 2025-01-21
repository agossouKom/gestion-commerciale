import { Banque } from './banque';
import { Commande } from './commande';
import { SiteDeVente } from './site-de-vente';

export class Client {
  id?: any;
  raisonSocialeClient?: String;
  nom?: String;
  prenom?: String;
  tel_clt?: String;
  email_clt?: String;
  fax_clt?: String;
  banque?: Banque[] = [];
  siteDeVente?: SiteDeVente;
  adresse?: String;
  ifuClient?: String;
  // commande?: Commande[] = [];//ar
  // supprime?: Boolean;
}

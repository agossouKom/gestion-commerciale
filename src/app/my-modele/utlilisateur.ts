import { Photo } from './photo';
import { Role } from './role';
import { SiteDeVente } from './site-de-vente';

export class Utilisateur {
  id!: any;
  username!: String;
  password!: String;
  nom!: String;
  prenoms!: String;
  email!: String;
  supprime?: Boolean;
  roles?: Role[];
  photo?: Photo[];
  site?: SiteDeVente[];
 
}

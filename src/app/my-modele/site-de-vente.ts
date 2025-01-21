import { Fournisseur } from './fournisseur';
import { Societe } from './societe';
import { Ville } from './ville';

export class SiteDeVente {
  id?: any;
  lib_site?: String;
  abrege_site?: String;
  adresse_site?: String;
  tel_moile_site?: String;
  tel_fixe_site?: String;
  email_site?: String;
  ville?: Ville;
  societe?: Societe;
  supprime?: Boolean;
  fournisseur?: Fournisseur[];
}

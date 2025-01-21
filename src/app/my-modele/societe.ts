import { Banque } from './banque';
import { Devise } from './devise';
import { Fournisseur } from './fournisseur';
import { ModeExpedition } from './mode-expedition';
import { ModeReglement } from './mode-reglement';
import { ModeTransport } from './mode-transport';
import { Pays } from './pays';
import { Photo } from './photo';
import { TvaGlobale } from './tva-globale';

export class Societe {
  id?: any;
  nom_ste?: String;
  abrege_ste?: String;
  adresse_ste?: String;
  tel_moile_ste?: String;
  tel_fixe_ste?: String;
  fax_ste?: String;
  matricule_ste?: String;
  rib_ste?: String;
  rccm_ste?: String;
  ifu_ste?: String;

  email_ste?: String;
  bp_ste?: String;
  dateCreation?: String;
  numAutorisation?: String;
  statutSte?: String;
  siret?: String;
  siteweb?: String;

  photo?: Photo;

  banque?: Banque[];
  fournisseur?: Fournisseur[];
  modereglement?: ModeReglement[];
  modeTransport?: ModeTransport[];
  tvaGlobale?: TvaGlobale[]
  modeExpedition?: ModeExpedition[];
  devise?: Devise[];
  pays?: Pays;
  supprime?: Boolean;
}

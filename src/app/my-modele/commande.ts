import { AnneeExercice } from './AnneeExercice';
import { Article } from './article';
import { ModeReglement } from './mode-reglement';
import { ModeTransport } from './mode-transport';
import { SiteDeVente } from './site-de-vente';
import { Utilisateur } from './utlilisateur';

export class Commande {
  id?: any;
  date_cmde?: number;
  delai_livrsn?: Date;
  etat_cmde?: String;
  lieu_livrsn?: String;
  avance_sur_cmde?: number;
  totht_cmde?: number;
  tottva_cmde?: number;
  totttc_cmde?: number;
  pu_cmde?: number;
  qte_cmde?: number;
  tva_cmde?: number;

  anneeExercice?: AnneeExercice;
  modeReglement?: ModeReglement;
  modeTransport?: ModeTransport;
  article?: Article;
  siteDeVente?: SiteDeVente;
  //factureClient?: FactureClient;
  utilisateur?: Utilisateur;
  supprime?: Boolean;
}

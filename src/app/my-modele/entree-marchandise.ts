import { AnneeExercice } from './AnneeExercice';
import { Fournisseur } from './fournisseur';
import { Marchandise } from './marchandise';
import { ModeReglement } from './mode-reglement';
import { SiteDeVente } from './site-de-vente';
import { UniteMesure } from './unite-mesure';

export class EntreeMarchandise {
  identree?: any;
  refentree?: String;
  qteentree?: number;
  montantTotalentree?: number;
  montant_e_ht?: number;
  montant_e_ttc?: number;
  dateReception?: Date;
  echeance?: Date;
  date_peremption_art?: Date;
  modeReglement?: ModeReglement;
  marchandiseentree?: Marchandise;

  uniteVente?: UniteMesure;
  cmde_en_ligne_f?: Boolean;

  fournisseur?: Fournisseur;
  dateentree?: Date;
  // anneeExercice?: AnneeExercice ;

  estFacturer!: Boolean;
  estReceptioned?: Boolean;
}

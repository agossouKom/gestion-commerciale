import { Client } from './client';
import { Marchandise } from './marchandise';

export class SortieMarchandise {
  idsortie?: any;
  refsortie?: String;
  qtesortie?: number;
  montantTotalsortie?: number;
  montant_s_ht?: number;
  montant_s_ttc?: number;
  marchandise?: Marchandise;
  clientsortie?: Client[];
  supprime?: Boolean;
}

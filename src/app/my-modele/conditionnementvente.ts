import { Marchandise } from './marchandise';
import { UniteMesure } from './unite-mesure';

export class Conditionnementvente {
  id?: any;
  //qte?: number;
  // paht?: number;
  //pvht?: number;
  nbrePiece?: number;
  prixVente?: number;
  prixAchat?: number;
  uniteVente?: UniteMesure;
  marchandise?: Marchandise;
}

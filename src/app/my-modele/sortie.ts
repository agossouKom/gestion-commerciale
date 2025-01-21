import { Article } from './article';
import { Client } from './client';
import { ReferenceSortie } from './reference-sortie';
import { Marchandise } from './marchandise';
import { EntreeMarchandise } from './entree-marchandise';
import { SiteDeVente } from './site-de-vente';
import { Aib } from './aib';
import { TypeFacture } from './type-facture';
import { GroupeTaxe } from './groupe-taxe';

export class Sortie {
  id?: any;
  qtesortie?: number;
  montantht?: number;
  montantttc?: number;
  remise?: number;
  montanttotal?: number;
  montantrecu?: number;
  relica?: number;
  normaliser?: Boolean;
  client?: Client;
  marchandise?: Marchandise;
  reference?: String;
  heure?: Date;
  datesortie?: Date;
  siteDeVente?:  SiteDeVente 
}

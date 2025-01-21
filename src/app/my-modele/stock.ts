import { Marchandise } from "./marchandise";
import { SiteDeVente } from "./site-de-vente";

export class Stock {
  id?: any;
  libelle?:String;
  code?:String;
  cmupstk?:number;
  pustk?:number;
  qtestk?:number;
  appreciationstk?:String;
  valrStk?:number;
  createAtstk?:String;
  marchandise?:  Marchandise ;
   siteDeVente?:SiteDeVente;
}

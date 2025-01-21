import { Banque } from "./banque";
import { Devise } from "./devise";
import { Pays } from "./pays";

export class Fournisseur {

   id?: any;
   nomFsr?: String;
   adresse_fsr?: String;
   tel_fsr?: String;
   email_fsr?: String;
   fax_fsr?: String;

   matfisc_fsr?: String;
   sold_init_fsr?: number;
   solde_final_fsr?: number;
   franco ?:number;
   created_fsr_at?: Date;

   banque?:Banque[] = [];
   devise?: Devise[] = [];
   pays?: Pays;

   //devis?: Devis[] = [];
}

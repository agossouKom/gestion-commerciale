import { Utilisateur } from "./utlilisateur";

export class Devise {
  id?: any;
  libelleDevise!: String;
  symboleIcon?: String;
  deviseAbrege?: String;
  utilisateur?: Utilisateur;
  supprime: Boolean =false;
}

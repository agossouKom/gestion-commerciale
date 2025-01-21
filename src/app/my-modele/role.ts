import { Privilege } from './privilege';

export class Role {
  id!: any;
  name!: String;
  privilege!: Privilege[];
  Supprime?: Boolean;
}

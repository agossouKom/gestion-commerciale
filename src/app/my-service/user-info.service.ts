import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  //isAdmin = false;
  //isUser = false;
  // role: any;

  constructor() {}
  ms: any = 10000;

  public user_site = localStorage.getItem('user_site');
  public access_token = localStorage.getItem('access_token');
  public userId = localStorage.getItem('user_id');
  public user_roles = localStorage.getItem('user_roles');
  public user_site_id = localStorage.getItem('user_site_id');

  public selected_article_id = localStorage.getItem('selected_article_id');

  message: String =
    'Aucune donnée disponible pour le moment...le chargement prend trop de temps';
  connexion: String = 'La connexion prend trop de temps';

  sleep(ms: any): Promise<any> {
    return new Promise((r) => setTimeout(r, ms));
  }

  userRole(role: any): boolean {
    if (
      role == 'SUPERADMIN' ||
      role == 'ADMIN' ||
      role == 'DIRECTEUR' ||
      role == 'PDG' ||
      role == 'SUPERVISEUR' ||
      role == 'DRH'
    ) {
 
      return true;
    } else if (role == 'GERANT' || role == 'CAISSE' || role == 'MAGASIN') {
 
      return false;
    } else {
      return false;
    }

    // return false;
  }

  // public remoove_selected_article_id = localStorage.removeItem('selected_article_id');
  // localStorage.removeItem('access_token');

  //public timeOut(seconde:number){
  // setTimeout(() => {
  //console.log('setTimeout');
  //  this.isSuccesVente = false;
  // }, seconde);

  //}
}

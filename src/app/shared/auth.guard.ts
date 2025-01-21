import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { UtilisateurService } from '../my-service/utilisateur.service';
import { TokenStorageService } from './token-storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public utilisateurService: UtilisateurService,
    public router: Router,
    private tokenStorageService: TokenStorageService
  ) {}
  canActivate
  (route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
  //  if (this.utilisateurService.isLoggedIn !== true) {
    //  window.alert('Access non autorisé!');
     // this.router.navigate(['login']);
    //}
    let test = this.tokenStorageService.isLoged();
  //  console.log(test);
    if (test) {
      return true;
    }
    return this.router.navigate(['login']);
    window.location.reload();
  }
}

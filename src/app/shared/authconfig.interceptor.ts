import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ACCESS_TOKEN } from '../my-modele/ccurrent-token';
import { TokenStorageService } from './token-storage.service';
import { UtilisateurService } from '../my-service/utilisateur.service';

@Injectable({
  providedIn: 'root',
})
export class AuthConfig implements HttpInterceptor {
  userIdLocal: number = 0;

  constructor(
    private tokenStorageService: TokenStorageService,
    private utilisateurService: UtilisateurService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //  const token = localStorage.getItem('access_token');
    // console.log('requete originelle : \n' + ACCESS_TOKEN);
    if (ACCESS_TOKEN !== null) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + ACCESS_TOKEN),
        /*  setHeaders: {
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }*/


      });
      // console.log('requete clonee : \n' + cloned);
      return next.handle(cloned).pipe(
        catchError((err) => {
          console.log('erreur lors de la connexion : \n' + err);
          if (err.status == 401) {
            console.log('erreur lors de la connexion : \n' + err.status);
            this.tokenStorageService.clearToken();
            let userId = localStorage.getItem('user_id');
            let numId: number = Number(userId);
            this.userIdLocal = numId;
            console.log(this.userIdLocal);
            console.log('401');
            this.utilisateurService.setCanLoginToTrue2(this.userIdLocal);
          } else if (err.status == 423) {
            console.log('erreur lors de la connexion 423: \n' + err.status);
            // this.tokenStorageService.clearToken();
            let userId = localStorage.getItem('user_id');
            let numId: number = Number(userId);
            this.userIdLocal = numId;
            console.log(this.userIdLocal);
            console.log('423');
            this.utilisateurService.setCanLoginToTrue2(this.userIdLocal);
          }
          return throwError('Session expirée');
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
export const TokenInterceptoProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthConfig,
  multi: true,
};

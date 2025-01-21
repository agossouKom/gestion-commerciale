import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.prod';
import { Utilisateur } from '../my-modele/utlilisateur';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../shared/token-storage.service';
import { ACCESS_TOKEN } from '../my-modele/ccurrent-token';
import { SiteDeVente } from '../my-modele/site-de-vente';
import { Photo } from '../my-modele/photo';
import { Role } from '../my-modele/role';
//import * as fs from 'fs';

const utilisateurAuthUrl = environment.apiUrl + '/api/v1/admin/utilisateur';
const login = environment.apiUrl + '/api/v1/auth/login';
const logoutEndPoint = environment.apiUrl + '/api/v1/auth/logout';
const logout_dam = utilisateurAuthUrl + '/logout';
const register = utilisateurAuthUrl + '/register';
const all = utilisateurAuthUrl + '/all';
const profile = utilisateurAuthUrl;
const update = utilisateurAuthUrl + '/update';
const actifEtInactif = environment.apiUrl + '/api/v1/admin/utilisateur/all';

const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const reference = urlBase + apiPrefix;
const actifRole = reference + '/admin/role';

const actifPhoto = reference + '/photos/actifs';
const postPhoto = reference + '/photos';
const getPhotoById = reference + '/photos';
const removePhoto = reference + '/photos/remove';
const redoPhoto = reference + '/photos';

const apiPrefixSiteVente = '/api/v1';
const entitySite = '/siteDeVentes';
const actifSiteVente = urlBase + apiPrefixSiteVente + entitySite + '/actifs'; //localhost:8080/api/v1/pays
const redoData = URL + '/redo';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  // Authorization: `Bearer `+ACCESS_TOKEN,
});

const headersImage = new HttpHeaders({
  'Content-Type': 'application/octet-stream',
  Accept: 'application/octet-stream',
  // Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };
let requestOptionsImage = { headers: headersImage };
@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUtlilisateur = {};
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ) { }
  isAdmin = false;
  isUser = false;
  roleName: any;
  siteUser: any;
  siteUserId: any;
  username: any;
  password: any;
  isSucces = false;
  getPhotById(id: number) {
    return this.http.get<Photo>(`${getPhotoById}/${id}`);
  }
  deletePhotById(id: any) {
    return this.http.delete<Photo>(`${removePhoto}/${id}`, requestOptionsImage);
  }

  //  restorePhotById(id: any) {
  //   return this.http.put<Photo>(`${redoPhoto}/${id}`);
  // }

  postPhoto(formData: FormData) {
    return this.http.post(postPhoto, formData).subscribe((res) => {
      if (res) {
        this.toastr.success('Efectué avec Success');
        console.log(res);
      } else {
        this.toastr.info('Sauvegarde  échouée ');
        //this.handleError(error);
      }
    });
  }

  redo(id: any) {
    return this.http.put(`${redoData}/${id}`, requestOptions);
  }

  upload(file: File): Observable<Photo> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<Photo>(postPhoto, formData);
  }

  getActif() {
    return this.http.get<Role[]>(actifRole);
  }
  getActifSiteVente() {
    return this.http.get<SiteDeVente[]>(actifSiteVente);
  }
  getActifPhoto() {
    return this.http.get<Photo[]>(actifPhoto);
  }
  // register
  signUp(u: Utilisateur): Observable<any> {
    return this.http.post(register, u).pipe(catchError(this.handleError));
  }
  // login
  userIdLocal: number = 0;
  signIn(u: Utilisateur) {
    return this.http.post<any>(login, u, requestOptions).subscribe((res: any) => {
      //   console.log('user_id ' + res.user.id);

      if (res) {
        this.isSucces = true;
        this.toastr.success('Connexion Faite avec Success');
        console.log('user ', res.user);
        this.username = res.user.username;
        this.password == res.user.password;
        // getById(id: number);
        // const words = fs.readFileSync('./userId.txt', 'utf-8');
        for (let r of res.user.roles) {
          this.roleName = r.name;
          // console.log('roleName ', this.roleName);
        }

        for (let s of res.user.site) {
          this.siteUser = s.lib_site;
          this.siteUserId = s.id;
          // console.log('site ', this.siteUser);
        }

        this.tokenStorageService.saveToken(
          res.token.access,
          res.user.id,
          this.siteUser,
          this.roleName,
          this.siteUserId
        );
        //
        // this.router.navigate(['accueil']); //dashbord
        if (
          this.roleName == 'SUPERADMIN' ||
          this.roleName == 'PDG' ||
          this.roleName == 'ADMIN'
        ) {
          this.isAdmin = true;
          // this.router.navigate(['index']); //dashbord
          this.router.navigate(['accueil']).then(() => {
            this.isAdmin = true;
            window.location.reload();
          }); //dashbord
        }
        if (this.roleName == 'CAISSE' || this.roleName == 'GERANT') {
          this.isUser = true;
          //   this.router.navigate(['index']).then(() => {
          //  window.location.reload();
          //  }); //dashbord


          this.router.navigate(['accueil']).then(() => {
            window.location.reload();
          }); //dashbord

        }
        // this.router.navigate(['']);
      } else {
        this.toastr.info('Conexion  échouée ');
        this.isSucces = false;
        let userId = localStorage.getItem('user_id');
        let numId: number = Number(userId);
        this.userIdLocal = numId;
        console.log(this.userIdLocal);
        this.setCanLoginToTrue2(this.userIdLocal);

        this.router.navigate(['login']).then(() => {
          window.location.reload();
        }); //dashbord
      }
      // this.getUtlilisateurProfile(res.id).subscribe((res) => {
      // this.currentUtlilisateur = res;
      // this.router.navigate(['Utlilisateur-profile/' + res.msg._id]);
      // });
    });
  }

  gettToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  setCanLoginToTrue(): void {
    //http://localhost:8080/api/v1/admin/utilisateur/logout/1
    let userId = localStorage.getItem('user_id');
    // const words = fs.readFileSync('./userId.txt', 'utf-8');
    console.log(userId);
    console.log(`${logout_dam}/${userId}`);

    this.http.put(`${logout_dam}/${userId}`, '');
  }

  setCanLoginToTrue2(id: any) {
    console.log('Deconnexion', id);
    this.http.put(`${logout_dam}/${id}`, '');
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  logout(): Observable<any> {
    let api = logoutEndPoint;
    return this.http.get(api).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  //updateEmployee(id: number, value: any): Observable<Object> {
  //  return this.http.put(`${this.baseUrl}/${id}`, value);
  // }

  // Utlilisateur profile
  getUtlilisateurProfile(id: any): Observable<any> {
    let api = profile + '/Utlilisateur-profile/' + id;
    return this.http.get(api, requestOptions).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getAll() {
    return this.http.get<Utilisateur[]>(utilisateurAuthUrl);
  }

  getAllUserDeletedOrNot() {
    return this.http.get<Utilisateur[]>(all);
  }

  getById(id: any) {
    //   console.log(utilisateurAuthUrl);
    //   console.log(id);
    return this.http.get<Utilisateur>(`${utilisateurAuthUrl}/${id}`);
  }

  /**create(params: any) {
    return this.http.post(utilisateurAuthUrl, params, requestOptions);
  }*/

  //update(params: Employee) {
  //    return this.http.put(`${baseUrl}`, params, this.httpOptions);
  //}

  update(id: number, value: Utilisateur): Observable<Object> {
    return this.http.put(`${update}/${id}`, value, requestOptions);
  }

  delete(id: number) {
    return this.http.delete(`${utilisateurAuthUrl}/${id}`, requestOptions);
  }

  getCurrentUserInfo() {
    let userId = localStorage.getItem('user_id');
    return this.http.get<Utilisateur>(`${utilisateurAuthUrl}/${userId}`);
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}

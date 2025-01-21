import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Banque } from '../my-modele/banque';
import { Devise } from '../my-modele/devise';
import { Fournisseur } from '../my-modele/fournisseur';
import { Pays } from '../my-modele/pays';
import { Societe } from '../my-modele/societe';
import { TvaGlobale } from '../my-modele/tva-globale';
import { TokenStorageService } from '../shared/token-storage.service';


const banque= environment.apiUrl + '/api/v1/banques/actifs';

const fournisseur= environment.apiUrl + '/api/v1/fournisseurs/actifs';

const tvaGlobale= environment.apiUrl + '/api/v1/tvaGlobales/actifs';

const devise= environment.apiUrl + '/api/v1/devises/actifs';

const pays= environment.apiUrl + '/api/v1/pays/actifs';


//const baseUrl = environment.apiUrl + '/api/v1/pays';

const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/fournisseurs';
const URL = urlBase+apiPrefix+entity;//localhost:8080/api/v1/pays

const postData = URL;
const putData = URL + '/update';
const getPerId = URL + '/show-one';
const deleteData = URL + '/remove';
const allData = URL + '/all';
const actif =URL + '/actifs';
const redoData =URL + '/redo';
const siteVente =URL + '/siteVente';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json'
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {

  //actions = ACTIONS;
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ) {}


  getBySiteVenteId(id: any) {
    // console.log(getPerId);
     //console.log(id);
     return this.http.get<Fournisseur>(`${siteVente}/${id}`);
   }

  loadbanque(): Observable<Banque[]> {
   return this.http.get<Banque[]>(banque, requestOptions);
  }

  loadfournisseur(): Observable<Fournisseur[]> {
    return this.http.get<Societe[]>(fournisseur, requestOptions);
  }


  loadtvaGlobale(): Observable<TvaGlobale[]> {
    return this.http.get<TvaGlobale[]>(tvaGlobale, requestOptions);
  }

  loadpays(): Observable<Pays[]> {
    return this.http.get<Pays[]>(pays, requestOptions);
  }
  loaddevise(): Observable<Devise[]> {
    return this.http.get<Devise[]>(devise, requestOptions);
  }


  getAll() {
    return this.http.get<Fournisseur[]>(allData);
  }

  getById(id: any) {
   // console.log(getPerId);
    //console.log(id);
    return this.http.get<Fournisseur>(`${getPerId}/${id}`);
  }
 // rechercher(query: any) {
   // return this.http.get<Annee[]>(`${rechercher}=${query}`);
 // }
  getActif() {
    return this.http.get<Fournisseur[]>(actif);
  }

  create(params: Fournisseur) {
    return this.http.post(postData, params, requestOptions).subscribe((res) => {
       if (res) {
       this.toastr.success('Efectué avec Success');
       console.log(res);
       this.getActif();
      // this.router.navigate(['listAnnees']);
     } else {
       this.toastr.info('Sauvegarde  échouée ');
       //this.handleError(error);
     }

   });
  }

  update(id: number, value: Fournisseur): Observable<Object> {
    return this.http.put(`${putData}/${id}`, value, requestOptions);
  }

  delete(id: any) {
    return this.http.delete(`${deleteData}/${id}`, requestOptions);
  }
  redo(id: any) {
    return this.http.put(`${redoData}/${id}`, requestOptions);
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

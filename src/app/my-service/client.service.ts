import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Banque } from '../my-modele/banque';
import { Client } from '../my-modele/client';
import { Commande } from '../my-modele/commande';
import { SiteDeVente } from '../my-modele/site-de-vente';
import { Societe } from '../my-modele/societe';
import { TvaGlobale } from '../my-modele/tva-globale';
import { TokenStorageService } from '../shared/token-storage.service';


const banque= environment.apiUrl + '/api/v1/banques/actifs';
const siteDeVente= environment.apiUrl + '/api/v1/siteDeVentes/actifs';
const commande= environment.apiUrl + '/api/v1/commandes/actifs';


//const baseUrl = environment.apiUrl + '/api/v1/pays';

const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/clients';
const URL = urlBase+apiPrefix+entity;//localhost:8080/api/v1/pays

const postData = URL;
const putData = URL + '/update';
const getPerId = URL + '/show-one';
const deleteData = URL + '/remove';//deleteUpDate
const deleteUpDate = URL + '/deleteUpDate';//deleteUpDate
const allData = URL + '/all';
const actif =URL + '/actifs';
const redoData =URL + '/redo';
const siteVente =URL + '/siteVente';
const siteVenteAll =URL + '/siteVenteAll';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json'
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  //actions = ACTIONS;
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ) {}


  getBySiteVenteId(id: number) {
    return this.http.get<Client[]>(`${siteVente}/${id}`);
  }
  getBySiteVenteAll(id: number) {
    return this.http.get<Client[]>(`${siteVenteAll}/${id}`);
  }


  loadbanque(): Observable<Banque[]> {
    return this.http.get<Banque[]>(banque, requestOptions);
  }

  loadSiteDeVente(): Observable<SiteDeVente[]> {
    return this.http.get<Societe[]>(siteDeVente, requestOptions);
  }


  loadCommande(): Observable<Commande[]> {
    return this.http.get<TvaGlobale[]>(commande, requestOptions);
  }




  getAll() {
    return this.http.get<Client[]>(allData);
  }

  getById(id: any) {
   // console.log(getPerId);
    //console.log(id);
    return this.http.get<Client>(`${getPerId}/${id}`);
  }
 // rechercher(query: any) {
   // return this.http.get<Annee[]>(`${rechercher}=${query}`);
 // }
  getActif() {
    return this.http.get<Client[]>(actif);
  }

  create(params: Client) {
    return this.http.post(postData, params, requestOptions).subscribe((res) => {
       if (res) {
       this.toastr.success('Efectué avec Success');
       console.log(res);
    //   this.getActif();
      // this.router.navigate(['listAnnees']);
     } else {
       this.toastr.info('Sauvegarde  échouée ');
       //this.handleError(error);
     }

   });
  }

  update(id: number, value: Client): Observable<Object> {
    return this.http.put(`${putData}/${id}`, value, requestOptions);
  }

  delete(id: any) {
    return this.http.put(`${deleteUpDate}/${id}`, requestOptions);
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

import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Pays } from '../my-modele/pays';
import { Ville } from '../my-modele/ville';
import { TokenStorageService } from '../shared/token-storage.service';
import { SiteDeVente } from '../my-modele/site-de-vente';
import { Societe } from '../my-modele/societe';

const banque = environment.apiUrl + '/api/v1/banques/actifs';
const ville = environment.apiUrl + '/api/v1/villes/actifs';

const modereglement = environment.apiUrl + '/api/v1/modeReglement/actifs';
const modeTransport = environment.apiUrl + '/api/v1/modeTransport/actifs';
const tvaGlobale = environment.apiUrl + '/api/v1/tvaGlobales/actifs';
const modeExpedition = environment.apiUrl + '/api/v1/modeExpedition/actifs';
const devise = environment.apiUrl + '/api/v1/devises/actifs';
const sociee = environment.apiUrl + '/api/v1/maSocietes/actifs';
const photo = environment.apiUrl + '/api/v1/photos/actifs';
const fournisseur = environment.apiUrl + '/fournisseurs';
//const baseUrl = environment.apiUrl + '/api/v1/pays';
//findBId
const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/siteDeVentes';
const URL = urlBase + apiPrefix + entity; //localhost:8080/api/v1/pays

const postData = URL;
const putData = URL + '/maj';
const getPerId = URL + '/show-one';
const deleteData = URL + '/remove';
const allData = URL + '/all';
const actifs = URL + '/actifs';
const redoData = URL + '/redo';

const findById = URL + '/findById';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root',
})
export class SitevDeVenteService {
  //actions = ACTIONS;
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  getByFournisseurName(name: String) {
    return this.http.get<SiteDeVente>(`${fournisseur}/${name}`);
  }

  loadville(): Observable<Ville[]> {
    return this.http.get<Ville[]>(ville, requestOptions);
  }

  loadsociete(): Observable<Societe[]> {
    return this.http.get<Societe[]>(sociee, requestOptions);
  }

  getAll() {
    return this.http.get<SiteDeVente[]>(allData);
  }

  findByIdSite(id: any) {
    return this.http.get<SiteDeVente>(`${findById}/${id}`);
  }

  getById(id: any) {
    // console.log(getPerId);
    //console.log(id);
    return this.http.get<SiteDeVente>(`${getPerId}/${id}`);
  }
  // rechercher(query: any) {
  // return this.http.get<Annee[]>(`${rechercher}=${query}`);
  // }
  getActif() {
    return this.http.get<SiteDeVente[]>(actifs);
  }

  create(params: SiteDeVente) {
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

  update(id: number, value: SiteDeVente): Observable<Object> {
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

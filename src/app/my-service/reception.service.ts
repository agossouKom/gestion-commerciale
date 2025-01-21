import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Reception } from '../my-modele/reception';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../shared/token-storage.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';




const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/receptionCommandes';

const entityMArchandie = '/Receptions';
const entityFournisseur = '/Receptions';
const entityModeReglement = '/Receptions';



const entitysetReference = '/setReference';

const URL = urlBase + apiPrefix + entity;//localhost:8080/api/v1/Reception

const postData = URL;
const postReception = URL + "/createReception";
const putData = URL + '/update';
const getPerId = URL + '/show-one';
const deleteData = URL + '/remove';
const allData = URL + '/all';
const actif = URL + '/actifs';
const redoData = URL + '/redo';
const latReference = URL + '/latReference';
const siteVente = URL + '/siteVente';
const siteVenteAll = URL + '/siteVenteAll';

const checkIfReceptionExiste = URL + '/checkIfReceptionExiste';
const stockByMarchandise = URL + '/stockByMarchandise';
const sumStock = URL + '/sumStock';


//const allReceptionsV2 = URL + '/allReceptionsV2';
const allReceptionsV2 = URL + '/allReceptionsV3';


const allReceptionDelActif = URL + '/allReceptionDelActif';
//
const count = URL + "/count";

const reference = urlBase + apiPrefix;
const simpleReferenceDate = reference + '/referenceSorties/simpleReferenceDates';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json'
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root',
})
export class ReceptionService {
  //private baseUrl = '/api/v1/Reception';

  //actions = ACTIONS;
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ) { }

  getCount() {
    return this.http.get<number>(count);
  }
  getReferenceDate() {
    return this.http.get<String>(simpleReferenceDate);
  }


  simpleReferenceDate() {
    console.log(simpleReferenceDate);
    return this.http.get<String>(simpleReferenceDate);
  }

  lastRef() {
    return this.http.get<number>(latReference);
  }


  allReceptionsV2() {
    return this.http.get<Reception[]>(allReceptionsV2);
  }

  allReceptionDelActif() {
    return this.http.get<Reception[]>(allReceptionDelActif);
  }
  getAll() {
    return this.http.get<Reception[]>(allData);
  }

  getById(id: any) {
    // console.log(getPerId);
    //console.log(id);
    return this.http.get<Reception>(`${getPerId}/${id}`);
  }

  getBySiteVenteId(id: number) {
    return this.http.get<Reception>(`${siteVente}/${id}`);
  }
  getBySiteVenteAll(id: number) {
    return this.http.get<Reception>(`${siteVenteAll}/${id}`);
  }

  checkIfReceptionExiste(id: number) {
    return this.http.get<Reception[]>(`${checkIfReceptionExiste}/${id}`);
  }
  checkIfReceptionExisteBool(id: number) {
    return this.http.get<any>(`${checkIfReceptionExiste}/${id}`);
  }

  stockByMarchandise(id: number) {
    return this.http.get<any>(`${stockByMarchandise}/${id}`);
  }

  sumStock(id: number) {
    return this.http.get<any>(`${sumStock}/${id}`);
  }

  getActif() {
    return this.http.get<Reception[]>(actif);
  }

  create(params: any) {
    return this.http.post(postData, params, requestOptions).subscribe((res) => {
      if (res) {
        this.toastr.success('Efectué avec Success');
        console.log(res);
        //  this.getActif();
        // this.router.navigate(['listAnnees']);
      } else {
        this.toastr.info('Sauvegarde  échouée ');
        //this.handleError(error);
      }

    });
  }

  update(id: number, value: Reception): Observable<Object> {
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

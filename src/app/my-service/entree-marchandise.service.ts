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
import { TokenStorageService } from '../shared/token-storage.service';
import { EntreeMarchandise } from '../my-modele/entree-marchandise';

const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/entreeMarchandises';

const entityMArchandie = '/entreeMarchandises';
const entityFournisseur = '/entreeMarchandises';
const entityModeReglement = '/entreeMarchandises';

const entitysetReference = '/setReference';

const URL = urlBase + apiPrefix + entity; //localhost:8080/api/v1/EntreeMarchandise

const postData = URL;
//const postEntreeMarchandise = URL + '/createEntreeMarchandise';
const postEntreeMarchandise = URL ;
const putData = URL + '/update';
const getPerId = URL + '/show-one';
const deleteData = URL + '/remove';
const allData = URL + '/all';
const actif = URL + '/actifs';
const redoData = URL + '/redo';
const latReference = URL + '/latReference';
const receptioned = URL + '/receptioned';
//const siteVente = URL + '/siteVenteCmd';
//const siteVenteAll = URL + '/siteVenteAll';
const articleName = URL + '/articleName';

//
const count = URL + '/count';

const reference = urlBase + apiPrefix;
const simpleReferenceDate =
  reference + '/referenceSorties/simpleReferenceDates';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root',
})
export class EntreeMarchandiseService {
  //private baseUrl = '/api/v1/EntreeMarchandise';

  //actions = ACTIONS;
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ) {}

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
  getAll() {
    return this.http.get<EntreeMarchandise[]>(allData);
  }
  getReceptioned() {
    return this.http.get<EntreeMarchandise[]>(receptioned);
  }
  getById(id: any) {
    // console.log(getPerId);
    //console.log(id);
    return this.http.get<EntreeMarchandise>(`${getPerId}/${id}`);
  }
  getByArticleName(name: String) {
    return this.http.get<any>(`${articleName}/${name}`);
  }

 // getBySiteVenteId(id: number) {
   // return this.http.get<EntreeMarchandise>(`${siteVente}/${id}`);
  //}

  //getBySiteVenteAll(id: number) {
    //return this.http.get<EntreeMarchandise>(`${siteVenteAll}/${id}`);
  //}

  getActif() {
    return this.http.get<EntreeMarchandise[]>(actif);
  }

  create(params: any) {
    console.log('params',params);
    return this.http
      .post(postEntreeMarchandise, params, requestOptions)
      .subscribe((res) => {
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

  update(id: number, value: EntreeMarchandise): Observable<Object> {
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

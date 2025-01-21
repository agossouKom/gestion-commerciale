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
import { Sortie } from '../my-modele/sortie';
import { TokenStorageService } from '../shared/token-storage.service';
import { Stock } from '../my-modele/stock';

const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/stockArticle';

const URL = urlBase + apiPrefix + entity;

const postData = URL;
const postArticle = URL + '/createSortie';
const putData = URL + '/update';
const putDQuantiteInitiale = URL + '/updateQuantieInitiale';
const getPerId = URL + '/show-one';
const deleteData = URL + '/remove';
const allData = URL + '/all';
const actif = URL + '/actifs';
const redoData = URL + '/redo';
const stckCount = URL + '/stockCount';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root',
})
export class StockService {
  //actions = ACTIONS;
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  getAll() {
    return this.http.get<Stock[]>(allData);
  }

  getById(id: any) {
    return this.http.get<Stock>(`${getPerId}/${id}`);
  }

  getStockCountByIdArticle(id: any) {
    return this.http.get<Stock>(`${stckCount}/${id}`);
  }
  //getUniteVenteByLibelle(libelle: any) {
  // return this.http.get<any>(`${URL_uvente}/${libelle}`);
  //}

  //getSiteVenteId(id: any) {
  // return this.http.get<any>(`${parsiteDeVente}/${id}`);
  //}

  getActif() {
    return this.http.get<Stock[]>(actif);
  }

  toutesLesVentes(id: any) {
    // return this.http.get<Sortie[]>(toutesLesVentes);
    return this.http.get<Stock[]>(`${actif}/${id}`);
  }

  create(params: Stock) {
    return this.http
      .post(postArticle, params, requestOptions)
      .subscribe((res) => {
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

  update(id: number, value: Stock): Observable<Object> {
    return this.http.put(`${putData}/${id}`, value, requestOptions);
  }

  updateQuantiteInitiale(id: number, value: Stock): Observable<Object> {
    return this.http.put(`${putData}/${id}`, value, requestOptions);
  }

  delete(id: any) {
    return this.http.delete(`${deleteData}/${id}`, requestOptions);
  }

  redo(id: any) {
    return this.http.put(`${redoData}/${id}`, requestOptions);
  }

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

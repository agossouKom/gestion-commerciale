import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ModeExpedition } from '../my-modele/mode-expedition';
import { TokenStorageService } from '../shared/token-storage.service';


const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/modeExpedition';
const URL = urlBase+apiPrefix+entity;//localhost:8080/api/v1/devises

const postData = URL;
const putData = URL + '/update';
const getPerId = URL + '/show-one';
const deleteData = URL + '/remove';
const allData = URL + '/all';
const actif =URL + '/actifs';
const redoData =URL + '/redo';
const setCurent =URL + '/definirAnneeCourante';
const setArchive = URL + '/archiverAnneeExercice';


const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  // Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };


@Injectable({
  providedIn: 'root'
})
export class ModeExpeditionService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUtlilisateur = {};
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ) {}


  getAll() {
    return this.http.get<ModeExpedition[]>(allData);
  }

  getById(id: any) {
    //console.log(getPerId);
   // console.log(id);
    return this.http.get<ModeExpedition>(`${getPerId}/${id}`);
  }

  getActif() {
    return this.http.get<ModeExpedition[]>(actif);
  }

  create(params: ModeExpedition) {
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

  update(id: number, value: ModeExpedition): Observable<Object> {
    return this.http.put(`${putData}/${id}`, value, requestOptions);
  }

  delete(id: number) {
    return this.http.delete(`${deleteData}/${id}`, requestOptions);
  }

  redo(id: number) {
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


import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpEvent, HttpHeaders, HttpErrorResponse,} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { Devise } from '../my-modele/devise';
import { TokenStorageService } from '../shared/token-storage.service';



const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/devises';
const URL = urlBase+apiPrefix+entity;//localhost:8080/api/v1/devises

const postData = URL;
const putData = URL + '/maj';
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
export class DeviseService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUtlilisateur = {};
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ) {}


  getAll() {
    return this.http.get<Devise[]>(allData);
  }

  getById(id: any) {
    //console.log(getPerId);
   // console.log(id);
    return this.http.get<Devise>(`${getPerId}/${id}`);
  }

  getActif() {
    return this.http.get<Devise[]>(actif);
  }

  create(params: Devise) {
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

  update(id: number, value: Devise): Observable<Object> {
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

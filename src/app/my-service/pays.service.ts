import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { Devise } from '../my-modele/devise';
import { ACCESS_TOKEN } from '../my-modele/ccurrent-token';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../shared/token-storage.service';
 
import { Pays } from '../my-modele/pays';

//token:String;

const deviseUrl = environment.apiUrl + '/api/v1/devises/actifs';

//const baseUrl = environment.apiUrl + '/api/v1/pays';

const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/pays';
const URL = urlBase+apiPrefix+entity;//localhost:8080/api/v1/pays

const postData = URL;
const putData = URL + '/maj';
const getPerId = URL + '/show-one';
const deleteData = URL + '/remove';
const allData = URL + '/all';
const actif =URL + '/actifs';
const redoData =URL + '/redo';
//const setCurent =URL + '/definirAnneeCourante';
//const setArchive = URL + '/archiverAnneeExercice';
//const rechercher = URL + '/rechercher?query';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json'
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root',
})
export class PaysService {
  //private baseUrl = '/api/v1/pays';

  listData!: Pays[];
  public dataForm!: FormGroup;


  //actions = ACTIONS;
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ) {}


  loadDevise(): Observable<Devise[]> {
    return this.http.get<Devise[]>(deviseUrl, requestOptions);
  }



  getAll() {
    return this.http.get<Pays[]>(allData);
  }

  getById(id: any) {
   // console.log(getPerId);
    //console.log(id);
    return this.http.get<Pays>(`${getPerId}/${id}`);
  }
 // rechercher(query: any) {
   // return this.http.get<Annee[]>(`${rechercher}=${query}`);
 // }
  getActif() {
    return this.http.get<Pays[]>(actif);
  }

  create(params: Pays) {
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

  update(id: number, value: Pays): Observable<Object> {
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

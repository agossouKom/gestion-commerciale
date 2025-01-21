import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Article } from '../my-modele/article';
import { TokenStorageService } from '../shared/token-storage.service';


const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/articles';

const entitysetReference = '/setReference';

const URL = urlBase+apiPrefix+entity;//localhost:8080/api/v1/Article

const postData = URL;
const postArticle=URL+"/createArticle";
const putData = URL + '/update';
const getPerId = URL + '/show-one';
const deleteData = URL + '/remove';
const allData = URL + '/all';
const actif =URL + '/actifs';
const redoData =URL + '/redo';
const latReference =URL + '/latReference';
//const simpleReferenceDate =URL + '/simp//leReferenceDate';

//const setCurent =URL + '/definirAnneeCourante';
//const setArchive = URL + '/archiverAnneeExercice';
//const rechercher = URL + '/rechercher?query';
//
 const count = URL + "/count";
//const referenceFromDate = reference + '/setReference/simpleReferenceDate';

const reference = urlBase + apiPrefix;
const simpleReferenceDate = reference + '/referenceSorties/simpleReferenceDates';




//const simpleReferenceDate = reference + '/referenceSorties/simpleReferenceDate';
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json'
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  //private baseUrl = '/api/v1/Article';

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
  //getCurrentReference(): Observable<any> {
   // return this.http.get(simpleReferenceDate);
  //}

  simpleReferenceDate() {
    console.log(simpleReferenceDate);
    return this.http.get<String>(simpleReferenceDate);
  }

  lastRef() {
    return this.http.get<number>(latReference);
  }
  getAll() {
    return this.http.get<Article[]>(allData);
  }

  getById(id: any) {
   // console.log(getPerId);
    //console.log(id);
    return this.http.get<Article>(`${getPerId}/${id}`);
  }
 // rechercher(query: any) {
   // return this.http.get<Annee[]>(`${rechercher}=${query}`);
 // }
  getActif() {
    return this.http.get<Article[]>(actif);
  }

  create(params: Article) {
    return this.http.post(postArticle, params, requestOptions).subscribe((res) => {
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

  update(id: number, value: Article): Observable<Object> {
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

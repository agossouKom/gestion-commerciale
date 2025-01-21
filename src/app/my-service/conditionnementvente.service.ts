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
import { Conditionnementvente } from '../my-modele/conditionnementvente';
import { Photo } from '../my-modele/photo';
import { TokenStorageService } from '../shared/token-storage.service';

const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/conditionnementVentes';

const entitysetReference = '/setReference';

const URL = urlBase + apiPrefix + entity; //localhost:8080/api/v1/Article

const postData = URL;
const postArticle = URL + '/createConditionnementvente';
const putData = URL + '/update';
const marchandiseId = URL + '/marchandiseId';
const marchandiseId2 = URL + '/marchandiseId2';

const getPerId = URL + '/show-one';
const deleteData = URL + '/remove';
const allData = URL + '/all';
const actif = URL + '/actifs';
const redoData = URL + '/redo';
const latReference = URL + '/latReference';
const photoConditionnementvente = URL + '/img';

const conditionnementVenteUri =
  urlBase + apiPrefix + '/marchandises/conditionnementVente';

//
const count = URL + '/count';

const simpleReferenceDate =
  urlBase + apiPrefix + '/referenceSorties/simpleReferenceDates';

  const devise =
  urlBase + apiPrefix + '/devises/actifs';

const reference = urlBase + apiPrefix;
const actifRole = reference + '/admin/role';

const actifPhoto = reference + '/photos/actifs';
const actifByIdDesc = reference + '/photos/actifByIdDesc';

const postPhoto = reference + '/photos';
const getPhotoById = reference + '/photos';
const removePhoto = reference + '/photos/remove';
const redoPhoto = reference + '/photos';

const apiPrefixSiteVente = '/api/v1';


const siteVente = URL + '/siteVenteCondVente';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root',
})
export class ConditionnementventeService {
  urlBaseM = environment.apiUrl;
  apiPrefixM = '/api/v1';
  entityM = '/Conditionnementventes/img/';

  public baseUrlPhoto = this.urlBaseM + this.apiPrefixM + this.entityM;

  //actions = ACTIONS;
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ) {}
  geMarchandiseById(id: number) {
    return this.http.get<Conditionnementvente[]>(`${marchandiseId}/${id}`);
  }

  geOneMarchandiseById(id: any) {
    return this.http.get<Conditionnementvente[]>(`${marchandiseId2}/${id}`);
  }

  getCount() {
    return this.http.get<number>(count);
  }
  getReferenceDate() {
    return this.http.get<String>(simpleReferenceDate);
  }
  getActifPhoto() {
    return this.http.get<Photo[]>(actifByIdDesc);
  }

  getActifPhotoConditionnementvente(id: any) {
    return this.http.get<Conditionnementvente>(
      `${photoConditionnementvente}/${id}`
    );
  }

  getBySiteVenteId(id: any) {
    return this.http.get<Conditionnementvente>(`${siteVente}/${id}`);
  }


  postPhoto(formData: FormData) {
    return this.http.post(postPhoto, formData).subscribe((res) => {
      if (res) {
        this.toastr.success('Efectué avec Success');
        console.log(res);
      } else {
        this.toastr.info('Sauvegarde  échouée ');
        //this.handleError(error);
      }
    });
  }
  upload(file: File): Observable<Photo> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<Photo>(postPhoto, formData);
  }

  getPhotById(id: number) {
    return this.http.get<Photo>(`${getPhotoById}/${id}`);
  }

  deletePhotById(id: any) {
    return this.http.delete<Photo>(`${removePhoto}/${id}`);
  }
  simpleReferenceDate() {
    console.log(simpleReferenceDate);
    return this.http.get<String>(simpleReferenceDate);
  }

  lastRef() {
    return this.http.get<number>(latReference);
  }
  getAll() {
    return this.http.get<Conditionnementvente[]>(allData);
  }

  getById(id: any) {
    // console.log(getPerId);
    //console.log(id);
    return this.http.get<Conditionnementvente>(`${getPerId}/${id}`);
  }

  getActif() {
    return this.http.get<Conditionnementvente[]>(actif);
  }

  create(params: Conditionnementvente) {
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

  update(id: number, value: Conditionnementvente): Observable<Object> {
    return this.http.put(`${putData}/${id}`, value, requestOptions);
  }

  delete(id: any) {
    return this.http.delete(`${deleteData}/${id}`, requestOptions);
  }
  redo(id: any) {
    return this.http.put(`${redoData}/${id}`, requestOptions);
  }

  setConditionnementventeToTrue(id: any) {
    return this.http.put(`${conditionnementVenteUri}/${id}`, requestOptions);
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

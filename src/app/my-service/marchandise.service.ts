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
//import { Article } from '../my-modele/article';
import { TokenStorageService } from '../shared/token-storage.service';
import { Photo } from '../my-modele/photo';
import { Marchandise } from '../my-modele/marchandise';

const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/marchandises';

const entitysetReference = '/setReference';

const URL = urlBase + apiPrefix + entity; //localhost:8080/api/v1/Article

const postData = URL;
const postArticle = URL + '/createMarchandise';
const putData = URL + '/update';
const getPerId = URL + '/show-one';
const deleteData = URL + '/remove';
const allData = URL + '/all';
const getConventionnedProduct = URL + '/getConventionnedProduct';
const actif = URL + '/actifs';
const redoData = URL + '/redo';
const latReference = URL + '/latReference';
const photoMarchandise = URL + '/img';
const siteVente = URL + '/siteVente';
//
const count = URL + '/count';

const simpleReferenceDate =
  urlBase + apiPrefix + '/referenceSorties/simpleReferenceDates';

const reference = urlBase + apiPrefix;
const actifRole = reference + '/admin/role';

const actifPhoto = reference + '/photos/actifs';
const actifByIdDesc = reference + '/photos/actifByIdDesc';

const postPhoto = reference + '/photos';
const getPhotoById = reference + '/photos';
const removePhoto = reference + '/photos/remove';
const redoPhoto = reference + '/photos';

const apiPrefixSiteVente = '/api/v1';

const siteVenteAll = URL + '/siteVenteAll';

const siteVenteConventionVengte = URL + '/siteVenteConventionVente';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root',
})
export class MarchandiseService {
  urlBaseM = environment.apiUrl;
  apiPrefixM = '/api/v1';
  entityM = '/marchandises/img/';

  public baseUrlPhoto = this.urlBaseM + this.apiPrefixM + this.entityM;

  //actions = ACTIONS;
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  getBySiteVenteId(id: any) {
    // console.log(getPerId);
    //console.log(id);
    return this.http.get<Marchandise>(`${siteVente}/${id}`);
  }

  getBySiteVenteAll(id: number) {
    return this.http.get<Marchandise>(`${siteVenteAll}/${id}`);
  }

  getBysiteVenteConventionVengte(id: number) {
    return this.http.get<Marchandise>(`${siteVenteConventionVengte}/${id}`);
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

  getActifPhotoMarchandise(id: any) {
    return this.http.get<Marchandise>(`${photoMarchandise}/${id}`);
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
    return this.http.get<Marchandise[]>(allData);
  }
  getConventionnedProduct() {
    return this.http.get<Marchandise[]>(getConventionnedProduct);
  }
  getById(id: any) {
    // console.log(getPerId);
    //console.log(id);
    return this.http.get<Marchandise>(`${getPerId}/${id}`);
  }

  getActif() {
    return this.http.get<Marchandise[]>(actif);
  }

  create(params: Marchandise) {
    return this.http
      .post(postData, params, requestOptions)
      .subscribe((res) => {
        if (res) {
          this.toastr.success('Efectué avec Success');
          console.log(res);
         // this.getActif();
          // this.router.navigate(['listAnnees']);
        } else {
          this.toastr.info('Sauvegarde  échouée ');
          //this.handleError(error);
        }
      });
  }

  update(id: number, value: Marchandise): Observable<Object> {
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

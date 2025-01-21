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
import { ReferenceSortie } from '../my-modele/reference-sortie';
import { Base64convertorService } from './base64convertor.service';

const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/sorties';
const entityUvente = '/uniteMesures';

const URL_uvente = urlBase + apiPrefix + entityUvente; //localhost:8585/api/v1/Article

const ticket = urlBase + apiPrefix + '/ticket';

const URL = urlBase + apiPrefix + entity; //localhost:8585/api/v1/Article

const postData = URL;
const postArticle = URL + '/createSortie';
const putData = URL + '/update';
const putDQuantiteInitiale = URL + '/updateQuantieInitiale';
const getPerId = URL + '/show-one';
const deleteData = URL + '/remove';
const allData = URL + '/all';
const actif = URL + '/actifs';
const redoData = URL + '/redo';

const parsiteDeVente = URL + '/siteDeVente';
const reference = urlBase + apiPrefix;
const referenceOne = reference + '/referenceSorties/reference';

const toutesLesVentes = URL + '/toutesLesVentes';

const allSortie = URL + '/allSortie';
const byReference = URL + '/byReference';
const par_reference = URL + '/par_reference';

const filterTwoDate = URL + '/filterTwoDate';
const filterPoSDateParSite = URL + '/filterPoSDate';
const filterParSiteParArticle = URL + '/filterParSiteParArticle';
const genOpenParArticleParSite = URL + '/genOpenParArticleParSite';
const genOpenEntreDeuxDate = URL + '/genOpen';

const filterPoSDate = URL + '/filterPoSDate';
//const genOpen_filterPoSDate = URL + '/genOpen_filterPoSDate';
const genOpen_filterPoSDate = URL + '/genOpen_filterPoSDatev2';


//const setCurent =URL + '/definirAnneeCourante';
//const setArchive = URL + '/archiverAnneeExercice';
//const rechercher = URL + '/rechercher?query';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root',
})
export class SortieService {
  //private baseUrl = '/api/v1/Article';

  //actions = ACTIONS;
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public base64convertorService: Base64convertorService,
    public toastr: ToastrService
  ) { }
  getReference() {
    return this.http.get<String>(referenceOne);
  }

  filterTwoDate(date1: any, date2: any) {
    return this.http.get<Sortie[]>(`${filterTwoDate}/${date1}/${date2}`);
  }

  genAndOpen(date1: any, date2: any) {
    return this.http.get<Sortie[]>(`${genOpenEntreDeuxDate}/${date1}/${date2}`);
  }

  genOpenParArticleParSite(date1: any,
    date2: any,
    marchandise_id: any,
    site_de_vente_id: any) {
    return this.http.get<Sortie[]>(`${genOpenParArticleParSite}/${date1}/${date2}/${marchandise_id}/${site_de_vente_id}`);
  }


  filterPoSDateParSite(date1: any, date2: any, siteId: any) {
    return this.http.get<Sortie[]>(
      `${filterPoSDateParSite}/${date1}/${date2}//${siteId}`
    );
  }

  filterParSiteParArticle(
    date1: any,
    date2: any,
    marchandise_id: any,
    site_de_vente_id: any
  ) {
    return this.http.get<Sortie[]>(
      `${filterParSiteParArticle}/${date1}/${date2}/${marchandise_id}/${site_de_vente_id}`
    );
  }

  filterParSite(
    date1: any,
    date2: any,
    site_de_vente_id: any
  ) {
    return this.http.get<Sortie[]>(
      `${filterPoSDate}/${date1}/${date2}/${site_de_vente_id}`
    );
  }

  genOpen_filterParSite(date1: any,
    date2: any,
    site_de_vente_id: any) {
    return this.http.get<any[]>(`${genOpen_filterPoSDate}/${date1}/${date2}/${site_de_vente_id}`);
  }


  getAll() {
    return this.http.get<Sortie[]>(allData);
  }

  getById(id: any) {
    // console.log(getPerId);
    //console.log(id);
    return this.http.get<Sortie>(`${getPerId}/${id}`);
  }

  groupedSortie(id: any) {
    return this.http.get<Sortie[]>(`${allSortie}/${id}`);
  }
  byReferenceAndSiteVente(ref: any, id: any) {
    return this.http.get<Sortie[]>(`${byReference}/${ref}/${id}`);
  }

  listArticleparReference(ref: any, id: any) {
    return this.http.get<Sortie[]>(`${par_reference}/${ref}/${id}`);
  }

  getUniteVenteByLibelle(libelle: any) {
    return this.http.get<any>(`${URL_uvente}/${libelle}`);
  }

  getSiteVenteId(id: any) {
    return this.http.get<any>(`${parsiteDeVente}/${id}`);
  }

  // rechercher(query: any) {
  // return this.http.get<Annee[]>(`${rechercher}=${query}`);
  // }
  getActif() {
    return this.http.get<Sortie[]>(actif);
  }

  toutesLesVentes(id: any) {
    // return this.http.get<Sortie[]>(toutesLesVentes);
    return this.http.get<Sortie[]>(`${toutesLesVentes}/${id}`);
  }

  createTicket(params: any) {
    return this.http.post(ticket, params, requestOptions).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Effectué avec Succes');
        if (res.code == 200) {
          this.base64convertorService.printPdf(res.object);
        }


        console.log(res);
        // this.router.navigate(['listAnnees']);
      } else {
        this.toastr.info('Sauvegarde  échouée ');
        //this.handleError(error);
      }
    });
  }

  create(params: Sortie) {
    return this.http
      .post(postArticle, params, requestOptions)
      .subscribe((res: Sortie) => {
        if (res) {
          this.toastr.success('Efectué avec Success');
          const postReference = {
            reference: res.reference,
            idSite: res.siteDeVente?.id
          }
          console.log('postReference  ', postReference);

          this.createTicket(postReference);
          console.log(res);
          this.getActif();
          // this.router.navigate(['listAnnees']);
        } else {
          this.toastr.info('Sauvegarde  échouée ');
          //this.handleError(error);
        }
      });
  }

  update(id: number, value: Sortie): Observable<Object> {
    return this.http.put(`${putData}/${id}`, value, requestOptions);
  }
  updateQuantiteInitiale(id: number, value: Sortie): Observable<Object> {
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

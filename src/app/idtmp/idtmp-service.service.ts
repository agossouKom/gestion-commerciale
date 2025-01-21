import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Devise } from '../my-modele/devise';
import { Pays } from '../my-modele/pays';
import { TokenStorageService } from '../shared/token-storage.service';
import { IdTmp } from '../my-modele/id-tmp';
 

//const baseUrl = environment.apiUrl + '/api/v1/pays';

const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/idTmpService';
const URL = urlBase+apiPrefix+entity;//localhost:8080/api/v1/pays

const postData = URL;
const update = URL + '/update';
const maj = URL + '/maj';

const getPerId = URL + '/show-one';
 const getPerKey = URL + '/getPerKey';
 
 
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json'
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root',
})
export class IdtmpServiceService {
  //private baseUrl = '/api/v1/pays';

  listData!: Pays[];
  public dataForm!: FormGroup;
  formadd!: FormGroup;

  //actions = ACTIONS;
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {}

  getById(id: any) {
  return this.http.get<IdTmp>(`${getPerId}/${id}`);
  }
  getByKey(id: any) {
    return this.http.get<IdTmp>(`${getPerKey}/${id}`);
    }


  create(params: IdTmp) {
    return this.http.post(postData, params, requestOptions).subscribe((res) => {
       if (res) {
       this.toastr.success('Efectué avec Success');
       console.log(res);
     } else {
       this.toastr.info('Sauvegarde  échouée ');
     }

   });
  }

  update(id: number, value: IdTmp): Observable<Object> {
    return this.http.put(`${maj}/${id}`, value, requestOptions);
  }

  //delete(id: any) {
   // return this.http.delete(`${deleteData}/${id}`, requestOptions);
  //}
 
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

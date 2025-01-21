import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { TokenStorageService } from '../shared/token-storage.service';
import { ReferenceSortie } from '../my-modele/reference-sortie';


const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const entity = '/referenceSorties';

const URL = urlBase+apiPrefix+entity;//localhost:8080/api/v1/Reception

const reference=URL+"/referenceX";


 const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json'
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };


@Injectable({
  providedIn: 'root'
})
export class ReferenceSortieService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ) {}


  getReferenceSortie() {
    return this.http.get<ReferenceSortie>(reference);
  }

}

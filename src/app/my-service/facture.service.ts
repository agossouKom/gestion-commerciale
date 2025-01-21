import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { ReferenceSortie } from '../my-modele/reference-sortie';
import { TokenStorageService } from '../shared/token-storage.service';
import { Aib } from '../my-modele/aib';
import { GroupeTaxe } from '../my-modele/groupe-taxe';
import { TypeFacture } from '../my-modele/type-facture';

const urlBase = environment.apiUrl;
const apiPrefix = '/api/v1';
const aibEntity = '/aib';
const typeFactureEntity = '/typeFacture';
const taxeGroupEntity = '/taxGroup';

const aid_endPoint = urlBase + apiPrefix + aibEntity; //localhost:8080/api/v1/Reception
const type_facture_endPoint = urlBase + apiPrefix + typeFactureEntity; //localhost:8080/api/v1/Reception
const taxGroup_endpoint = urlBase + apiPrefix + taxeGroupEntity; //localhost:8080/api/v1/Reception

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  getaid_endPoint() {
    return this.http.get<Aib[]>(aid_endPoint);
  }
  gettype_facture_endPoint() {
    return this.http.get<TypeFacture[]>(type_facture_endPoint);
  }
  gettaxGroup_endpoint() {
    return this.http.get<GroupeTaxe[]>(taxGroup_endpoint);
  }
}

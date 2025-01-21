import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../my-modele/role';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor(private http: HttpClient, public router: Router) {}

  saveToken(token: string, id: any, site: any, role: any,siteId:any): void {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_id', id);
    localStorage.setItem('user_roles', role);
    localStorage.setItem('user_site', site);
    localStorage.setItem('user_site_id', siteId);
    /** / localStorage.setItem('user_role', role);
   localStorage.setItem('user_site_vente', site);*/
  }

  isLoged(): boolean {
    const token = localStorage.getItem('access_token');
    //console.log(token);
    return !!token; // le not not !! transformune une variableen boolean
  }

  clearToken(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_roles');
    localStorage.removeItem('user_site');
    localStorage.removeItem('user_site_id');
    this.router.navigate(['login']);
  }
}

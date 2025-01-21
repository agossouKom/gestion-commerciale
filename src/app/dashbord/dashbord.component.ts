import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../my-service/utilisateur.service';
import { TokenStorageService } from '../shared/token-storage.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
  // imports: [MainHeaderComponent, MainFooterComponent, ControlSidebarComponent],
})
export class DashbordComponent {
  isAdmin = false;
  isUser = false;
  role: any;
  constructor(
    private http: HttpClient,
    public router: Router,
    public tokenStorageService: TokenStorageService,
    public utilisateurService: UtilisateurService
  ) {
    let roles = localStorage.getItem('user_roles');
    this.role = roles;
  }

  ngOnInit() {

    if (this.role == "SUPERADMIN" ||
      this.role == "ADMIN" ||
      this.role == "DIRECTEUR" ||
      this.role == "PDG" ||
      this.role == "SUPERVISEUR" ||
      this.role == "DRH"
    ) {
      this.isAdmin = true;
      console.log('isAdmin :', this.isAdmin);
    }


    if (this.role == "GERANT" ||
      this.role == "CAISSE" ||
      this.role == "MAGASIN"
    ) {
      this.isUser = true;
      console.log('isUser :', this.isUser);
    }


  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.tokenStorageService.clearToken();
      this.router.navigate(['login']);
    }
  }

  setLogout() {
    this.utilisateurService.logout();
    this.doLogout();
  }
}

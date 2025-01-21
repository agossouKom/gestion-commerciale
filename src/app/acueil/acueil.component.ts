import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/my-service/utilisateur.service';
import { TokenStorageService } from '../shared/token-storage.service';
@Component({
  selector: 'app-acueil',
  templateUrl: './acueil.component.html',
  styleUrls: ['./acueil.component.css']
})




export class AcueilComponent {
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

    if(this.role =="SUPERADMIN" ||
    this.role =="ADMIN" ||
    this.role =="DIRECTEUR" ||
    this.role =="PDG" ||
     this.role =="SUPERVISEUR" ||
     this.role =="DRH"
    ){
      this.isAdmin=true;
      console.log('isAdmin :', this.isAdmin);
    }
  

  if(this.role =="GERANT" ||
    this.role =="CAISSE" ||
    this.role =="MAGASIN"  
    ){
      this.isUser=true;
      console.log('isUser :', this.isUser);
    }



   // this.utilisateurService.isUser=false;
    // window.location.reload();
    // return;
   }
}

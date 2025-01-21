import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Sortie } from 'src/app/my-modele/sortie';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { Stock } from 'src/app/my-modele/stock';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { StockService } from 'src/app/my-service/stock.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.css']
})
export class ListStockComponent {
  entitiForm: FormGroup;

  stock: Array<Stock> = [];
  rowPerPage: number = 10;

  stockParSite: Array<any> = [];
  sousCategorie!: SousCategorie;

  siteId: any;
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  afficherTout: String = 'Afficher les données supprimées';
  titre: String = 'Mouvement de Stock';

  userRole= false;
  isAdmin = false;
  isUser = false;
  role: any;


  control: FormControl = new FormControl('');
  constructor(
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public stockService: StockService,
    public userInfoService: UserInfoService,
    public sitevDeVenteService: SitevDeVenteService
  ) {
    this.entitiForm = fb.group({});
    let site = localStorage.getItem('user_site_id');
    let user_site_id = this.userInfoService.user_site_id;
    //  this.selected_article_id = this.userInfoService.selected_article_id;
    this.siteId = Number(user_site_id);
        let roles = localStorage.getItem('user_roles');
    this.role = roles;
  }
  
  message: String = 'Chargement en cours...';

  ngOnInit() {
    this.loadActif();
    this.userRole= this.userInfoService.userRole(this.role);
  }


  afficherTouteLesDonnees(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
     // this.loadEntity();
      this.loadAllSalleBySite(this.siteId);
    } else {
      this.isCheckedShowAllRecord = false;
    //  this.loadActif();
    }
  }
 

  loadAllSalleBySite(id: any) {
    this.stockService
      .toutesLesVentes(id)
      .pipe(first())
      .subscribe((userData) => {
        this.stockParSite = userData;
     
         console.log('all stock   ', this.stockParSite);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.stockService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.stock = userData;
        //  console.log(this.paysTest);
        //  console.log(userData);
        this.totalrow = userData.length;
      });
  }
  delete(data: Sortie) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.stockService
        .delete(data.id)
        .pipe(first())
        .subscribe(
          () => {
            // this.loadEntity();
          //  this.loadActif();
     
          },
          (error) => console.log(error)
        );
    }
  }

  restore(data: Sortie) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.stockService
        .redo(data.id)
        .pipe(first())
        .subscribe(
          () => {
            // this.loadEntity();
           // this.loadActif();
        
          },
          (error) => console.log(error)
        );
    }
  }

  details(id: number) {
    this.router.navigate(['detailSortie', id]);
 
  }
  //  routerLink="/pays/edit/{{ dataList.idPays }}"
  update(id: number) {
    this.router.navigate(['/sortie/edit/', id]);
 
  }

 

  //sitevDeVenteService
  siteDeVente: any;
  libelleSite: any;
  getBSiteDeVente(id: any) {
    this.sitevDeVenteService.getById(id).subscribe(
      (data: any) => {
        this.siteDeVente = data;
        this.libelleSite = this.siteDeVente.lib_site;
        //      this.totaClient = this.clients?.length;
        console.log('stockParSite   ', this.stockParSite);
      },
      (error: any) => console.log(error)
    );
  }
}

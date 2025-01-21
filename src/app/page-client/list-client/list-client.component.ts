import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Client } from 'src/app/my-modele/client';
import { Societe } from 'src/app/my-modele/societe';
import { BanqueService } from 'src/app/my-service/banque.service';
import { ClientService } from 'src/app/my-service/client.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent {
  entitiForm: FormGroup;

  clients: Client[] = [];
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  afficherTout:String="Afficher les données supprimées";
  titre:String="Client";
  message:String="";
  checkLoading = false;

  userSiteName!: any;
  userSiteId!: number;
  userId!: number;
  siteId: any;
  siteName: String | undefined | null;
  control: FormControl = new FormControl('');
  constructor(
   // public departementService: DepartementService,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public service: ClientService,
    public banqueservice: BanqueService,
    public siteDeVenteService: SitevDeVenteService,
     public userInfoService: UserInfoService
  ) {
    this.entitiForm = fb.group({});
    let user_site_id = this.userInfoService.user_site_id;
    this.siteId = Number(user_site_id);
  }



  ngOnInit() {
 //   this.loadActif();
    this.siteName = this.userInfoService.user_site;
    console.log('siteId   = ', this.siteId);
   this.loadByySiteDeVente(this.siteId);
  //  this.loadByySiteDeVente(2);
   this.banqueservice.getActif();
   this.siteDeVenteService.getActif();

   this.userInfoService.sleep(this.userInfoService.ms).then(() => {
    this.checkLoading = true;
    this.message= this.userInfoService.message;
    if(this.totalrow>0){
      this.checkLoading= false;
     }
      // console.log('data   = ', data);
  });
  }
  loadByySiteDeVente(id: number) {
    this.service
      .getBySiteVenteId(id)
      .pipe(first())
      .subscribe((data: any) => {
        this.clients = data;
        this.totalrow = data.length;
       console.log('client   = ', data);
      });
  }

  loadActifBySite(idSite:number) {
    this.service.getBySiteVenteAll(idSite)
      .pipe(first())
      .subscribe((userData: any) => {
        this.clients = userData;
        this.totalrow = userData.length;
        console.log('client all  = ', userData);
      });
  }

  afficherTouteLesDonnees(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      // this.loadEntity();
      this.loadActifBySite(this.siteId );
    } else {
      this.isCheckedShowAllRecord = false;
      this.loadByySiteDeVente( this.siteId );
    }
  }


  loadEntity() {
    this.service
      .getAll()
      .pipe(first())
      .subscribe((userData) => {
        this.clients = userData;
    //    console.log(this.paysTest);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.clients = userData;
      //  console.log(this.paysTest);
      //  console.log(userData);
        this.totalrow = userData.length;
      });
  }
  delete(data: Societe) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.service
      .delete(data.id)
      .pipe(first())
      .subscribe(() => {
        this.loadByySiteDeVente(this.siteId);
      },
      (error) => console.log(error));
    }

  }

  restore(data: Societe) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.service
      .redo(data.id)
      .pipe(first())
      .subscribe(() => {
        // this.loadEntity();
       // this.loadActif();
       this.loadByySiteDeVente(this.siteId);
      },
      (error) => console.log(error));
    }
  }

 details(id: number) {
    this.router.navigate(['detailClient', id]);
  }


//  routerLink="/pays/edit/{{ dataList.idPays }}"
  update(id: number) {
    this.router.navigate(['/client/edit/', id]);
  }
}

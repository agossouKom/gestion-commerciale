import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Banque } from 'src/app/my-modele/banque';
import { Client } from 'src/app/my-modele/client';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { BanqueService } from 'src/app/my-service/banque.service';
import { ClientService } from 'src/app/my-service/client.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent {
  id: number | undefined;
  client: Client | undefined;
  path: String = 'listClient';

  siteDeVentes: SiteDeVente| undefined ;
  banqueListes: Banque[] | undefined ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public service: ClientService,
    public banqueService: BanqueService,
    public siteDeVenteService: SitevDeVenteService,
  ) {}

  ngOnInit() {
    this.client = new Client();
    this.id = this.route.snapshot.params['id'];
    this.service.getById(this.id).subscribe(
      (data: any) => {
      //  console.log(data);
        this.client = data;
        this.banqueListes=this.client?.banque;
        this.siteDeVentes=this.client?.siteDeVente;
     //   console.log('banqueListes ' +  this.banqueListes);
       console.log('client ' , data);
      },
      (error: any) => console.log(error)
    );
  }




  list() {
    this.router.navigate([this.path]);
  }
}

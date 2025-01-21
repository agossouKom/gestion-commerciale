


import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/my-modele/client';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { Sortie } from 'src/app/my-modele/sortie';
import { SortieService } from 'src/app/my-service/sortie.service';

@Component({
  selector: 'app-detail-sortie',
  templateUrl: './detail-sortie.component.html',
  styleUrls: ['./detail-sortie.component.css']
})
export class DetailSortieComponent {
  id: number | undefined;
  sortie: Sortie | undefined;
  path: String = 'listeSortie';
  deatil: String = "Détail de la vente";

  titre: String | undefined;
  showTitre: String | undefined;

  clients: Client[] | undefined;

  siteDeVente: SiteDeVente[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public sortieService: SortieService
  ) {}
  totaClient: number| undefined;

  ngOnInit() {
    this.sortie = new Sortie();
    this.id = this.route.snapshot.params['id'];
    this.sortieService.getById(this.id).subscribe(
      (data: any) => {

        this.sortie = data;
//
     //   this.clients = this.sortie?.client;
        this.totaClient = this.clients?.length;

       // console.log('clients   ' , this.clients);


      },
      (error: any) => console.log(error)
    );
  }

  list() {
    this.router.navigate([this.path]);
  }
}


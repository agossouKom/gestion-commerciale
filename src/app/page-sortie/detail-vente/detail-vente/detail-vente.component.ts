import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/my-modele/client';
import { Sortie } from 'src/app/my-modele/sortie';
import { SortieService } from 'src/app/my-service/sortie.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-detail-vente',
  templateUrl: './detail-vente.component.html',
  styleUrls: ['./detail-vente.component.css'],
})
export class DetailVenteComponent {
  id: number | undefined;
  sortie: Sortie | undefined;
  path: String = 'listeSortie';
  deatil: String = "Gallerie des sorties d'article";

  titre: String | undefined;
  showTitre: String | undefined;

  clients: Client[] | undefined;

  sorties: Sortie[] = [];

  siteId!: number;
  sortiesFilter: Sortie[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public sortieService: SortieService,
    public userInfoService: UserInfoService
  ) {}

  ngOnInit() {
    this.sortie = new Sortie();
    // this.id = this.route.snapshot.params['id'];
    //let site = localStorage.getItem('user_site_id');
    let user_site_id = this.userInfoService.user_site_id;
    this.siteId = Number(user_site_id);
    console.log(this.siteId);

    //console.log( site);

    this.getLists(this.siteId);
  }
  
  totalrow: number = 0;

  getLists(id: any) {
    this.sortieService.groupedSortie(id).subscribe(
      (data: any) => {
        this.sorties = data;
        console.log('all sorties   ', this.sorties);
        this.totalrow = data.length;
      },
      (error: any) => console.log(error)
    );
  }

  list() {
    this.router.navigate([this.path]);
  }
}

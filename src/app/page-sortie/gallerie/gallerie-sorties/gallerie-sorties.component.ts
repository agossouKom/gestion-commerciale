import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/my-modele/client';
import { Sortie } from 'src/app/my-modele/sortie';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { SortieService } from 'src/app/my-service/sortie.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-gallerie-sorties',
  templateUrl: './gallerie-sorties.component.html',
  styleUrls: ['./gallerie-sorties.component.css'],
})
export class GallerieSortiesComponent {
  [x: string]: any;
  rowPerPage: number = 10;

  siteId: any;
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;

  id: number | undefined;
  sortie: Sortie | undefined;
  path: String = 'listeSortie';
  deatil: String = "Gallerie des sorties d'article";

  titre: String | undefined;
  showTitre: String | undefined;

  clients: Client[] | undefined;

  sorties: Sortie[] = [];

  sortiesFilter: Sortie[] = [];

  listMarchParRef: Sortie[] = [];

  //     {{ dataList.marchandise?.designation_march }}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public sortieService: SortieService,
    public userInfoService: UserInfoService,
    public sitevDeVenteService: SitevDeVenteService
  ) {}

  ngOnInit() {
    this.sortie = new Sortie();

    // if (this.id > 0) {

    // }
    // this.id = this.route.snapshot.params['id'];
    //let site = localStorage.getItem('user_site_id');
    let user_site_id = this.userInfoService.user_site_id;
    this.siteId = Number(user_site_id);
    console.log(this.siteId);

    //console.log( site);

    this.getLists(this.siteId);
  }

  siteIdx: number = 0;

  references?: String;

  getLists(id: any) {
    this.sortieService.groupedSortie(id).subscribe(
      (data: any) => {
        this.sorties = data;
        //  console.log('all sorties   ', this.sorties);
        for (let a of this.sorties) {
          this.references = a.reference;
          this.siteIdx = a.siteDeVente?.id;
          this.elementId = a.id;
          // console.log('references ', this.references);
          // console.log('siteIdx ', this.siteIdx);
          //   console.log('marchandise ', a.marchandise?.designation_march);
          // console.log('marchandise  id', a.marchandise?.id);
          //  this.listParReferenceSortie(this.references, this.siteIdx);
        }

        this.totalrow = data.length;
      },
      (error: any) => console.log(error)
    );
  }

  selectedItem?: any;
  getSelectedItemValue(event: any) {
    if (this.selectedItem != null) {
      // console.log('isVisible : ', this.isVisible);
    }
    console.log('selectedItem   for output: ', this.selectedItem);
  }

  listParReferenceSortie(ref: any, id: any) {
    this.sortieService.byReferenceAndSiteVente(ref, id).subscribe(
      (data: any) => {
        this.listMarchParRef = data;
        console.log('listMarchParRef   ', this.listMarchParRef);
        console.log('data.length   ', data.length);
      },
      (error: any) => console.log(error)
    );
  }

  list() {
    this.router.navigate([this.path]);
  }

  reportPage() {
    this.router.navigate(['report']);
  }
  sleep = async (milisecond: any) => {
    await new Promise((r) => {
      return setTimeout(r, milisecond);
    });
  };

  testSleep = async () => {
    console.log(' avant');
    this.reportPage();
    await this.sleep(2000);
    console.log('apres = ');
  };

  imprimer(id: number) {
    this.getSortieById(id);
  }

  sortiesParSite: Array<any> = [];
  getByPointOfSall(id: any) {
    this.sortieService.getSiteVenteId(id).subscribe(
      (data: any) => {
        this.sortiesParSite = data;

        console.log('sortiesParSite   ', this.sortiesParSite);
      },
      (error: any) => console.log(error)
    );
  }
  elementId?: any;

  getByidSortie: Sortie = new Sortie();

  reference: any;
  idSite: any;
//generateObj= 


  getSortieById(id: any) {
    this.sortieService.getById(id).subscribe(
      (data: any) => {
        this.getByidSortie = data;
        this.reference = this.getByidSortie.reference;
        this.idSite = this.getByidSortie.siteDeVente?.id;

        const postReference={
          reference: this.reference,
          idSite: this.idSite
        }
        console.log('postReference  ', postReference);
        this.sortieService.createTicket(postReference);
       // console.log('id sortie  ', id);
      //  console.log('reference  ', this.reference);
       // console.log('idSite   ', this.idSite);
      },
      (error: any) => console.log(error)
    );
  }

  // imprimer(event: any) {
  // console.log('event.target.value   ', event.target.tagNam.value);
  // (document.getElementById('ref']) as any).disabled = true;
  // this.router.navigate([this.path]);
  // this.elementId = event.target.id;
  // console.log('elementId: ', this.elementId);
  //  let elem = document.getElementById('id');

  // console.log('this.elementId: ', this.elementId);
  //  console.log('elem: ', elem);
  // console.log('event.target.value id: ', elem?.innerHTML);
  //  console.log('event.target.value id: ', elem?.innerText);
  // console.log('event.target.value id: ', elem);
  // }
}

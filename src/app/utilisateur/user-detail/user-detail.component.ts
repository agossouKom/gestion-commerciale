import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Client } from 'src/app/my-modele/client';
import { Photo } from 'src/app/my-modele/photo';
import { Role } from 'src/app/my-modele/role';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { Utilisateur } from 'src/app/my-modele/utlilisateur';
//import { UserInfoService } from 'src/app/my-service/user-info.service';
import { UtilisateurService } from 'src/app/my-service/utilisateur.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
  id?: any;
currentUserId:any;
  Utilisateur: Utilisateur = new Utilisateur();
  path: String = 'listUtilisateur';
  deatil: String = "Détail de l'utilisateur";

  titre: String | undefined;
  showTitre: String | undefined;

  clients: Client[] | undefined;

  retrieImage: any;
  base64Data: any;

  file!: File;
  photoDetail!: Photo;
  fileUris: Array<String> = [];
  //roles: Role[] = [];
  // siteDeVentes: SiteDeVente[] = [];
  photos: Photo[] = [];
  siteDeVentes: SiteDeVente[] | undefined;
  role: Role[] | undefined;
  photo: Photo[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public utilisateurService: UtilisateurService,
   // public userInfoService: UserInfoService
  ) {}
  idPhoto: any;
  ngOnInit() {
    this.Utilisateur = new Utilisateur();
    this.id = this.route.snapshot.params['id'];
    this.currentUserId= localStorage.getItem('user_id');
    this.utilisateurService.getById(this.id).subscribe(
      (data: any) => {
        this.Utilisateur = data;
        //  console.log('Utilisateur 2 ' , this.Utilisateur);
        this.siteDeVentes = this.Utilisateur?.site;
        // this.photo = this.Utilisateur.photo;
        this.role = this.Utilisateur?.roles;
        console.log('id   ',  localStorage.getItem('user_id'));
        // this.titre = this.Utilisateur?.;
        //  this.showTitre =this.deatil +" " +this.titre;
        //   console.log('banqueListes ' +  this.banqueListes);
        //  for (let a of this.photos) {
        //    this.idPhoto = a.id;
        //  }
      },
      (error: any) => console.log(error)
    );
    //this.getById(this.id ) ;
    console.log('userInfoService ', this.loadUtilisateurCourent());
  }


  loadUtilisateurCourent() {
    this.utilisateurService.getCurrentUserInfo().pipe(first()).subscribe((userData:any) => {
      this.Utilisateur = userData;
      console.log(this.Utilisateur);
    });
  }

  btnCancel() {
    this.router.navigate(['listUtilisateur']);
  }

  getById(id: number) {
    this.utilisateurService.getPhotById(id).subscribe((x) => {
      //  this.photoDetail = x;
      //console.log( this.photoDetail?.photoName);
      // console.log('photoDetail ' +   this.photoDetail?.id);
    });
  }

  details(id: number) {
    this.router.navigate(['detailSociete', id]);
  }

  list() {
    this.router.navigate([this.path]);
  }
}

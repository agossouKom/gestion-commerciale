import { Component } from '@angular/core';
import { first } from 'rxjs';
import { Photo } from 'src/app/my-modele/photo';
import { Role } from 'src/app/my-modele/role';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { Utilisateur } from 'src/app/my-modele/utlilisateur';
import { UtilisateurService } from 'src/app/my-service/utilisateur.service';

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.css']
})
export class ListUtilisateurComponent {
  utilisateur!: Utilisateur[];
  totalrow: number = 0;
  roles: Role[] = [];
  siteDeVentes: SiteDeVente[] = [];
  isCheckedShowAllRecord = false;
  photo: Photo[] = [];
  p: number = 1;
  afficherTout: String = 'Afficher les données supprimées';
  message: String = 'Aucune donnée disponible pour le moment...';
  titre: String = 'Liste des utilisateurs';
  checkLoading = false;


  searchText: any;
  router: any;
  constructor(private utilisateurService: UtilisateurService,) { }

  ngOnInit(): void {
    this.loadUtilisateur();

  }

  loadAll() {
    this.utilisateurService.getAllUserDeletedOrNot().pipe(first())
      .subscribe(userData => {
        this.utilisateur = userData;
        this.totalrow = userData.length;
      });
    console.log(this.utilisateur);
  }
  loadUtilisateur() {
    this.utilisateurService.getAll().pipe(first())
      .subscribe(userData => {
        this.utilisateur = userData;
        this.totalrow = userData.length;
        if (this.totalrow > 0) {
          this.checkLoading = false;
        } else {
          this.checkLoading = true;
        }
      });
    // console.log(this.utilisateur);
  }

  afficherTouteLesDonnees(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      this.loadAll();
    } else {
      this.isCheckedShowAllRecord = false;
      this.loadUtilisateur();
    }
  }





  delete(user: Utilisateur) {
    this.utilisateurService.delete(user.id).pipe(first())
      .subscribe(() => {
        this.loadUtilisateur();
      })
  }


  //delete(data: Article) {
  // if (window.confirm('Supprimer cet enregistrement ?')) {
  //  this.service
  //   .delete(data.id)
  //    .pipe(first())
  //     .subscribe(
  //     () => {

  //      this.loadActif();
  //      },
  //     (error) => console.log(error)
  //  );
  //  }
  // }




  restore(data: Utilisateur) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.utilisateurService
        .redo(data.id)
        .pipe(first())
        .subscribe(
          () => {
            // this.loadEntity();
            this.loadUtilisateur();
          },
          (error) => console.log(error)
        );
    }
  }
  ////details(id: number) {
  //this.router.navigate(['detailArticle', id]);
  //}


  details(id: any) {
    this.router.navigate(['detailUtilisateur', id]);
  }

  test: any;
  siteV: any;
  update(id: number) {
    this.router.navigate(['/utilisateur/edit/', id]);
  }






}

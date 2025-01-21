import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Banque } from 'src/app/my-modele/banque';
import { Devise } from 'src/app/my-modele/devise';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { Societe } from 'src/app/my-modele/societe';
import { TvaGlobale } from 'src/app/my-modele/tva-globale';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { SocieteService } from 'src/app/my-service/societe.service';

@Component({
  selector: 'app-detail-fournisseur',
  templateUrl: './detail-fournisseur.component.html',
  styleUrls: ['./detail-fournisseur.component.css']
})
export class DetailFournisseurComponent {
  id: number | undefined;
  fournisseur: Fournisseur | undefined;
  path: String = 'listFournisseur';

  banqueListes: Banque[] | undefined ;
  //fournisseur: Fournisseur[]| undefined ;

  tvaGlobale: TvaGlobale[] | undefined ;

  devise: Devise[] | undefined ;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public service: FournisseurService
  ) {}

  ngOnInit() {
    this.fournisseur = new Fournisseur();
    this.id = this.route.snapshot.params['id'];
    this.service.getById(this.id).subscribe(
      (data: any) => {
        console.log(data);
        this.fournisseur = data;
        this.banqueListes=this.fournisseur?.banque;
        this.devise=this.fournisseur?.devise;
       console.log('banqueListes ' +  this.banqueListes);
       console.log('devise ' +  this.devise);
       console.log('fournisseur ' + this.fournisseur);
      },
      (error: any) => console.log(error)
    );
  }

  list() {
    this.router.navigate([this.path]);
  }
}

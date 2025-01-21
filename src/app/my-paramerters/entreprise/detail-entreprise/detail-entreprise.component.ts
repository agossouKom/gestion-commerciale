import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Banque } from 'src/app/my-modele/banque';
import { Devise } from 'src/app/my-modele/devise';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { ModeExpedition } from 'src/app/my-modele/mode-expedition';
import { ModeReglement } from 'src/app/my-modele/mode-reglement';
import { ModeTransport } from 'src/app/my-modele/mode-transport';
import { Societe } from 'src/app/my-modele/societe';
import { TvaGlobale } from 'src/app/my-modele/tva-globale';
import { SocieteService } from 'src/app/my-service/societe.service';

@Component({
  selector: 'app-detail-entreprise',
  templateUrl: './detail-entreprise.component.html',
  styleUrls: ['./detail-entreprise.component.css'],
})
export class DetailEntrepriseComponent {
  id: number | undefined;
  societe: Societe | undefined;
  path: String = 'listSociete';



  //banqueList: Banque[] ;
  fournisseur: Fournisseur[]| undefined ;
  modereglement: ModeReglement[] | undefined ;
  modeTransport: ModeTransport[] | undefined ;
  tvaGlobale: TvaGlobale[] | undefined ;
  modeExpedition: ModeExpedition[] | undefined ;
  devise: Devise[] | undefined ;
  banqueListes: Banque[] | undefined ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private societeService: SocieteService
  ) {}

  ngOnInit() {
    this.societe = new Societe();
    this.id = this.route.snapshot.params['id'];
    this.societeService.getById(this.id).subscribe(
      (data: any) => {
        console.log(data);
        this.societe = data;
        this.banqueListes=this.societe?.banque;
        this.fournisseur=this.societe?.fournisseur;
        this.modereglement=this.societe?.modereglement;
        this.modeTransport=this.societe?.modeTransport;
        this.tvaGlobale=this.societe?.tvaGlobale;
        this.modeExpedition=this.societe?.modeExpedition;
        this.devise=this.societe?.devise;
     //   console.log('banqueListes ' +  this.banqueListes);
     //   console.log('societe ' + data);
      },
      (error: any) => console.log(error)
    );


    
  }




  list() {
    this.router.navigate([this.path]);
  }
}

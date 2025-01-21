import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Banque } from 'src/app/my-modele/banque';
import { Fondateur } from 'src/app/my-modele/fondateur';
import { AnneeService } from 'src/app/my-service/annee.service';
import { FondateurService } from 'src/app/my-service/fondateur.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-liste-fondateur',
  templateUrl: './liste-fondateur.component.html',
  styleUrls: ['./liste-fondateur.component.css'],
})
export class ListeFondateurComponent {
  entitiForm: FormGroup;
  fondateurListe: Fondateur[] = [];
  //fondateurListe!: Fondateur[];
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  afficherTout: String = 'Afficher les données supprimées';
  titre: String = 'FONDATEUR(S)';

  control: FormControl = new FormControl('');
  constructor(
    public service: FondateurService,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public anneeService: AnneeService,
     private userInfoService:UserInfoService,
  ) {
    this.entitiForm = fb.group({});
    this.fondateurListe = [];
  }
  message:String="";
  checkLoading = false;

  ngOnInit() {
    this.loadActif();
    let projectNames = this.fondateurListe.map((item: any) => {
      return item.devise.libelleDevise;
    });

    this.userInfoService.sleep(this.userInfoService.ms).then(() => {
      this.checkLoading = true;
      this.message= this.userInfoService.message;
      if(this.totalrow>0){
        this.checkLoading= false;
       }
        // console.log('data   = ', data);
    });

    // console.log('test:',projectNames);
  }
  afficherTouteLesDonnees(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      this.loadEntity();
    } else {
      this.isCheckedShowAllRecord = false;
      this.loadActif();
    }
  }
  loadEntity() {
    this.service
      .getAll()
      .pipe(first())
      .subscribe((userData) => {
        this.fondateurListe = userData;
        //    console.log(this.Banques);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.fondateurListe = userData;
        this.totalrow = userData.length;
      });
  }
  delete(data: Fondateur) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.service
        .delete(data.id)
        .pipe(first())
        .subscribe(
          () => {
            this.loadActif();
          },
          (error) => console.log(error)
        );
    }
  }

  restore(data: Fondateur) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.service
        .redo(data.id)
        .pipe(first())
        .subscribe(
          () => {
            this.loadActif();
          },
          (error) => console.log(error)
        );
    }
  }

  update(id: number) {
    this.router.navigate(['/fondateur/edit/', id]);
  }
}

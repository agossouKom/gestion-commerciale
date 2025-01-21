import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { ModeTransport } from 'src/app/my-modele/mode-transport';
import { ModeTransportService } from 'src/app/my-service/mode-transport.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-liste-mode-transport',
  templateUrl: './liste-mode-transport.component.html',
  styleUrls: ['./liste-mode-transport.component.css']
})
export class ListeModeTransportComponent {
  entitiForm: FormGroup;

  modeTransport: ModeTransport[] = [];
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  afficherTout:String="Afficher les données supprimées";
  titre:String="Mode de transport";
  message:String="";
  checkLoading = false;

  control: FormControl = new FormControl('');
  constructor(
   // public departementService: DepartementService,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public service: ModeTransportService,private userInfoService:UserInfoService,
  ) {
    this.entitiForm = fb.group({});
    //this.departementListe = [];
  }



  ngOnInit() {
    this.loadActif();


    this.userInfoService.sleep(this.userInfoService.ms).then(() => {
      this.checkLoading = true;
      this.message= this.userInfoService.message;
      if(this.totalrow>0){
        this.checkLoading= false;
       }
        // console.log('data   = ', data);
    });

   // let projectNames = this.ville.map(((item:any)  => {
    //   return item.Ville.libelleVille;
   // }));
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
        this.modeTransport = userData;
    //    console.log(this.paysTest);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.modeTransport = userData;
      //  console.log(this.paysTest);
      //  console.log(userData);
        this.totalrow = userData.length;
      });
  }
  delete(data: ModeTransport) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.service
      .delete(data.id)
      .pipe(first())
      .subscribe(() => {
        this.loadActif();
      },
      (error) => console.log(error));
    }

  }

  restore(data: ModeTransport) {
    if (window.confirm('Restaurer cet enregistrement ?')) {
      this.service
      .redo(data.id)
      .pipe(first())
      .subscribe(() => {
        // this.loadEntity();
        this.loadActif();
      },
      (error) => console.log(error));
    }
  }




//  routerLink="/pays/edit/{{ dataList.idPays }}"
  update(id: number) {
    this.router.navigate(['/modeTransport/edit/', id]);
  }
}

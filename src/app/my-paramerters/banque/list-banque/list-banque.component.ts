import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Banque } from 'src/app/my-modele/banque';
import { AnneeService } from 'src/app/my-service/annee.service';
import { BanqueService } from 'src/app/my-service/banque.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-list-banque',
  templateUrl: './list-banque.component.html',
  styleUrls: ['./list-banque.component.css']
})
export class ListBanqueComponent {
  entitiForm: FormGroup;


  Banque: Banque = new Banque();

 banqueListe!: Banque[];
  totalrow: number = 0;
  isCheckedShowAllRecord = false;
  p: number = 1;
  searchText: any;
  afficherTout:String="Afficher les données supprimées";
  titre:String="BANQUE";
  message:String="";
  checkLoading = false;
  control: FormControl = new FormControl('');
  constructor(
    public service: BanqueService,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public anneeService: AnneeService,
    private userInfoService:UserInfoService,
  ) {
    this.entitiForm = fb.group({});
    this.banqueListe = [];
  }

 banques: Banque[] = [];

  ngOnInit() {
    this.loadActif();
    let projectNames = this.banques.map(((item:any)  => {
       return item.devise.libelleDevise;
    }));
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
        this.banques = userData;
    //    console.log(this.Banques);
        this.totalrow = userData.length;
      });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.banques = userData;
      //  console.log(this.Banques);
      //  console.log(userData);
        this.totalrow = userData.length;
      });
  }
  delete(data: Banque) {
    if (window.confirm('Supprimer cet enregistrement ?')) {
      this.service
      .delete(data.id)
      .pipe(first())
      .subscribe(() => {
        // this.loadEntity();
        this.loadActif();
      },
      (error) => console.log(error));
    }

  }

  restore(data: Banque) {
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
    this.router.navigate(['/banque/edit/', id]);
  }


}

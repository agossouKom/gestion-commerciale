import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IdTmp } from 'src/app/my-modele/id-tmp';
import { IdtmpServiceService } from '../idtmp-service.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-manage-id-tmp',
  templateUrl: './manage-id-tmp.component.html',
  styleUrls: ['./manage-id-tmp.component.css'],
})
export class ManageIdTmpComponent {
  formadd!: FormGroup;
  paht: number = 0;
  qteAchetee: number = 0;
  packDeN: number = 0;

  id!: number;
  loading = false;

  idTmp: IdTmp | undefined;
  //libelleSousCategorie!: SousCategorie;

  recordCount: number = 0;

  userId!: number;

  // marchandise: Array<Marchandise> = [];

  constructor(
    private formBuilder: FormBuilder,
    public idtmpServiceService: IdtmpServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
 
  }

  ngOnInit(): void {
     this.initFormData();
   
    setTimeout(() => {
      console.log('setTimeout');
    }, 1000);
  }

  loadByySiteDeVente(id: number) {
    this.idtmpServiceService
      .getById(id)
      .pipe(first())
      .subscribe((data: any) => {
        this.idTmp = data;
        console.log('data   = ', this.idTmp);
      });
  }

  loadByKey(k: any) {
    this.idtmpServiceService
      .getByKey(k)
      .pipe(first())
      .subscribe((data: any) => {
        this.idTmp = data;
        console.log('data   = ', this.idTmp);
      });
  }

  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      clef: [''],
      valeur: [''],
    });
  }

  save() {
       // this.formadd.value.clef = this.siteDeVenteObj;
      //  this.formadd.value.valeur = this.fournisseurObj;
    this.idtmpServiceService.create(this.formadd.value);
    console.log('post data ', this.formadd.value);
  }

  upDate() {
    this.idtmpServiceService
      .update(this.formadd.value.id, this.formadd.value)
      .subscribe((data) => {
        console.log("pays list "+data);
      });
  }
}

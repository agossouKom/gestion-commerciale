import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { AnneeExercice } from 'src/app/my-modele/AnneeExercice';
import { TvaGlobale } from 'src/app/my-modele/tva-globale';
import { AnneeService } from 'src/app/my-service/annee.service';
import { TvaGlobaleService } from 'src/app/my-service/tva-globale.service';

@Component({
  selector: 'app-tva-globale',
  templateUrl: './tva-globale.component.html',
  styleUrls: ['./tva-globale.component.css']
})
export class TvaGlobaleComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';
  totalrow: number = 0;
  tvaGlobales!: TvaGlobale[];
   forUpdate: TvaGlobale | undefined;
  tvaGlobaleList!: any[];
  anneeList: AnneeExercice = new AnneeExercice;
  annee_id: AnneeExercice | undefined ;

  populateCombobox: any;
  testId: any;
  constructor(
    private formBuilder: FormBuilder,

    private service: TvaGlobaleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log('id',this.id);
    if (this.id > 0) {
      this.loadData();
      this.btnText = 'Modifier';
      this.title = 'Editer ';

    }
    this.loadActifAnne();
    this.initFormData();

  }
  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      tauxTva: ['', Validators.required],
      anneeExercice: [this.anneeList, Validators.required],
      supprime: ['false'],
    });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.tvaGlobales = userData;
        this.totalrow = userData.length;
      });
  }

  fillTextField(id: number) {
    this.service
      .getById(id)
      .pipe(first())
      .subscribe((userData) => {
        this.forUpdate = userData;
        this.formadd.patchValue({
          tauxTva: this.forUpdate.tauxTva,
          anneeExercice: {
            libelleAnSco: this.forUpdate.anneeExercice?.libelleAnSco,
          },
        });
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
  }
  loadData() {
    this.service
      .getById(this.id)
      .subscribe((x) => this.formadd.patchValue(x));
  }
  //loadData() {
   // this.service.getById(this.id).subscribe((x) => {

      // console.log(this.idPays);
     // this.populateCombobox=this.forUpdate.anneeExercice?.libelleAnSco
     // this.testId=this.forUpdate.id,
   ///  console.log(this.populateCombobox);
  //  });
    //.subscribe((x) => this.formadd.patchValue(x));
 // }

  loadActifAnne() {
    this.service
      .loadAnneCourrente()
      .pipe(first())
      .subscribe((userData) => {
        this.anneeList = userData;
        this.annee_id=this.anneeList.idAnSco;
        console.log(this.anneeList);
        console.log( this.annee_id);
      });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formadd.invalid) {
      return;
    }

    this.loading = true;

    if (this.id > 0) {
       this.service
        .update(this.formadd.value.id, this.formadd.value)
        .subscribe((data) => {
          //  console.log("pays list "+data);
          this.btnCancel();
          this.loadActif();
          this.router.navigate(['listTvaGlobale']);
        });
    } else {
      this.service.create(this.formadd.value);
      this.btnCancel();
      this.router.navigate(['listTvaGlobale']);
    }
  }
  btnCancel() {
    this.router.navigate(['listTvaGlobale']);
  }
}

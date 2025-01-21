import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Arrondissement } from 'src/app/my-modele/arrondissement';
import { Departement } from 'src/app/my-modele/departement';
import { Ville } from 'src/app/my-modele/ville';
import { ArrondissementService } from 'src/app/my-service/arrondissement.service';

@Component({
  selector: 'app-create-arrondissement',
  templateUrl: './create-arrondissement.component.html',
  styleUrls: ['./create-arrondissement.component.css']
})
export class CreateArrondissementComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';
  totalrow: number = 0;
  arrondissements!: Arrondissement[];
  forUpdate: Arrondissement | undefined;
  //paysList!: any[];
  villeListe: Array<Ville> = [];
  populateCombobox: any;
  testId: any;
  titre:String="Arrondissement";
  path: String = 'listArrondissement';

  constructor(
    private formBuilder: FormBuilder,
    private arrondissementtService: ArrondissementService,
    private router: Router,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id > 0) {
      this.loadData();
      this.btnText = 'Modifier';
      this.title = 'Editer ';

    }

    this.initFormData();
    this.loadActifVille();
  }


  initFormData() {
    this.formadd = this.formBuilder.group({
      idArr: 0,
      nomArr: ['', Validators.required],
      ville: ['', Validators.required],
      supprime: ['false'],
    });
  }

  loadActif() {
    this.arrondissementtService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.arrondissements = userData;
        this.totalrow = userData.length;
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
  }


  loadData() {
    // this.populateCombobox=this.formadd.value.departement?.nomDepartement;
    this.arrondissementtService
      .getById(this.id)
      .subscribe((x) => this.formadd.patchValue(x));

  }

  loadActifVille() {
    this.arrondissementtService
      .loadVille()
      .pipe(first())
      .subscribe((userData) => {
        this.villeListe = userData;
        // console.log("Pays liste",this.deviseList);
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
      this.arrondissementtService
        .update(this.formadd.value.idArr, this.formadd.value)
        .subscribe((data) => {
          this.btnCancel();
          this.loadActif();
          this.router.navigate([this.path]);
        });
    } else {
      this.arrondissementtService.create(this.formadd.value);
      this.btnCancel();
      this.router.navigate([this.path]);
      this.loadActif();
    }
  }
  btnCancel() {
    this.router.navigate([this.path]);
  }
  compareData(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

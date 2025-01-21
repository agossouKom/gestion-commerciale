import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Arrondissement } from 'src/app/my-modele/arrondissement';
import { Quartier } from 'src/app/my-modele/quartier';
import { QuartierService } from 'src/app/my-service/quartier.service';

@Component({
  selector: 'app-create-quartier',
  templateUrl: './create-quartier.component.html',
  styleUrls: ['./create-quartier.component.css']
})
export class CreateQuartierComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';
  totalrow: number = 0;
  quartiers!: Quartier[];
 // forUpdate: Arrondissement | undefined;
  //paysList!: any[];
  arrondissementListe: Array<Arrondissement> = [];
  populateCombobox: any;
  testId: any;
  titre:String="Quartiers";
  path: String = 'listQuartier';

  constructor(
    private formBuilder: FormBuilder,
    public service: QuartierService,
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
    this.loadActifArr();
  }


  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      nomQtr: ['', Validators.required],
      arrondissement: ['', Validators.required],
      supprime: ['false'],
    });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.quartiers = userData;
        this.totalrow = userData.length;
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
  }
  test() {
    this.formadd.patchValue({
      ville: {
        nomVille: '',
      },
    });
  }

  loadData() {
    // this.populateCombobox=this.formadd.value.departement?.nomDepartement;
    this.service
      .getById(this.id)
      .subscribe((x) => this.formadd.patchValue(x));

  }

  loadActifArr() {
    this.service
      .loadQuartier()
      .pipe(first())
      .subscribe((userData) => {
        this.arrondissementListe = userData;
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
      this.service
        .update(this.formadd.value.id, this.formadd.value)
        .subscribe((data) => {
          this.btnCancel();
          this.loadActif();
          this.router.navigate([this.path]);
        });
    } else {
      this.service.create(this.formadd.value);
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

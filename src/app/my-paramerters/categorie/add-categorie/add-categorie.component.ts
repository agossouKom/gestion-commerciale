import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Categosie } from 'src/app/my-modele/categosie';
import { Quartier } from 'src/app/my-modele/quartier';
import { RayonCategorie } from 'src/app/my-modele/rayon-categorie';
import { CategorieService } from 'src/app/my-service/categorie.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';
  totalrow: number = 0;
  categosie!: Categosie[];
 // forUpdate: Arrondissement | undefined;
  //paysList!: any[];
  rayonCategorie: Array<RayonCategorie> = [];
  populateCombobox: any;
  testId: any;
  titre:String="Categorie";
  path: String = 'listCategorie';

  constructor(
    private formBuilder: FormBuilder,
    public service: CategorieService,
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
    this.loadCategorieRayon();
    this.initFormData();

  }

  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      lib_cat: ['', Validators.required],
      rayonCategorie: ['', Validators.required],
      supprime: ['false'],
    });
  }
  loadCategorieRayon() {
    this.service
      .getActifRayon()
      .pipe(first())
      .subscribe((userData) => {
        this.rayonCategorie = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }
  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.categosie = userData;
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

import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { UniteMesure } from 'src/app/my-modele/unite-mesure';
import { UniteMesureService } from 'src/app/my-service/unite-mesure.service';

@Component({
  selector: 'app-unite-mesure',
  templateUrl: './unite-mesure.component.html',
  styleUrls: ['./unite-mesure.component.css']
})
export class UniteMesureComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter unité de mesure ';
  totalrow: number = 0;
  typeCodeBar!: UniteMesure[];


  populateCombobox: any;
  testId: any;
  titre:String="Type de code bar";
  path: String = 'listeUniteMesure';

  constructor(
    private formBuilder: FormBuilder,
    public service: UniteMesureService,
    private router: Router,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id > 0) {
      this.loadData();
      this.btnText = 'Modifier';
      this.title = 'Editer unité de mesure ';

    }

    this.initFormData();

  }

  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      unite: ['', Validators.required],
      abreviation: ['', Validators.required],
      constituant: ['']

    });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.typeCodeBar = userData;
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
}

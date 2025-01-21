import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { ModeReglement } from 'src/app/my-modele/mode-reglement';
import { ModeReglementService } from 'src/app/my-service/mode-reglement.service';

@Component({
  selector: 'app-add-mode-reglement',
  templateUrl: './add-mode-reglement.component.html',
  styleUrls: ['./add-mode-reglement.component.css']
})
export class AddModeReglementComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';
  totalrow: number = 0;
  modeReglement!: ModeReglement[];
 // forUpdate: Arrondissement | undefined;
  //paysList!: any[];

  populateCombobox: any;
  testId: any;
  titre:String="Mode de reglement";
  path: String = 'listModeReglement';

  constructor(
    private formBuilder: FormBuilder,
    public service: ModeReglementService,
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

  }

  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      lib_mode_rglt: ['', Validators.required],

    });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.modeReglement = userData;
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

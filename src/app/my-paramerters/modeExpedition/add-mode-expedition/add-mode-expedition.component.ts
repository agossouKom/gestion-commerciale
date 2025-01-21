import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { ModeExpedition } from 'src/app/my-modele/mode-expedition';
import { ModeExpeditionService } from 'src/app/my-service/mode-expedition.service';

@Component({
  selector: 'app-add-mode-expedition',
  templateUrl: './add-mode-expedition.component.html',
  styleUrls: ['./add-mode-expedition.component.css']
})
export class AddModeExpeditionComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';
  totalrow: number = 0;
 modeExpedition!: ModeExpedition[];
 // forUpdate: Arrondissement | undefined;
  //paysList!: any[];

  populateCombobox: any;
  testId: any;
  titre:String="Mode d'expedition";
  path: String = 'listModeExpedition';

  constructor(
    private formBuilder: FormBuilder,
    public service: ModeExpeditionService,
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
      lib_exped: ['', Validators.required],

    });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.modeExpedition = userData;
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

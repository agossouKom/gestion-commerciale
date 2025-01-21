import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Fondateur } from 'src/app/my-modele/fondateur';
import { FondateurService } from 'src/app/my-service/fondateur.service';

@Component({
  selector: 'app-add-fondateur',
  templateUrl: './add-fondateur.component.html',
  styleUrls: ['./add-fondateur.component.css']
})
export class AddFondateurComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';
  totalrow: number = 0;
  fondateur!: Fondateur[];


  populateCombobox: any;
  testId: any;
  constructor(
    private formBuilder: FormBuilder,
    private service: FondateurService,
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

    this.initFormData();

  }
  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      nom_fdtr: ['', Validators.required],
      prenom_fdtr: ['', Validators.required],
      tel1_fdtr: ['', Validators.required],
      tel2_fdtr: ['', Validators.required],
      email_fdtr: ['', Validators.required],
      fonction_fdtr: ['', Validators.required],
      part_fdtr: ['', Validators.required],
      supprime: ['false'],
    });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.fondateur = userData;
        this.totalrow = userData.length;
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
          this.router.navigate(['listFondateur']);
        });
    } else {
      this.service.create(this.formadd.value);
      this.btnCancel();
      this.router.navigate(['listFondateur']);
    }
  }
  btnCancel() {
    this.router.navigate(['listFondateur']);
  }
  compareData(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

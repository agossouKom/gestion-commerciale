import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AnneeExercice } from 'src/app/my-modele/AnneeExercice';
import { AnneeService } from 'src/app/my-service/annee.service';

@Component({
  selector: 'app-add-annee',
  templateUrl: './add-annee.component.html',
  styleUrls: ['./add-annee.component.css'],
})
export class AddAnneeComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter annees et exercice';
  annee: AnneeExercice[] = [];
  totalrow: number = 0;
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    public anneeService: AnneeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id > 0) {
      this.loadData();
      this.btnText = 'Modifier';
      this.title = 'Editer année';
    }
    this.formadd = this.formBuilder.group({
      idAnSco: 0,
      libelleAnSco: ['', Validators.required],
      dateDebutAnSco: ['', Validators.required],
      dateFinAnSco: ['', Validators.required],
      current: [''],
      Supprime: ['false'],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
  }

  loadData() {
    this.anneeService
      .getById(this.id)
      .subscribe((x) => this.formadd.patchValue(x));
  }
  loadActif() {
    this.anneeService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.isLoading = true;
        this.annee = userData;
        console.log(this.annee);
        this.totalrow = userData.length;
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
      //  this.deviseService.update(this.formadd.value).subscribe((data) => {
      //  this.btnCancel();
      /// });

      this.anneeService
        .update(this.formadd.value.idAnSco, this.formadd.value)
        .subscribe((data) => {
          this.btnCancel();
          this.loadData();
          this.router.navigate(['listAnnees']);

        });
    } else {
      this.anneeService.create(this.formadd.value);
      this.btnCancel();
      this.router.navigate(['listAnnees']);
      this.loadActif();

    }
  }
  isCheckedShowAllRecord = false;

  setTocurrentData(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      const current = true;
      console.log(current);
      console.log(this.isCheckedShowAllRecord);
    } else {
      this.isCheckedShowAllRecord = false;
      const current = false;
      console.log(current);
      console.log(this.isCheckedShowAllRecord);
    }
  }

  btnCancel() {
    this.router.navigate(['listAnnees']);
  }

  compareData(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

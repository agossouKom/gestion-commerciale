import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Banque } from 'src/app/my-modele/banque';
import { BanqueService } from 'src/app/my-service/banque.service';
import { TvaGlobaleService } from 'src/app/my-service/tva-globale.service';

@Component({
  selector: 'app-add-banque',
  templateUrl: './add-banque.component.html',
  styleUrls: ['./add-banque.component.css']
})
export class AddBanqueComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';
  totalrow: number = 0;
  banque!: Banque[];


  populateCombobox: any;
  testId: any;
  constructor(
    private formBuilder: FormBuilder,
    private service: BanqueService,
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
      libelle_bk: ['', Validators.required],
      abrege: ['', Validators.required],
      code: ['', Validators.required],
      supprime: ['false'],
    });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.banque = userData;
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
          this.router.navigate(['listBanque']);
        });
    } else {
      this.service.create(this.formadd.value);
      this.btnCancel();
      this.router.navigate(['listBanque']);
    }
  }
  btnCancel() {
    this.router.navigate(['listBanque']);
  }
  compareData(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

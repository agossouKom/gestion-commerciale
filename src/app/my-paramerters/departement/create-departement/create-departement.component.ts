import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Departement } from 'src/app/my-modele/departement';
import { Pays } from 'src/app/my-modele/pays';
import { DepartementService } from 'src/app/my-service/departement.service';
import { PaysService } from 'src/app/my-service/pays.service';

@Component({
  selector: 'app-create-departement',
  templateUrl: './create-departement.component.html',
  styleUrls: ['./create-departement.component.css']
})
export class CreateDepartementComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';
  totalrow: number = 0;
  pays!: Departement[];
  forUpdate: Departement | undefined;
  //paysList!: any[];
  paysList: Array<Pays> = [];
  populateCombobox: any;
  testId: any;

path:String="listDepartement";

  constructor(
    private formBuilder: FormBuilder,
    private departementService: DepartementService,
    public paysService: PaysService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id > 0) {
      this.loadData();
      this.btnText = 'Modifier';
      this.title = 'Editer ';
        // this.fillTextField(this.id);
    }

    this.initFormData();
    this.loadActifPays();
  }
  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      nomDepartement: ['', Validators.required],
      pays: ['', Validators.required],
      supprime: ['false'],
    });
  }

  loadActif() {
    this.departementService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.pays = userData;
        this.totalrow = userData.length;
      });
  }



  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
  }
  test() {
    this.formadd.patchValue({
      nomPays: 'ben',
      devise: {
        deviseAbrege: 'cfaa',
      },
    });
  }
  loadData() {
    this.departementService.getById(this.id).subscribe((x) => this.formadd.patchValue(x));
  }

  loadActifPays() {
    this.departementService
      .loadPays()
      .pipe(first())
      .subscribe((userData) => {
        this.paysList = userData;
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
      this.departementService
        .update(this.formadd.value.id, this.formadd.value)
        .subscribe((data) => {
           this.btnCancel();
          this.loadActif();
          this.router.navigate([this.path]);
        });
    } else {
      this.departementService.create(this.formadd.value);
      this.btnCancel();
      this.router.navigate([this.path]);
      this.loadActifPays();
    }
  }
  btnCancel() {
    this.router.navigate([this.path]);
  }
  compareData(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

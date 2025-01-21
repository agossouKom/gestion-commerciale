import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaysService } from 'src/app/my-service/pays.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Pays } from 'src/app/my-modele/pays';
import { first } from 'rxjs';
import { Devise } from 'src/app/my-modele/devise';
import { DeviseService } from 'src/app/my-service/devise.service';

@Component({
  selector: 'app-create-pays',
  templateUrl: './create-pays.component.html',
  styleUrls: ['./create-pays.component.css'],
})
export class CreatePaysComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';
  totalrow: number = 0;
  pays!: Pays[];
  payForUpdate: Pays | undefined;
  paysList!: any[];
  deviseList: Array<Devise> = [];
  populateCombobox: any;
  testId: any;
  constructor(
    private formBuilder: FormBuilder,
    private deviseService: DeviseService,
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
      //  this.fillTextField(this.id);
    }

    this.initFormData();
    this.loadActifDevise();
  }
  initFormData() {
    this.formadd = this.formBuilder.group({
      idPays: 0,
      nomPays: ['', Validators.required],
      devise: ['', Validators.required],
      supprime: ['false'],
    });
  }

  loadActif() {
    this.paysService
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

  loadData() {
    this.paysService
    .getById(this.id)
    .subscribe((x) => this.formadd.patchValue(x));
  }

  loadActifDevise() {
    this.paysService
      .loadDevise()
      .pipe(first())
      .subscribe((userData) => {
        this.deviseList = userData;
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
      //  this.deviseService.update(this.formadd.value).subscribe((data) => {
      //  this.btnCancel();
      /// });
      // console.log("id is "+this.id);
      //  console.log(" sid is "+this.formadd.value.idPays);
      this.paysService
        .update(this.formadd.value.idPays, this.formadd.value)
        .subscribe((data) => {
          //  console.log("pays list "+data);
          this.btnCancel();
          this.loadActif();
          this.router.navigate(['listPays']);
        });
    } else {
      this.paysService.create(this.formadd.value);
      this.btnCancel();
      this.router.navigate(['listPays']);
    }
  }
  btnCancel() {
    this.router.navigate(['listPays']);
  }

  compareData(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  // infoForm() {
  // this.formadd = this.formBuilder.group({
  //  idPays: 0,
  //  nomPays: ['', [Validators.required]],
  // imageDrapeau: ['', [Validators.required]],
  // devise: ['', [Validators.required]],
  // longitude: ['', [Validators.required]],
  // latitude: ['', [Validators.required]],
  // altitude: ['', [Validators.required]],
  // supprime: ['false'],
  // });
  //}
}

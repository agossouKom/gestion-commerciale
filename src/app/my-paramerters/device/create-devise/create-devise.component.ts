import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviseService } from 'src/app/my-service/devise.service';
import { first } from 'rxjs';
import { Devise } from 'src/app/my-modele/devise';
    @Component({
  selector: 'app-create-devise',
  templateUrl: './create-devise.component.html',
  styleUrls: ['./create-devise.component.css']
})
export class CreateDeviseComponent implements OnInit {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter Devise';
  totalrow: number = 0;
  devise!: Devise[];
  constructor(
    private formBuilder: FormBuilder,
    private deviseService: DeviseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id > 0) {
      this.loadData();
      this.btnText = 'Modifier';
      this.title = 'Editer la devise';
    }

    this.formadd = this.formBuilder.group({
      id: 0,
      libelleDevise: ['', Validators.required],
      deviseAbrege: ['', Validators.required],
      supprime:['false'],
    });
  }
  loadActif() {
    this.deviseService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.devise = userData;
        console.log(this.devise);
        this.totalrow = userData.length;
      });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
  }

  loadData() {
    this.deviseService
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
    //  this.deviseService.update(this.formadd.value).subscribe((data) => {
      //  this.btnCancel();
     /// });
     console.log("id is "+this.id);
     console.log(" sid is "+this.formadd.value.id);
        this.deviseService
          .update(this.formadd.value.id, this.formadd.value)
          .subscribe((data) => {
            this.btnCancel();
            this.loadActif();
            this.router.navigate(['listeDevise']);

          });

    } else {
      this.deviseService.create(this.formadd.value);
      this.btnCancel() ;
      this.router.navigate(['listeDevise']);

    }
  }

  btnCancel() {
    this.router.navigate(['listeDevise']);
  }

  compareData(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
//employeList

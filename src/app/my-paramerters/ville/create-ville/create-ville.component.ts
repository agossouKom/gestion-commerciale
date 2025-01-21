import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { first } from 'rxjs';
import { Departement } from 'src/app/my-modele/departement';
import { Ville } from 'src/app/my-modele/ville';
import { DepartementService } from 'src/app/my-service/departement.service';
import { PaysService } from 'src/app/my-service/pays.service';
import { VilleService } from 'src/app/my-service/ville.service';

@Component({
  selector: 'app-create-ville',
  templateUrl: './create-ville.component.html',
  styleUrls: ['./create-ville.component.css'],
})
export class CreateVilleComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';
  totalrow: number = 0;
  villes!: Ville[];
  forUpdate: Departement | undefined;
  //paysList!: any[];
  depListe: Array<Departement> = [];
  populateCombobox: any;
  testId: any;

  path: String = 'listVille';

  constructor(
    private formBuilder: FormBuilder,
    public villeService: VilleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id > 0) {
      this.loadData();
      this.btnText = 'Modifier';
      this.title = 'Editer ';
   //this.fillTextField(this.id);
    }
    this.initSelect();
    this.initFormData();
    this.loadActifDep();
  }


  initFormData() {
    this.formadd = this.formBuilder.group({
      idVille: 0,
      nomVille: ['', Validators.required],
      departement: ['', Validators.required],
      supprime: ['false'],
    });
  }

  loadActif() {
    this.villeService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.villes = userData;
        this.totalrow = userData.length;
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
  }


  loadData() {
    // this.populateCombobox=this.formadd.value.departement?.nomDepartement;
    this.villeService
      .getById(this.id)
      .subscribe((x) => this.formadd.patchValue(x));
  }

  loadActifDep() {
    this.villeService
      .loadDep()
      .pipe(first())
      .subscribe((userData) => {
        this.depListe = userData;
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
      this.villeService
        .update(this.formadd.value.idVille, this.formadd.value)
        .subscribe((data) => {
          this.btnCancel();
          this.loadActif();
          this.router.navigate([this.path]);
        });
    } else {
      this.villeService.create(this.formadd.value);
      this.btnCancel();
      this.router.navigate([this.path]);
      this.loadActif();
    }
  }
  btnCancel() {
    this.router.navigate([this.path]);
  }


  departementdropdownSettings!: IDropdownSettings;
  selectedItemsVille :any;

  initSelect() {
    this.departementdropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'nomDepartement',
      itemsShowLimit: 1000,
   closeDropDownOnSelection:true
    };
  }
  onSelectAll(items: any) {
    console.log(items);
    console.log(this.selectedItemsVille);

  }

  getSelectedItemValue(event: any) {

    console.log('item ' + event.target.value);

  }

  compareData(c1: any, c2: any): boolean {
    console.log("compareData : ",c1 && c2 ? c1.id === c2.id : c1 === c2);
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

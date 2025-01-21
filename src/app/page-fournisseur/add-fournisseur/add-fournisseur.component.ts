import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { first } from 'rxjs';
import { Banque } from 'src/app/my-modele/banque';
import { Devise } from 'src/app/my-modele/devise';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { Pays } from 'src/app/my-modele/pays';
import { TvaGlobale } from 'src/app/my-modele/tva-globale';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.css']
})
export class AddFournisseurComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';
  totalrow: number = 0;
  fournisseur!: Fournisseur[];
  payForUpdate: Pays | undefined;
  societeList!: any[];
  deviseList: Array<Devise> = [];
  fournisseurList: Array<Fournisseur> = [];
  paysList: Array<Pays> = [];

  populateCombobox: any;
  testId: any;

  titre: String = 'Fournisseur';
  path: String = 'listFournisseur';


  banqueList: Banque[] = [];
  tvaGlobale: TvaGlobale[] = [];
  devise: Devise[] = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings!: IDropdownSettings;

  constructor(
    private formBuilder: FormBuilder,
    private service: FournisseurService,
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
    this.initSelect();
    this.loadActifDevise();
    this.loadbanques();
    this.loadpays();

  }

  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      nomFsr: ['', Validators.required],
      adresse_fsr: [''],
      tel_fsr: [''],
      email_fsr: [''],
      fax_fsr: [''],

      matfisc_fsr: [''],
      sold_init_fsr: [''],
      solde_final_fsr: [''],
      franco: [''],
      created_fsr_at: [''],

      banque: ['', Validators.required],
      devise: ['', Validators.required],
      pays: ['', Validators.required],
      supprime: ['false'],
    });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.fournisseur = userData;
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

  loadActifDevise() {
    this.service
      .loaddevise()
      .pipe(first())
      .subscribe((userData) => {
        this.devise = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }

  loadbanques() {
    this.service
      .loadbanque()
      .pipe(first())
      .subscribe((userData) => {
        this.banqueList = userData;
       // console.log('banqueList liste', this.banqueList);
      });

    //
    //   this.tutorialService.getAllCategorie()
    // .subscribe({
    //  next: (res) => {
    //     this.categories=res;
    //      console.log(res);
    //      },
    //     error: (e) => console.error(e)
    //      });
  }

  loadfournisseur() {
    this.service
      .loadfournisseur()
      .pipe(first())
      .subscribe((userData) => {
        this.fournisseur = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }

  loadtvaGlobale() {
    this.service
      .loadtvaGlobale()
      .pipe(first())
      .subscribe((userData) => {
        this.tvaGlobale = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }

  loadpays() {
    this.service
      .loadpays()
      .pipe(first())
      .subscribe((userData) => {
        this.paysList = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }

  loaddevise() {
    this.service
      .loaddevise()
      .pipe(first())
      .subscribe((userData) => {
        this.devise = userData;
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
      this.service
        .update(this.formadd.value.id, this.formadd.value)
        .subscribe((data) => {
          //  console.log("pays list "+data);
           this.router.navigate([this.path]);
          this.loadActif();
        });
    } else {
      this.service.create(this.formadd.value);
       this.router.navigate([this.path]);
    }
  }
  btnCancel() {
    this.router.navigate([this.path]);
  }
  fournisseurdropdownSettings!: IDropdownSettings;
  selectedItemsfournisseur = [];

  devisedropdownSettingsings!: IDropdownSettings;
  selectedItemsdevisedropdown = [];

  initSelect() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'abrege',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 100,
      allowSearchFilter: true,
    };

    this.devisedropdownSettingsings = {
      singleSelection: false,
      idField: 'id',
      textField: 'deviseAbrege',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 100,
      allowSearchFilter: true,
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  compareData(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

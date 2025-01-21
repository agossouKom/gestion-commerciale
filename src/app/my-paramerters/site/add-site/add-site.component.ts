import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { first } from 'rxjs';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { Pays } from 'src/app/my-modele/pays';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { Societe } from 'src/app/my-modele/societe';
import { Ville } from 'src/app/my-modele/ville';
import { FournisseurService } from 'src/app/my-service/fournisseur.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css'],
})
export class AddSiteComponent {
  path: String = 'listSiteDeVente';
  formadd!: FormGroup;
  siteDeVente: Array<SiteDeVente> = [];
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';
  totalrow: number = 0;

  societe: Array<Societe> = [];
  payForUpdate: SiteDeVente | undefined;

  villeList: Array<Ville> = [];
  populateCombobox: any;
  testId: any;
  constructor(
    private formBuilder: FormBuilder,
    public service: SitevDeVenteService,
    private router: Router,
    private fournisseurService: FournisseurService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id > 0) {
      this.loadData();
      this.btnText = 'Modifier';
      this.title = 'Editer ';
      //  this.fillTextField(this.id);
      this.initSelect();
    }
    this.initSelect();
    this.initFormData();
    this.loadActifVille();
    this.loadActifSociete();
    this.loadfournisseur();
  }
  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      lib_site: ['', Validators.required],
      abrege_site: ['', Validators.required],
      adresse_site: ['', Validators.required],
      tel_moile_site: ['', Validators.required],

      tel_fixe_site: ['', Validators.required],
      email_site: ['', Validators.required],
      ville: ['', Validators.required],
      societe: ['', Validators.required],
      fournisseur: ['', Validators.required],
      supprime: ['false'],
    });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.siteDeVente = userData;
        this.totalrow = userData.length;
      });
  }

  fillTextField(id: number) {
    this.service
      .getById(id)
      .pipe(first())
      .subscribe((userData) => {
        this.payForUpdate = userData;
        this.formadd.patchValue({
          abrege_ste: this.payForUpdate.societe?.abrege_ste,
          devise: {
            deviseAbrege: this.payForUpdate.societe?.abrege_ste,
          },
        });
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
  }

  loadData() {
    /**this.service.getById(this.id).subscribe((x) => {
      this.payForUpdate = x;
      this.formadd.patchValue({
        idPays: this.payForUpdate.idPays,
        nomPays: this.payForUpdate.nomPays,
        devise: {
          deviseAbrege: this.payForUpdate.devise?.deviseAbrege,
        },
      });
      // console.log(this.idPays);
      this.populateCombobox = this.payForUpdate.devise?.deviseAbrege;
      (this.testId = this.payForUpdate.idPays),
        console.log(this.populateCombobox);
    }); */
    this.service.getById(this.id).subscribe((x) => this.formadd.patchValue(x));
    //   this.service.getById(this.id).subscribe((x) => {
    // this.payForUpdate = x;
    //    console.log(" x = ",x);
    // console.log(this.idPays);
    // });
  }

  loadActifSociete() {
    this.service
      .loadsociete()
      .pipe(first())
      .subscribe((userData) => {
        this.societe = userData;
        console.log('societe liste', this.societe);
      });
  }

  loadActifVille() {
    this.service
      .loadville()
      .pipe(first())
      .subscribe((userData) => {
        this.villeList = userData;
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
          this.btnCancel();
          this.loadActif();
          this.router.navigate([this.path]);
        });
    } else {
      this.service.create(this.formadd.value);
      this.btnCancel();
      this.router.navigate([this.path]);
    }
  }
  btnCancel() {
    this.router.navigate([this.path]);
  }
  compareData(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  fournisseurdropdownSettings!: IDropdownSettings;
  selectedItemsfournisseur = [];
  fournisseurStr?: String;
  fournisseursList: Fournisseur[] = [];
  fournisseursDataSelecting: Fournisseur[] = [];
  selectedItem?: any;

  loadByFournisseurName(name: String) {
    this.service.getByFournisseurName(name).subscribe(
      (data: any) => {
        console.log(data);
        this.fournisseursList = data;
        // this.typeCodeBars = this.fournisseurs?.typeCodeBar;
        console.log('fournisseurs = ', this.fournisseursList);
      },
      (error: any) => console.log(error)
    );
  }
  loadfournisseur() {
    this.fournisseurService
      .loadfournisseur()
      .pipe(first())
      .subscribe((userData) => {
        this.fournisseursList = userData;
        console.log('Pays liste', this.fournisseursList);
      });
  }
  initSelect() {
    this.fournisseurdropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nomFsr',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 1000,
      allowSearchFilter: true,
    };
    console.log(
      'fournisseurdropdownSettings ',
      this.fournisseurdropdownSettings
    );
  }
  onItemSelectfournisseur(item: any) {
    console.log(item);
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getSelectedItemValue(event: any) {
    this.fournisseursList = this.selectedItem.fournisseur;
    // this.selectedItem?.fournisseur.forEach((item: any) => {
    // this.fournisseursList = item?.nomFsr;
    //   console.log('selectedItem ', item?.nomFsr);
    // });
    console.log('selectedItem ', this.fournisseursList);
    this.initSelect();
  }
}

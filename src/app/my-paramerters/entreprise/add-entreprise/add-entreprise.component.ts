import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Banque } from 'src/app/my-modele/banque';
import { Devise } from 'src/app/my-modele/devise';
import { Fournisseur } from 'src/app/my-modele/fournisseur';
import { ModeExpedition } from 'src/app/my-modele/mode-expedition';
import { ModeReglement } from 'src/app/my-modele/mode-reglement';
import { ModeTransport } from 'src/app/my-modele/mode-transport';
import { Pays } from 'src/app/my-modele/pays';
import { Photo } from 'src/app/my-modele/photo';
import { Societe } from 'src/app/my-modele/societe';
import { TvaGlobale } from 'src/app/my-modele/tva-globale';
import { DeviseService } from 'src/app/my-service/devise.service';
import { PaysService } from 'src/app/my-service/pays.service';
import { SocieteService } from 'src/app/my-service/societe.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-entreprise',
  templateUrl: './add-entreprise.component.html',
  styleUrls: ['./add-entreprise.component.css'],
})
export class AddEntrepriseComponent {
  formadd!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';
  totalrow: number = 0;

  payForUpdate: Pays | undefined;
  societeList!: any[];
  deviseList: Array<Devise> = [];
  // banqueList: Array<Banque> = [];
  fournisseurList: Array<Fournisseur> = [];
  modeReglementList: Array<ModeReglement> = [];
  modeTransportList: Array<ModeTransport> = [];
  tvaGlobaleList: Array<TvaGlobale> = [];
  modeExpeditionList: Array<ModeExpedition> = [];
  paysList: Array<Pays> = [];
  photosList: Array<Photo> = [];
  populateCombobox: any;
  testId: any;

  titre: String = 'Societe';
  path: String = 'listSociete';

  societe!: Societe[];
  banqueList: Banque[] = [];
  fournisseur: Fournisseur[] = [];
  modereglement: ModeReglement[] = [];
  modeTransport: ModeTransport[] = [];
  tvaGlobale: TvaGlobale[] = [];
  modeExpedition: ModeExpedition[] = [];
  devise: Devise[] = [];

  dropdownList = [];
  selectedItems = [];
  dropdownSettings!: IDropdownSettings;

  constructor(
    private formBuilder: FormBuilder,
    private societeService: SocieteService,
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
    this.loadfournisseur();
    this.loadmodereglement();
    this.loadmodeTransport();
    this.loadtvaGlobale();
    this.loadmodeExpedition();
    this.loadpays();
    //this. loaddevise();
    this.loadphoto();
  }

  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      nom_ste: ['', Validators.required],
      abrege_ste: ['', Validators.required],
      adresse_ste: [''],
      tel_moile_ste: [''],
      tel_fixe_ste: [''],
      fax_ste: [''],
      matricule_ste: ['', Validators.required],
      rib_ste: [''],

      banque: ['', Validators.required],

      rccm_ste: [''],
      ifu_ste: [''],
      email_ste: [''],

      //photo: [''],

      bp_ste: [''],
      dateCreation: [''],
      numAutorisation: [''],
      statutSte: [''],
      siret: [''],
      siteweb: [''],

      fournisseur: ['', Validators.required],
      modereglement: ['', Validators.required],
      modeTransport: ['', Validators.required],
      tvaGlobale: ['', Validators.required],
      modeExpedition: ['', Validators.required],
      devise: ['', Validators.required],
      pays: ['', Validators.required],
      supprime: ['false'],
    });
  }

  loadActif() {
    this.societeService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.societe = userData;
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
    // this.societeService.getById(this.id).subscribe((x) => {
    // this.payForUpdate = x;
    // this.formadd.patchValue({
    //    idPays: this.payForUpdate.idPays,
    //   nomPays: this.payForUpdate.nomPays,
    //    devise: {
    //     deviseAbrege: this.payForUpdate.devise?.deviseAbrege,
    //    },
    // });
    //// console.log(this.idPays);
    // this.populateCombobox = this.payForUpdate.devise?.deviseAbrege;
    // (this.testId = this.payForUpdate.idPays),
    //  console.log(this.populateCombobox);
    // });
    this.societeService
      .getById(this.id)
      .subscribe((x) => this.formadd.patchValue(x));
  }

  loadActifDevise() {
    this.societeService
      .loaddevise()
      .pipe(first())
      .subscribe((userData) => {
        this.devise = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }

  loadbanques() {
    this.societeService
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
    this.societeService
      .loadfournisseur()
      .pipe(first())
      .subscribe((userData) => {
        this.fournisseur = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }

  loadmodereglement() {
    this.societeService
      .loadmodereglement()
      .pipe(first())
      .subscribe((userData) => {
        this.modereglement = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }

  loadmodeTransport() {
    this.societeService
      .loadmodeTransport()
      .pipe(first())
      .subscribe((userData) => {
        this.modeTransport = userData;
      // console.log("modeTransport",this.modeTransport);
      });
  }

  loadtvaGlobale() {
    this.societeService
      .loadtvaGlobale()
      .pipe(first())
      .subscribe((userData) => {
        this.tvaGlobale = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }

  loadmodeExpedition() {
    this.societeService
      .loadmodeExpedition()
      .pipe(first())
      .subscribe((userData) => {
        this.modeExpedition = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }

  loadpays() {
    this.societeService
      .loadpays()
      .pipe(first())
      .subscribe((userData) => {
        this.paysList = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }

  loaddevise() {
    this.societeService
      .loaddevise()
      .pipe(first())
      .subscribe((userData) => {
        this.devise = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }

  loadphoto() {
    this.societeService
      .loadphoto()
      .pipe(first())
      .subscribe((userData) => {
        this.photosList = userData;
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
      this.societeService
        .update(this.formadd.value.id, this.formadd.value)
        .subscribe((data) => {
          //  console.log("pays list "+data);
          this.btnCancel();
          this.loadActif();
          this.router.navigate([this.path]);
        });
    } else {
      this.societeService.create(this.formadd.value);
      this.btnCancel();
      this.router.navigate([this.path]);
    }
  }
  btnCancel() {
    this.router.navigate([this.path]);
  }
  fournisseurdropdownSettings!: IDropdownSettings;
  selectedItemsfournisseur = [];

  modereglementdropdownSettings!: IDropdownSettings;
  selectedItemsmodereglement = [];

  modeTransportdropdownSettings!: IDropdownSettings;
  selectedItemsmodeTransport = [];

  tvaGlobaledropdownSettings!: IDropdownSettings;
  selectedItemstvaGlobale = [];

  modeExpeditiondropdownSettings!: IDropdownSettings;
  selectedItemsmodeExpedition = [];

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
    this.fournisseurdropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nomFsr',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 100,
      allowSearchFilter: true,
    };
    this.modereglementdropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'lib_mode_rglt',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 100,
      allowSearchFilter: true,
    };
    this.modeTransportdropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'lib_transp',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 100,
      allowSearchFilter: true,
    };
    this.tvaGlobaledropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'tauxTva',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 100,
      allowSearchFilter: true,
    };
    this.modeExpeditiondropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'lib_exped',
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
  onItemSelectfournisseur(item: any) {
    console.log(item);
  }
  onSelectAllfournisseur(items: any) {
    console.log(items);
  }
  onItemSelectmodereglemente(item: any) {
    console.log(item);
  }
  onSelectAllmodereglemente(items: any) {
    console.log(items);
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

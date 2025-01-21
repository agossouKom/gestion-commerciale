import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { first } from 'rxjs';
import { Banque } from 'src/app/my-modele/banque';
import { Client } from 'src/app/my-modele/client';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { BanqueService } from 'src/app/my-service/banque.service';
import { ClientService } from 'src/app/my-service/client.service';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css'],
})
export class AddclientComponent {
  path: String = 'listClient';
  formadd!: FormGroup;

  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau client';
  totalrow: number = 0;

  client: Array<Client> = [];

  banques: Banque[] = [];
  siteDeVentes: SiteDeVente[] = [];

  populateCombobox: any;
  testId: any;

  userSiteName!: any;
  userSiteId!: number;
  userId!: number;
  siteId: any;
  siteName: String | undefined | null;
  siteDeVenteObj: SiteDeVente | undefined;

  constructor(
    private formBuilder: FormBuilder,
    public service: ClientService,
    public banqueService: BanqueService,
    public siteDeVenteService: SitevDeVenteService,
    private router: Router,
    private route: ActivatedRoute,
    public userInfoService: UserInfoService
  ) {
    let user_site_id = this.userInfoService.user_site_id;
    this.siteId = Number(user_site_id);
  }

  ngOnInit(): void {
    this.siteName = this.userInfoService.user_site;
    this.loadByySiteDeVente(this.siteId);
    this.loadBySiteDeVenteId(this.siteId);
    this.id = this.route.snapshot.params['id'];

    if (this.id > 0) {
      this.loadData();
      this.btnText = 'Modifier';
      this.title = 'Modifier les informations du  client ';
      //  this.fillTextField(this.id);
    }
    this.initFormData();
    //this.loadSiteVente();
    this.loadbanques();
    this.initSelect();
  }

  loadByySiteDeVente(id: number) {
    this.service
      .getBySiteVenteId(id)
      .pipe(first())
      .subscribe((data: any) => {
        this.client = data;
        this.totalrow = data.length;
        console.log('client  :', this.client);
      });
  }

  afficherTouteLesDonnees(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      // this.loadEntity();
      this.loadActifBySite(this.siteId);
    } else {
      this.isCheckedShowAllRecord = false;
      this.loadByySiteDeVente(this.siteId);
    }
  }

  loadBySiteDeVenteId(id: number) {
    this.siteDeVenteService
      .findByIdSite(id)
      .pipe(first())
      .subscribe((data: any) => {
        this.siteDeVenteObj = data;
        //  this.totalrow = data.length;
        console.log('siteDeVenteObj   = ', this.siteDeVenteObj);
      });
  }

  initFormData() {
    this.formadd = this.formBuilder.group({
      id: 0,
      nom: ['', Validators.required],
      prenom: ['', Validators.required],

      raisonSocialeClient: ['', Validators.required],
      tel_clt: [''],
      email_clt: ['', ''],
      fax_clt: ['', ''],
      banque: [''],
      siteDeVente: [''],
      adresse: ['', ''],
      ifuClient: ['', '']
    });
  }

  loadActif() {
    this.service
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.client = userData;
        this.totalrow = userData.length;
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
  }

  loadData() {
    this.service.getById(this.id).subscribe((x) => this.formadd.patchValue(x));
  }

  loadbanques() {
    this.banqueService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.banques = userData;
        //   console.log('banqueList liste', this.banques);
      });
  }

  loadSiteVente() {
    this.siteDeVenteService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.siteDeVentes = userData;
        // console.log("siteDeVentes",this.siteDeVentes);
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
      //  this.formadd.value.nouveaute=this.isCheckedShowAllRecord;
      this.formadd.value.siteDeVente = this.siteDeVenteObj;
      this.service
        .update(this.formadd.value.id, this.formadd.value)
        .subscribe((data) => {
          //  console.log("pays list "+data);
          this.btnCancel();
          this.loadByySiteDeVente(this.siteId);
          this.router.navigate([this.path]);
        });
    } else {
      //  this.formadd.value.nouveaute=this.isCheckedShowAllRecord;
      this.formadd.value.siteDeVente = this.siteDeVenteObj;
      this.formadd.value.createdAt = new Date();
      //  console.log("adding ",this.formadd.value);

      this.service.create(this.formadd.value);

      ///   console.log("created "+this.formadd.value);
      this.btnCancel();
      this.loadByySiteDeVente(this.siteId);
    }
  }
  btnCancel() {
    this.router.navigate([this.path]);
  }

  isCheckedShowAllRecord = false;
  nouveauProduit(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      //  this.formadd.value.nouveaute= true;
      // console.log("nouveauProduit "+this.formadd.value.nouveaute);
    } else {
      this.isCheckedShowAllRecord = false;
      //  this.formadd.value.nouveaute= false;
      // console.log("nouveauProduit "+this.formadd.value.nouveaute);
    }
  }
  dropdownSettings!: IDropdownSettings;
  dropdownSettingsBanque!: IDropdownSettings;
  selectedItemsBanque = [];
  selectedItemsSiteDeVente = [];

  initSelect() {
    this.dropdownSettingsBanque = {
      singleSelection: false,
      idField: 'id',
      textField: 'abrege',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'lib_site',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
  }
  loadActifBySite(idSite: number) {
    this.service
      .getBySiteVenteAll(idSite)
      .pipe(first())
      .subscribe((userData: any) => {
        this.client = userData;
        this.totalrow = userData.length;
        console.log('client all  = ', userData);
      });
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

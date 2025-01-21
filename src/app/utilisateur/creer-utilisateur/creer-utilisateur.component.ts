import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService as ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Photo } from 'src/app/my-modele/photo';
import { Role } from 'src/app/my-modele/role';
import { SiteDeVente } from 'src/app/my-modele/site-de-vente';
import { UtilisateurService } from 'src/app/my-service/utilisateur.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

@Component({
  selector: 'app-creer-utilisateur',
  templateUrl: './creer-utilisateur.component.html',
  styleUrls: ['./creer-utilisateur.component.css'],
})
export class CreerUtilisateurComponent {
  id!: number;
  loading = false;
  submitted = false;
  btnText: string = 'Sauver';
  title: string = 'Ajouter nouveau';

  file!: File;
  photoDetail!: Photo;
  fileUris: Array<String> = [];
  roles: Role[] = [];
  siteDeVentes: SiteDeVente[] = [];
  photo: Photo[] = [];

  signupForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public utilisateurService: UtilisateurService,
    public router: Router,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    public tokenStorageService: TokenStorageService
  ) {
    this.signupForm = this.formBuilder.group({
      id: 0,
      username: [''],
      password: [''],
      nom: [''],
      prenoms: [''],
      email: [''],
      roles: [''],
      photo: [''],
      site: [''],
    });
    let roles = localStorage.getItem('user_roles');
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id > 0) {
      this.loadData();
      this.btnText = 'Update';
      this.title = 'Edit Employee';
    }
    this.initSelect();
    this.loadRole();
    this.loaSiteVente();
    this.loadPhoto();
  }
  get f() {
    return this.signupForm.controls;
  }

  selectFile(event: any) {
    this.file = event.target.files.item(0);
    console.log(this.file);
    if (this.file) {
      this.uploadFile();
    }
  }
  idPhoto!: number;

  uploadFile() {
    this.utilisateurService.upload(this.file).subscribe({
      next: (data) => {
        this.photoDetail = data;
        this.fileUris.push(this.photoDetail.fileUri);
        this.loadPhoto();
        this.getById(this.photoDetail.id);

        // alert('Fileupload successfully');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getById(id: number) {
    this.utilisateurService.getPhotById(id).subscribe((x) => {
      this.photoDetail = x;
      //   console.log('photoDetail ' +   this.photoDetail?.photoName);
      // console.log('photoDetail ' +   this.photoDetail?.id);
    });
  }

  loadData() {
    this.utilisateurService
      .getById(this.id)
      .subscribe((x) => this.signupForm.patchValue(x));
  }
  registerUser() {
    console.log(this.signupForm.value);
    this.utilisateurService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.username) {
        console.log('resultat ' + res);
        this.toastr.success('Inscription Faite avec Success');
        this.signupForm.reset();
        this.router.navigate(['/login']); //login page
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.id > 0) {
      console.log('id ' + this.id);
      this.utilisateurService
        .update(this.signupForm.value.id, this.signupForm.value)
        .subscribe((data) => {
          this.btnCancel();
          this.loadData();
          this.router.navigate(['listUtilisateur']);
          this.setLogout();
        });
    } else {
      this.registerUser();
      this.router.navigate(['listUtilisateur']);
    }
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.tokenStorageService.clearToken();
      this.router.navigate(['login']);
    }
  }

  setLogout() {
    this.utilisateurService.logout();
    this.doLogout();
  }
  btnCancel() {
    this.router.navigate(['listUtilisateur']);
  }

  loadRole() {
    this.utilisateurService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        this.roles = userData;
        // console.log("Pays liste",this.deviseList);
      });
  }
  loaSiteVente() {
    this.utilisateurService
      .getActifSiteVente()
      .pipe(first())
      .subscribe((userData) => {
        this.siteDeVentes = userData;
        console.log('siteDeVentes', this.siteDeVentes);
      });
  }
  loadPhoto() {
    this.utilisateurService
      .getActifPhoto()
      .pipe(first())
      .subscribe((userData) => {
        this.photo = userData;
        for (let a of this.photo) {
          this.idPhoto = a.id;
          console.log('idPhoto ', this.idPhoto);
        }

        // console.log("Pays liste",this.deviseList);
      });
  }
  roledropdownSettings!: IDropdownSettings;
  selectedItemsrole = [];

  privilegedropdownSettings!: IDropdownSettings;
  selectedItemsprivilege = [];

  phtoedropdownSettings!: IDropdownSettings;
  selectedItemsPhoto = [];

  siteVentedownSettings!: IDropdownSettings;
  selectedItemsSiteVente = [];

  initSelect() {
    this.siteVentedownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'lib_site',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 1000,
      allowSearchFilter: true,
    };

    this.roledropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 1000,
      allowSearchFilter: true,
    };

    this.privilegedropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 1000,
      allowSearchFilter: true,
    };
    this.phtoedropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'photoName',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 1000,
      allowSearchFilter: true,
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}

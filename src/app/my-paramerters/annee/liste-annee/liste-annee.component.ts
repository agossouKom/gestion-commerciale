import { Component, OnInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { first } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AnneeExercice } from 'src/app/my-modele/AnneeExercice';
import { AnneeService } from 'src/app/my-service/annee.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserInfoService } from 'src/app/my-service/user-info.service';
import { FilterPipe } from "../../../filter/pipes/filter.pipe";

@Component({
  selector: 'app-liste-annee',
  templateUrl: './liste-annee.component.html',
  styleUrls: ['./liste-annee.component.css'],

})
export class ListeAnneeComponent implements OnInit {
  isLoading = false;

  entitiForm: FormGroup;
  isCheckedShowAllRecord = false;
  annee!: AnneeExercice[];
  resultatRecherche!: AnneeExercice[];
  dataToDisplay: AnneeExercice[];
  totalrow: number = 0;
  filteredCustomerList: any;
  filterText: any;
  p: number = 1;
  searchText: any;
  afficherTout: String = "Afficher les données supprimées";
  titre: String = "Année et exercice(s)";
  message: String = "";
  checkLoading = false;
  ////forfilter
  items = ["Kyle", "Eric", "Bailey", "Deborah", "Glenn", "Jaco", "Joni", "Gigi"]
  term: any;
  formadd!: FormGroup;
  //rechercher: string = '';
  constructor(
    public anneeService: AnneeService,
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private router: Router,
    private userInfoService: UserInfoService,

  ) {
    this.entitiForm = formBuilder.group({});
    this.annee = [];
    this.dataToDisplay = this.annee;
  }


  ngOnInit(): void {
    this.loadActif();
    this.dataToDisplay = this.annee;
  }
  toggleEditable(event: any) {
    if (event.target.checked) {
      this.isCheckedShowAllRecord = true;
      this.loadEntity();
    } else {
      this.isCheckedShowAllRecord = false;
      this.loadActif();
    }
  }
  loadEntity() {
    this.anneeService
      .getAll()
      .pipe(first())
      .subscribe((userData) => {
        this.annee = userData;
        console.log(this.annee);
        this.totalrow = userData.length;
        this.isLoading = true;
        // console.log('isLoading:', this.isLoading);
      });
  }

  loadActif() {
    this.anneeService
      .getActif()
      .pipe(first())
      .subscribe((userData) => {
        if (userData.length > 0) {
          this.isLoading = false;
          this.checkLoading = false;
        } else {
          this.isLoading = true;
          this.checkLoading = true;
        }

        this.annee = userData;
        console.log(this.annee);
        console.log(userData);
        this.totalrow = userData.length;
        // console.log('isLoading:', this.isLoading);
      });


    this.userInfoService.sleep(this.userInfoService.ms).then(() => {
      this.checkLoading = true;
      this.message = this.userInfoService.message;
      if (this.totalrow > 0) {
        this.checkLoading = false;
      }
    });
  }

  delete(data: AnneeExercice) {
    this.anneeService
      .delete(data.idAnSco)
      .pipe(first())
      .subscribe(() => {
        // this.loadEntity();
        this.loadActif();
      });
  }

  restore(data: AnneeExercice) {
    this.anneeService
      .redo(data.idAnSco)
      .pipe(first())
      .subscribe(() => {
        // this.loadEntity();
        this.loadActif();
      });
  }








}

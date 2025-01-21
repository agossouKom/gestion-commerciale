import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Sortie } from 'src/app/my-modele/sortie';
import { SousCategorie } from 'src/app/my-modele/sous-categorie';
import { Stock } from 'src/app/my-modele/stock';
import { SitevDeVenteService } from 'src/app/my-service/sitev-de-vente.service';
import { SortieService } from 'src/app/my-service/sortie.service';
import { StockService } from 'src/app/my-service/stock.service';
import { UserInfoService } from 'src/app/my-service/user-info.service';

@Component({
  selector: 'app-fiche-stock',
  templateUrl: './fiche-stock.component.html',
  styleUrls: ['./fiche-stock.component.css']
})
export class FicheStockComponent {



}

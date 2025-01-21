import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CreatePaysComponent } from './my-paramerters/pays/create-pays/create-pays.component';
import { ListPaysComponent } from './my-paramerters/pays/list-pays/list-pays.component';
import { DetailPaysComponent } from './my-paramerters/pays/detail-pays/detail-pays.component';
import { UpdatePaysComponent } from './my-paramerters/pays/update-pays/update-pays.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MenuParametreComponent } from './my-paramerters/menu-parametre/menu-parametre.component';
import { AcueilComponent } from './acueil/acueil.component';

import { PageOrigineComponent } from './page-origine/page-origine.component';

import { PageFacturationComponent } from './page-facturation/page-facturation.component';
import { PageImpressionComponent } from './page-impression/page-impression.component';
import { PageStatiqueComponent } from './page-statique/page-statique.component';

import { ListDeviseComponent } from './my-paramerters/device/list-devise/list-devise.component';
import { CreateDeviseComponent } from './my-paramerters/device/create-devise/create-devise.component';

import { LoginUtilisareurComponent } from './utilisateur/login-utilisareur/login-utilisareur.component';
import { UserProfileComponent } from './utilisateur/user-profile/user-profile.component';

import { CreerUtilisateurComponent } from './utilisateur/creer-utilisateur/creer-utilisateur.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
import { CreateQuartierComponent } from './my-paramerters/quartier/create-quartier/create-quartier.component';
import { ListeQuartierComponent } from './my-paramerters/quartier/liste-quartier/liste-quartier.component';
import { DetailQuartierComponent } from './my-paramerters/quartier/detail-quartier/detail-quartier.component';
import { CreateDepartementComponent } from './my-paramerters/departement/create-departement/create-departement.component';
import { ListeDepartementtComponent } from './my-paramerters/departement/liste-departementt/liste-departementt.component';
import { DetailDepartementComponent } from './my-paramerters/departement/detail-departement/detail-departement.component';
import { CreateCommuneComponent } from './my-paramerters/commune/create-commune/create-commune.component';
import { ListeCommuneComponent } from './my-paramerters/commune/liste-commune/liste-commune.component';
import { DetailCommuneComponent } from './my-paramerters/commune/detail-commune/detail-commune.component';
import { CreateVilleComponent } from './my-paramerters/ville/create-ville/create-ville.component';
import { ListeVilleComponent } from './my-paramerters/ville/liste-ville/liste-ville.component';
import { DetailVilleComponent } from './my-paramerters/ville/detail-ville/detail-ville.component';
import { AddEntrepriseComponent } from './my-paramerters/entreprise/add-entreprise/add-entreprise.component';
import { ListeEntrepriseComponent } from './my-paramerters/entreprise/liste-entreprise/liste-entreprise.component';
import { DetailEntrepriseComponent } from './my-paramerters/entreprise/detail-entreprise/detail-entreprise.component';
import { AddFondateurComponent } from './my-paramerters/fondateurs/add-fondateur/add-fondateur.component';
import { ListeFondateurComponent } from './my-paramerters/fondateurs/liste-fondateur/liste-fondateur.component';
import { DetailFondateurComponent } from './my-paramerters/fondateurs/detail-fondateur/detail-fondateur.component';
import { AddSiteComponent } from './my-paramerters/site/add-site/add-site.component';
import { ListeSiteComponent } from './my-paramerters/site/liste-site/liste-site.component';
import { DetailSiteComponent } from './my-paramerters/site/detail-site/detail-site.component';
import { AddAnneeComponent } from './my-paramerters/annee/add-annee/add-annee.component';
import { ListeAnneeComponent } from './my-paramerters/annee/liste-annee/liste-annee.component';
import { AddEmployeeComponent } from './labo/add-employee/add-employee.component';
import { ListEmployeComponent } from './labo/list-employe/list-employe.component';
import {
  AuthConfig,
  TokenInterceptoProvider,
} from './shared/authconfig.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyTableHelperComponent } from './table-helper/my-table-helper/my-table-helper.component';
import { UserComponent } from './labo/user/user.component';
import { TestEmployeeComponent } from './labo/test-employee/test-employee.component';
import { VueTestEmployeeComponent } from './labo/vue-test-employee/vue-test-employee.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './filter/pipes/filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CreateArrondissementComponent } from './my-paramerters/arrondissement/create-arrondissement/create-arrondissement.component';
import { ListeArrondissementtComponent } from './my-paramerters/arrondissement/liste-arrondissementt/liste-arrondissementt.component';
import { AddCategorieComponent } from './my-paramerters/categorie/add-categorie/add-categorie.component';
import { ListedCategorieComponent } from './my-paramerters/categorie/listed-categorie/listed-categorie.component';
import { AddSousCategorieComponent } from './my-paramerters/categorieSous/add-sous-categorie/add-sous-categorie.component';
import { ListeSousCategorieComponent } from './my-paramerters/categorieSous/liste-sous-categorie/liste-sous-categorie.component';
import { AddModeReglementComponent } from './my-paramerters/modeReglement/add-mode-reglement/add-mode-reglement.component';
import { ListeModeReglementComponent } from './my-paramerters/modeReglement/liste-mode-reglement/liste-mode-reglement.component';
import { AddModeExpeditionComponent } from './my-paramerters/modeExpedition/add-mode-expedition/add-mode-expedition.component';
import { ListeModeExpedirionComponent } from './my-paramerters/modeExpedition/liste-mode-expedirion/liste-mode-expedirion.component';
import { AddModeTransportComponent } from './my-paramerters/modeTransport/add-mode-transport/add-mode-transport.component';
import { ListeModeTransportComponent } from './my-paramerters/modeTransport/liste-mode-transport/liste-mode-transport.component';
import { MarqueComponent } from './my-paramerters/marque/marque/marque.component';
import { ListeMarqueComponent } from './my-paramerters/marque/liste-marque/liste-marque.component';
import { TypeCodeBarComponent } from './my-paramerters/typeCodeBar/type-code-bar/type-code-bar.component';
import { ListeTypeCodeBarComponent } from './my-paramerters/typeCodeBar/liste-type-code-bar/liste-type-code-bar.component';
import { TvaGlobaleComponent } from './my-paramerters/tvaGlobale/tva-globale/tva-globale.component';
import { ListeTvaGlobaleComponent } from './my-paramerters/tvaGlobale/liste-tva-globale/liste-tva-globale.component';
import { AddBanqueComponent } from './my-paramerters/banque/add-banque/add-banque.component';
import { ListBanqueComponent } from './my-paramerters/banque/list-banque/list-banque.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddFournisseurComponent } from './page-fournisseur/add-fournisseur/add-fournisseur.component';
import { ListFournisseurComponent } from './page-fournisseur/list-fournisseur/list-fournisseur.component';
import { DetailFournisseurComponent } from './page-fournisseur/detail-fournisseur/detail-fournisseur.component';
import { AddArticleComponent } from './page-article/add-article/add-article.component';
import { ListArticleComponent } from './page-article/list-article/list-article.component';
import { DetailArticleComponent } from './page-article/detail-article/detail-article.component';
import { AddclientComponent } from './page-client/addclient/addclient.component';
import { ListClientComponent } from './page-client/list-client/list-client.component';
import { DetailClientComponent } from './page-client/detail-client/detail-client.component';
import { UniteMesureComponent } from './my-paramerters/uniteMesure/unite-mesure/unite-mesure.component';
import { ListeUniteMesureComponent } from './my-paramerters/uniteMesure/liste-unite-mesure/liste-unite-mesure.component';
import { CreateSortieComponent } from './page-sortie/create-sortie/create-sortie.component';
import { ListingVenteComponent } from './page-sortie/listing-vente/listing-vente.component';
import { DetailSortieComponent } from './page-sortie/detail-sortie/detail-sortie.component';
import { IndexComponent } from './page-sortie/index/index.component';
import { ServirComponent } from './page-sortie/servir/servir.component';
import { PointDesVentesComponent } from './page-sortie/point-des-ventes/point-des-ventes.component';
import { MarchandiseComponent } from './page-marchandise/marchandise/marchandise.component';
import { AddEntreeComponent } from './page-entreeMarchandise/add-entree/add-entree.component';
import { ListEntreeComponent } from './page-entreeMarchandise/list-entree/list-entree.component';
import { DetailEntreeComponent } from './page-entreeMarchandise/detail-entree/detail-entree.component';
import { AddSortieComponent } from './page-sortieMarchandise/add-sortie/add-sortie.component';
import { ListSortieComponent } from './page-sortieMarchandise/list-sortie/list-sortie.component';
import { AddInventaireComponent } from './page-inventaire/add-inventaire/add-inventaire.component';
import { ListInventaireComponent } from './page-inventaire/list-inventaire/list-inventaire.component';
import { DetailInventaireComponent } from './page-inventaire/detail-inventaire/detail-inventaire.component';
import { FicheStockComponent } from './page-inventaire/fiche-stock/fiche-stock.component';
import { AddRoleComponent } from './utilisateur/add-role/add-role.component';
import { ListRoleComponent } from './utilisateur/list-role/list-role.component';
import { AddPrivilegeComponent } from './utilisateur/add-privilege/add-privilege.component';
import { ListPrivilegeComponent } from './utilisateur/list-privilege/list-privilege.component';
import { UserDetailComponent } from './utilisateur/user-detail/user-detail.component';
import { ListMarchandiseComponent } from './page-marchandise/list-marchandise/list-marchandise.component';
import { DetailMarchandiseComponent } from './page-marchandise/detail-marchandise/detail-marchandise.component';
import { RayonListeComponent } from './my-paramerters/rayon/rayon-liste/rayon-liste.component';
import { RayonDetailComponent } from './my-paramerters/rayon/rayon-detail/rayon-detail.component';
import { AddRayonComponent } from './my-paramerters/rayon/add-rayon/add-rayon.component';
import { RayonCategorieListComponent } from './my-paramerters/rayonCategorie/rayon-categorie-list/rayon-categorie-list.component';
import { RayonCategorieDetailComponent } from './my-paramerters/rayonCategorie/rayon-categorie-detail/rayon-categorie-detail.component';
import { AddCategorierayonComponent } from './my-paramerters/rayonCategorie/add-categorierayon/add-categorierayon.component';
import { AddAppConfigComponent } from './appConfig/add-app-config/add-app-config.component';
import { AppConfDetailComponent } from './appConfig/app-conf-detail/app-conf-detail.component';
import { AppConfigListComponent } from './appConfig/app-config-list/app-config-list.component';
import { AddConditionnementventComponent } from './page-conditionnementvente/add-conditionnementvent/add-conditionnementvent.component';
import { ListeConditionnementventComponent } from './page-conditionnementvente/liste-conditionnementvent/liste-conditionnementvent.component';
import { DetailConditionnementventComponent } from './page-conditionnementvente/detail-conditionnementvent/detail-conditionnementvent.component';
import { CreateReceptionComponent } from './page-reception/create-reception/create-reception.component';
import { ListeReceptionComponent } from './page-reception/liste-reception/liste-reception.component';
import { DetailReceptionComponent } from './page-reception/detail-reception/detail-reception.component';
import { UpdateReceptionComponent } from './page-reception/update-reception/update-reception.component';
import { UpdateConditionnementVenteComponent } from './page-conditionnementvente/update-conditionnement-vente/update-conditionnement-vente.component';
import { ManageIdTmpComponent } from './idtmp/manage-id-tmp/manage-id-tmp.component';
import { ReceptionComponent } from './page-entreeMarchandise/reception/reception.component';
import { ReglementFactureComponent } from './page-entreeMarchandise/reglement-facture/reglement-facture.component';
import { CondVenteComponent } from './page-marchandise/cond-vente/cond-vente.component';
import { ListStockComponent } from './page-stock/list-stock/list-stock.component';
import { GallerieSortiesComponent } from './page-sortie/gallerie/gallerie-sorties/gallerie-sorties.component';
import { PointGlobalComponent } from './page-pointSortie/point-global/point-global.component';
import { PointParArticleComponent } from './page-pointSortie/point-par-article/point-par-article.component';
import { PointParSiteComponent } from './page-pointSortie/point-par-site/point-par-site.component';
import { PoinParConditionVenteComponent } from './page-pointSortie/poin-par-condition-vente/poin-par-condition-vente.component';

//NgMultiSelectDropDownModule, This project was generated with Angular CLI version 1.7.1.
const MATERIAL_MODULES = [MatToolbarModule, MatIconModule];

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    CreatePaysComponent,
    ListPaysComponent,
    DetailPaysComponent,
    UpdatePaysComponent,
    MenuParametreComponent,
    AcueilComponent,
    PageOrigineComponent,
    PageFacturationComponent,
    PageImpressionComponent,
    PageStatiqueComponent,
    ListDeviseComponent,
    CreateDeviseComponent,
    CreerUtilisateurComponent,
    ListUtilisateurComponent,
    LoginUtilisareurComponent,
    UserProfileComponent,
    CreateQuartierComponent,
    ListeQuartierComponent,
    DetailQuartierComponent,
    CreateDepartementComponent,
    ListeDepartementtComponent,
    DetailDepartementComponent,
    CreateCommuneComponent,
    ListeCommuneComponent,
    DetailCommuneComponent,
    CreateVilleComponent,
    ListeVilleComponent,
    DetailVilleComponent,
    AddEntrepriseComponent,
    ListeEntrepriseComponent,
    DetailEntrepriseComponent,
    AddFondateurComponent,
    ListeFondateurComponent,
    DetailFondateurComponent,
    AddSiteComponent,
    ListeSiteComponent,
    DetailSiteComponent,
    AddAnneeComponent,
    ListeAnneeComponent,
    AddEmployeeComponent,
    ListEmployeComponent,
    MyTableHelperComponent,
    UserComponent,
    TestEmployeeComponent,
    VueTestEmployeeComponent,
    FilterPipe,
    CreateArrondissementComponent,
    ListeArrondissementtComponent,
    AddCategorieComponent,
    ListedCategorieComponent,
    AddSousCategorieComponent,
    ListeSousCategorieComponent,
    AddModeReglementComponent,
    ListeModeReglementComponent,
    AddModeExpeditionComponent,
    ListeModeExpedirionComponent,
    AddModeTransportComponent,
    ListeModeTransportComponent,
    MarqueComponent,
    ListeMarqueComponent,
    TypeCodeBarComponent,
    ListeTypeCodeBarComponent,
    TvaGlobaleComponent,
    ListeTvaGlobaleComponent,
    AddBanqueComponent,
    ListBanqueComponent,
    AddFournisseurComponent,
    ListFournisseurComponent,
    DetailFournisseurComponent,
    AddArticleComponent,
    ListArticleComponent,
    DetailArticleComponent,
    AddclientComponent,
    ListClientComponent,
    DetailClientComponent,
    UniteMesureComponent,
    ListeUniteMesureComponent,

    CreateSortieComponent,
    ListingVenteComponent,
    DetailSortieComponent,
    IndexComponent,
    ServirComponent,
    PointDesVentesComponent,
    MarchandiseComponent,
    AddEntreeComponent,
    ListEntreeComponent,
    DetailEntreeComponent,
    AddSortieComponent,
    ListSortieComponent,
    AddInventaireComponent,
    ListInventaireComponent,
    DetailInventaireComponent,
    FicheStockComponent,
    AddRoleComponent,
    ListRoleComponent,
    AddPrivilegeComponent,
    ListPrivilegeComponent,
    UserDetailComponent,
    ListMarchandiseComponent,
    DetailMarchandiseComponent,
    RayonListeComponent,
    RayonDetailComponent,
    AddRayonComponent,
    RayonCategorieListComponent,
    RayonCategorieDetailComponent,
    AddCategorierayonComponent,
    AddAppConfigComponent,
    AppConfDetailComponent,
    AppConfigListComponent,
    AddConditionnementventComponent,
    ListeConditionnementventComponent,
    DetailConditionnementventComponent,
    CreateReceptionComponent,
    ListeReceptionComponent,
    DetailReceptionComponent,
    UpdateReceptionComponent,
    UpdateConditionnementVenteComponent,
    ManageIdTmpComponent,
    ReceptionComponent,
    ReglementFactureComponent,
    CondVenteComponent,
    ListStockComponent,
    GallerieSortiesComponent,
    PointGlobalComponent,
    PointParArticleComponent,
    PointParSiteComponent,
    PoinParConditionVenteComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatDialogModule,
    DatePipe,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 2000, enableHtml: true }),
    NgxPaginationModule,
    MatCheckboxModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  exports: MATERIAL_MODULES,
  providers: [
    DatePipe,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    TokenInterceptoProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

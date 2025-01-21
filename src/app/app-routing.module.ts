import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePaysComponent } from './my-paramerters/pays/create-pays/create-pays.component';
import { ListPaysComponent } from './my-paramerters/pays/list-pays/list-pays.component';
import { UpdatePaysComponent } from './my-paramerters/pays/update-pays/update-pays.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MenuParametreComponent } from './my-paramerters/menu-parametre/menu-parametre.component';
import { AcueilComponent } from './acueil/acueil.component';
import { PageOrigineComponent } from './page-origine/page-origine.component';

import { PageFacturationComponent } from './page-facturation/page-facturation.component';
import { PageImpressionComponent } from './page-impression/page-impression.component';
import { PageStatiqueComponent } from './page-statique/page-statique.component';
import { ListDeviseComponent } from './my-paramerters/device/list-devise/list-devise.component';
import { LoginUtilisareurComponent } from './utilisateur/login-utilisareur/login-utilisareur.component';
import { UserProfileComponent } from './utilisateur/user-profile/user-profile.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
import { CreerUtilisateurComponent } from './utilisateur/creer-utilisateur/creer-utilisateur.component';
import { ListEmployeComponent } from './labo/list-employe/list-employe.component';
import { AddEmployeeComponent } from './labo/add-employee/add-employee.component';
import { AuthGuard } from './shared/auth.guard';
import { UserComponent } from './labo/user/user.component';
import { TestEmployeeComponent } from './labo/test-employee/test-employee.component';
import { AddAnneeComponent } from './my-paramerters/annee/add-annee/add-annee.component';
import { ListeAnneeComponent } from './my-paramerters/annee/liste-annee/liste-annee.component';
import { CreateDeviseComponent } from './my-paramerters/device/create-devise/create-devise.component';
import { ListeDepartementtComponent } from './my-paramerters/departement/liste-departementt/liste-departementt.component';
import { CreateDepartementComponent } from './my-paramerters/departement/create-departement/create-departement.component';
import { CreateVilleComponent } from './my-paramerters/ville/create-ville/create-ville.component';
import { ListeVilleComponent } from './my-paramerters/ville/liste-ville/liste-ville.component';
import { CreateQuartierComponent } from './my-paramerters/quartier/create-quartier/create-quartier.component';
import { ListeQuartierComponent } from './my-paramerters/quartier/liste-quartier/liste-quartier.component';
import { CreateArrondissementComponent } from './my-paramerters/arrondissement/create-arrondissement/create-arrondissement.component';
import { ListeArrondissementtComponent } from './my-paramerters/arrondissement/liste-arrondissementt/liste-arrondissementt.component';
import { ListedCategorieComponent } from './my-paramerters/categorie/listed-categorie/listed-categorie.component';
import { AddCategorieComponent } from './my-paramerters/categorie/add-categorie/add-categorie.component';
import { AddSousCategorieComponent } from './my-paramerters/categorieSous/add-sous-categorie/add-sous-categorie.component';
import { ListeSousCategorieComponent } from './my-paramerters/categorieSous/liste-sous-categorie/liste-sous-categorie.component';
import { ListeModeReglementComponent } from './my-paramerters/modeReglement/liste-mode-reglement/liste-mode-reglement.component';
import { AddModeReglementComponent } from './my-paramerters/modeReglement/add-mode-reglement/add-mode-reglement.component';
import { AddModeExpeditionComponent } from './my-paramerters/modeExpedition/add-mode-expedition/add-mode-expedition.component';
import { ListeModeExpedirionComponent } from './my-paramerters/modeExpedition/liste-mode-expedirion/liste-mode-expedirion.component';
import { AddModeTransportComponent } from './my-paramerters/modeTransport/add-mode-transport/add-mode-transport.component';
import { ListeModeTransportComponent } from './my-paramerters/modeTransport/liste-mode-transport/liste-mode-transport.component';
import { ListeTypeCodeBarComponent } from './my-paramerters/typeCodeBar/liste-type-code-bar/liste-type-code-bar.component';
import { TypeCodeBarComponent } from './my-paramerters/typeCodeBar/type-code-bar/type-code-bar.component';
import { ListeTvaGlobaleComponent } from './my-paramerters/tvaGlobale/liste-tva-globale/liste-tva-globale.component';
import { TvaGlobaleComponent } from './my-paramerters/tvaGlobale/tva-globale/tva-globale.component';
import { AddBanqueComponent } from './my-paramerters/banque/add-banque/add-banque.component';
import { ListBanqueComponent } from './my-paramerters/banque/list-banque/list-banque.component';
import { AddFondateurComponent } from './my-paramerters/fondateurs/add-fondateur/add-fondateur.component';
import { ListeFondateurComponent } from './my-paramerters/fondateurs/liste-fondateur/liste-fondateur.component';
import { AddEntrepriseComponent } from './my-paramerters/entreprise/add-entreprise/add-entreprise.component';
import { DetailEntrepriseComponent } from './my-paramerters/entreprise/detail-entreprise/detail-entreprise.component';
import { ListeEntrepriseComponent } from './my-paramerters/entreprise/liste-entreprise/liste-entreprise.component';
import { AddSiteComponent } from './my-paramerters/site/add-site/add-site.component';
import { DetailSiteComponent } from './my-paramerters/site/detail-site/detail-site.component';
import { ListeSiteComponent } from './my-paramerters/site/liste-site/liste-site.component';
import { AddFournisseurComponent } from './page-fournisseur/add-fournisseur/add-fournisseur.component';
import { DetailFournisseurComponent } from './page-fournisseur/detail-fournisseur/detail-fournisseur.component';
import { ListFournisseurComponent } from './page-fournisseur/list-fournisseur/list-fournisseur.component';
import { AddArticleComponent } from './page-article/add-article/add-article.component';
import { DetailArticleComponent } from './page-article/detail-article/detail-article.component';
import { ListArticleComponent } from './page-article/list-article/list-article.component';
import { AddclientComponent } from './page-client/addclient/addclient.component';
import { DetailClientComponent } from './page-client/detail-client/detail-client.component';
import { ListClientComponent } from './page-client/list-client/list-client.component';
import { ListeUniteMesureComponent } from './my-paramerters/uniteMesure/liste-unite-mesure/liste-unite-mesure.component';
import { UniteMesureComponent } from './my-paramerters/uniteMesure/unite-mesure/unite-mesure.component';
import { CreateSortieComponent } from './page-sortie/create-sortie/create-sortie.component';
import { ListingVenteComponent } from './page-sortie/listing-vente/listing-vente.component';
import { DetailSortieComponent } from './page-sortie/detail-sortie/detail-sortie.component';
import { IndexComponent } from './page-sortie/index/index.component';
import { PointDesVentesComponent } from './page-sortie/point-des-ventes/point-des-ventes.component';
import { UserDetailComponent } from './utilisateur/user-detail/user-detail.component';
import { DetailMarchandiseComponent } from './page-marchandise/detail-marchandise/detail-marchandise.component';
import { ListMarchandiseComponent } from './page-marchandise/list-marchandise/list-marchandise.component';
import { MarchandiseComponent } from './page-marchandise/marchandise/marchandise.component';
import { AddEntreeComponent } from './page-entreeMarchandise/add-entree/add-entree.component';
import { DetailEntreeComponent } from './page-entreeMarchandise/detail-entree/detail-entree.component';
import { ListEntreeComponent } from './page-entreeMarchandise/list-entree/list-entree.component';
import { AddSortieComponent } from './page-sortieMarchandise/add-sortie/add-sortie.component';
import { ListSortieComponent } from './page-sortieMarchandise/list-sortie/list-sortie.component';
import { AddInventaireComponent } from './page-inventaire/add-inventaire/add-inventaire.component';
import { DetailInventaireComponent } from './page-inventaire/detail-inventaire/detail-inventaire.component';
import { FicheStockComponent } from './page-inventaire/fiche-stock/fiche-stock.component';
import { ListInventaireComponent } from './page-inventaire/list-inventaire/list-inventaire.component';
import { DetailConditionnementventComponent } from './page-conditionnementvente/detail-conditionnementvent/detail-conditionnementvent.component';
import { AddConditionnementventComponent } from './page-conditionnementvente/add-conditionnementvent/add-conditionnementvent.component';
import { ListeConditionnementventComponent } from './page-conditionnementvente/liste-conditionnementvent/liste-conditionnementvent.component';
import { CreateReceptionComponent } from './page-reception/create-reception/create-reception.component';
import { DetailReceptionComponent } from './page-reception/detail-reception/detail-reception.component';
import { ListeReceptionComponent } from './page-reception/liste-reception/liste-reception.component';
import { UpdateReceptionComponent } from './page-reception/update-reception/update-reception.component';
import { UpdateConditionnementVenteComponent } from './page-conditionnementvente/update-conditionnement-vente/update-conditionnement-vente.component';
import { ReglementFactureComponent } from './page-entreeMarchandise/reglement-facture/reglement-facture.component';
import { ReceptionComponent } from './page-entreeMarchandise/reception/reception.component';
import { CondVenteComponent } from './page-marchandise/cond-vente/cond-vente.component';
import { UtilisateurService } from './my-service/utilisateur.service';
import { ListStockComponent } from './page-stock/list-stock/list-stock.component';
import { GallerieSortiesComponent } from './page-sortie/gallerie/gallerie-sorties/gallerie-sorties.component';
import { PointParSiteComponent } from './page-pointSortie/point-par-site/point-par-site.component';
import { PointGlobalComponent } from './page-pointSortie/point-global/point-global.component';
import { PointParArticleComponent } from './page-pointSortie/point-par-article/point-par-article.component';

/*{ path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'tutorials/:id', component: TutorialDetailsComponent },
  { path: 'add', component: AddTutorialComponent }, */

/*   { path: '', redirectTo: 'listPays', pathMatch: 'full' }, */
/*   { path: 'creatPays', component: CreatePaysComponent },
  { path: 'listPays', component: ListPaysComponent },
  { path: 'updatePays/:id', component: UpdatePaysComponent } */

const routes: Routes = [
  {
    path: '',
    component: DashbordComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/accueil', pathMatch: 'full' },
      // { path: '', redirectTo: 'accueil', component: AcueilComponent },
      { path: 'accueil', component: AcueilComponent },
      { path: 'creatPays', component: CreatePaysComponent },
      { path: 'parametre', component: MenuParametreComponent },
      { path: 'listPays', component: ListPaysComponent },
      { path: 'pays/edit/:id', component: CreatePaysComponent },
      { path: 'addPays', component: CreatePaysComponent },
      { path: 'updatePays/:id', component: UpdatePaysComponent },

      { path: 'setOrigine', component: PageOrigineComponent },

      { path: 'setFacturation', component: PageFacturationComponent },
      { path: 'setImpression', component: PageImpressionComponent },
      { path: 'setStatistique', component: PageStatiqueComponent },

      { path: 'listeDevise', component: ListDeviseComponent },
      { path: 'devise/edit/:id', component: CreateDeviseComponent },
      { path: 'devise/add', component: CreateDeviseComponent },

      { path: 'listUtilisateur', component: ListUtilisateurComponent },
      { path: 'detailUtilisateur/:id', component: UserDetailComponent },
      { path: 'creerUtilisateur', component: CreerUtilisateurComponent },
      { path: 'utilisateur/edit/:id', component: CreerUtilisateurComponent },

      { path: 'employeList', component: ListEmployeComponent },
      { path: 'addEmploye', component: AddEmployeeComponent },
      { path: 'employee/add', component: AddEmployeeComponent },
      { path: 'employee/edit/:id', component: AddEmployeeComponent },
      { path: 'employeeTestList', component: TestEmployeeComponent },
      { path: 'listAnnees', component: ListeAnneeComponent },
      { path: 'annees/edit/:id', component: AddAnneeComponent },
      { path: 'addAnnees', component: AddAnneeComponent },

      { path: 'listDepartement', component: ListeDepartementtComponent },
      { path: 'departement/edit/:id', component: CreateDepartementComponent },
      { path: 'addDepartement', component: CreateDepartementComponent },

      { path: 'listVille', component: ListeVilleComponent },
      { path: 'ville/edit/:id', component: CreateVilleComponent },
      { path: 'addVille', component: CreateVilleComponent },

      { path: 'listArrondissement', component: ListeArrondissementtComponent },
      {
        path: 'arrondissement/edit/:id',
        component: CreateArrondissementComponent,
      },
      { path: 'addArrondissement', component: CreateArrondissementComponent },

      { path: 'listQuartier', component: ListeQuartierComponent },
      { path: 'quartier/edit/:id', component: CreateQuartierComponent },
      { path: 'addQuartier', component: CreateQuartierComponent },

      { path: 'listCategorie', component: ListedCategorieComponent },
      { path: 'categorie/edit/:id', component: AddCategorieComponent },
      { path: 'addCategorie', component: AddCategorieComponent },

      { path: 'listSousCategorie', component: ListeSousCategorieComponent },
      { path: 'sousCategorie/edit/:id', component: AddSousCategorieComponent },
      { path: 'addSousCategorie', component: AddSousCategorieComponent },

      { path: 'listModeReglement', component: ListeModeReglementComponent },
      { path: 'modeReglement/edit/:id', component: AddModeReglementComponent },
      { path: 'addModeReglement', component: AddModeReglementComponent },

      { path: 'listModeExpedition', component: ListeModeExpedirionComponent },
      {
        path: 'modeExpedition/edit/:id',
        component: AddModeExpeditionComponent,
      },
      { path: 'addModeExpedition', component: AddModeExpeditionComponent },

      { path: 'listModeTransport', component: ListeModeTransportComponent },
      { path: 'modeTransport/edit/:id', component: AddModeTransportComponent },
      { path: 'addModeTransport', component: AddModeTransportComponent },

      { path: 'listTypeCodeBar', component: ListeTypeCodeBarComponent },
      { path: 'typeCodeBar/edit/:id', component: TypeCodeBarComponent },
      { path: 'addTypeCodeBar', component: TypeCodeBarComponent },

      { path: 'listTvaGlobale', component: ListeTvaGlobaleComponent },
      { path: 'tvaGlobale/edit/:id', component: TvaGlobaleComponent },
      { path: 'addTvaGlobale', component: TvaGlobaleComponent },

      { path: 'listBanque', component: ListBanqueComponent },
      { path: 'banque/edit/:id', component: AddBanqueComponent },
      { path: 'addBanque', component: AddBanqueComponent },

      { path: 'listFondateur', component: ListeFondateurComponent },
      { path: 'fondateur/edit/:id', component: AddFondateurComponent },
      { path: 'addFondateur', component: AddFondateurComponent },

      { path: 'listSociete', component: ListeEntrepriseComponent },
      { path: 'societe/edit/:id', component: AddEntrepriseComponent },
      { path: 'addSociete', component: AddEntrepriseComponent },
      { path: 'detailSociete/:id', component: DetailEntrepriseComponent },

      { path: 'listSiteDeVente', component: ListeSiteComponent },
      { path: 'siteDeVente/edit/:id', component: AddSiteComponent },
      { path: 'addSiteDeVente', component: AddSiteComponent },
      { path: 'detailSiteDeVente/:id', component: DetailSiteComponent },

      { path: 'listFournisseur', component: ListFournisseurComponent },
      { path: 'fournisseur/edit/:id', component: AddFournisseurComponent },
      { path: 'addFournisseur', component: AddFournisseurComponent },
      { path: 'detailFournisseur/:id', component: DetailFournisseurComponent },

      { path: 'listArticle', component: ListArticleComponent },
      { path: 'article/edit/:id', component: AddArticleComponent },
      { path: 'addArticle', component: AddArticleComponent },
      { path: 'detailArticle/:id', component: DetailArticleComponent },

      { path: 'listClient', component: ListClientComponent },
      { path: 'client/edit/:id', component: AddclientComponent },
      { path: 'addClient', component: AddclientComponent },
      { path: 'detailClient/:id', component: DetailClientComponent },

      { path: 'listeUniteMesure', component: ListeUniteMesureComponent },
      { path: 'uniteMesure/edit/:id', component: UniteMesureComponent },
      { path: 'addUniteMesure', component: UniteMesureComponent },

      { path: 'listeSortie', component: ListingVenteComponent },
      { path: 'sortie/edit/:id', component: CreateSortieComponent },
      { path: 'addSortie', component: CreateSortieComponent },
      { path: 'detailSortie/:id', component: DetailSortieComponent },
      { path: 'report', component: GallerieSortiesComponent },
      { path: 'report/:id', component: GallerieSortiesComponent },

      { path: 'pointProduitsVendus', component: PointDesVentesComponent },

      { path: 'listeMarchandise', component: ListMarchandiseComponent },
      { path: 'marchandise/edit/:id', component: MarchandiseComponent },
      { path: 'condVente/c/:id', component: CondVenteComponent },
      { path: 'addMarchandise', component: MarchandiseComponent },
      { path: 'detailMarchandise/:id', component: DetailMarchandiseComponent },

      { path: 'listeEntree', component: ListEntreeComponent },
      { path: 'editEntree/edit/:id', component: AddEntreeComponent },
      { path: 'addEntree', component: AddEntreeComponent },
      { path: 'detailEntree/:id', component: DetailEntreeComponent },

      { path: 'listeSorties', component: ListingVenteComponent },
      { path: 'sorties/edit/:id', component: AddSortieComponent },
      { path: 'addSorties', component: AddSortieComponent },
      { path: 'detailSorties/:id', component: DetailSortieComponent },

      { path: 'listeInventaires', component: ListInventaireComponent },
      { path: 'inventaires/edit/:id', component: AddInventaireComponent },
      { path: 'addSorties', component: AddInventaireComponent },
      { path: 'detailSorties/:id', component: DetailInventaireComponent },
      { path: 'listeFicheStock/:id', component: FicheStockComponent },

      {
        path: 'listeConditionnementvent',
        component: ListeConditionnementventComponent,
      },
      {
        path: 'conditionnementvent/edit/:id',
        component: AddConditionnementventComponent,
      },
      {
        path: 'addConditionnementvent',
        component: AddConditionnementventComponent,
      },
      {
        path: 'detailConditionnementvent/:id',
        component: DetailConditionnementventComponent,
      },

      { path: 'listeCommandeFournisseur', component: ListEntreeComponent },
      { path: 'commandeFournisseur/edit/:id', component: AddEntreeComponent },
      { path: 'receptio/r/:id', component: ReceptionComponent },
      { path: 'reglement/f/:id', component: ReglementFactureComponent },
      { path: 'addCommandeFournisseur', component: AddEntreeComponent },
      {
        path: 'detailCommandeFournisseur/:id',
        component: DetailEntreeComponent,
      },

      { path: 'listeStock', component: ListStockComponent },
      { path: 'listeReceptionStock', component: ListeReceptionComponent },
      { path: 'reception/edit/:id', component: UpdateReceptionComponent },
      { path: 'addReception', component: CreateReceptionComponent },
      { path: 'detailReception/:id', component: DetailReceptionComponent },

      { path: 'index', component: IndexComponent },

      { path: 'pointParSite', component: PointParSiteComponent },
      { path: 'pointParArticle', component: PointParArticleComponent },
      { path: 'pointGlobal', component: PointGlobalComponent },
    ],
  },
  /*     {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard],
    children: [
      { path:  'index', component: IndexComponent },
    ],
  }, */

  { path: 'login', component: LoginUtilisareurComponent },
  { path: 'register', component: CreerUtilisateurComponent },
  // { path: 'user', component: UserComponent },

  //{ path: '',   redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  //imports: [RouterModule.forRoot(routes, { userHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
  isAdmin = false;
  isUser = false;
  role: any;
  constructor(public utilisateurService: UtilisateurService) {
    let roles = localStorage.getItem('user_roles');
    this.role = roles;
  }

  ngOnInit() {
    if (
      this.role == 'ROLE_SUPER_ADMIN' ||
      this.role == 'ROLE_PDG' ||
      this.role == 'ROLE_ADMIN'
    ) {
      this.isAdmin = true;
    }

    if (this.role == 'ROLE_CAISSE' || this.role == 'ROLE_GERANT') {
      this.isUser = true;
    }
  }
}

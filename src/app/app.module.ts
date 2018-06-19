import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { PageContentComponent } from './page-content/page-content.component';
import { FormsModule } from '@angular/forms';
import { AttributeSelectorComponent } from './product-management/attribute-selector/attribute-selector.component';
import { CategoriesSelectorComponent } from './product-management/categories-selector/categories-selector.component';
import { CategoryManagementComponent } from './product-management/category-management/category-management.component';
import { LanguageSwitcherComponent } from './header/language-switcher/language-switcher.component';
import { TranslatedInputComponent } from './product-management/translated-input/translated-input.component';
import { StructureManagementComponent } from './product-management/structure-management/structure-management.component';
import { AttributeManagementComponent } from './product-management/attribute-management/attribute-management.component';
import { AttributeValueComponent } from './product-management/attribute-management/attribute-value/attribute-value.component';
import { LanguageManagementComponent } from './product-management/language-management/language-management.component';
import { CurrencyManagementComponent } from './product-management/currency-management/currency-management.component';
import {Routes, RouterModule} from '@angular/router';
import { ModalDirective } from './modal.directive';
import {ProductManagementComponent} from './product-management/product-management.component';

const routes: Routes = [
    {path: 'catalog', component: CatalogComponent},
    {path: 'product/:id', component: ProductComponent},
    {path: 'admin', component: StructureManagementComponent, children: [
        {path: '', component: ProductManagementComponent},
        {path: 'categories', component: CategoryManagementComponent},
        {path: 'attributes', component: AttributeManagementComponent},
        {path: 'languages', component: LanguageManagementComponent},
        {path: 'currencies', component: CurrencyManagementComponent}
    ]},
  ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    CatalogComponent,
    CategoryListComponent,
    PageContentComponent,
    ProductManagementComponent,
    AttributeSelectorComponent,
    CategoriesSelectorComponent,
    CategoryManagementComponent,
    LanguageSwitcherComponent,
    TranslatedInputComponent,
    StructureManagementComponent,
    AttributeManagementComponent,
    AttributeValueComponent,
    LanguageManagementComponent,
    CurrencyManagementComponent,
    ModalDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

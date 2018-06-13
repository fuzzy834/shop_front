import {
  ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {UploadImage} from '../../model/image';
import {Product} from '../../model/product';
import {Category} from '../../model/category';
import {Attribute} from '../../model/attribute';
import {AttributeSelectorComponent} from './attribute-selector/attribute-selector.component';
import {LanguageService} from '../language.service';
import {Language} from '../../model/language';
import {ActivatedRoute, Params, RouterModule} from '@angular/router';
import {AttributeService} from '../attribute.service';
import {CategoryService} from '../category.service';
import {ProductService} from '../product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
  entryComponents: [AttributeSelectorComponent]
})
export class ProductManagementComponent implements OnInit, OnDestroy {

  languages: Language[];
  lang: Language;
  attributeRef: ComponentRef<AttributeSelectorComponent>;
  categories: Category[];
  attributes: Attribute[];
  productAttributeSelected = false;

  @ViewChild('attributeContainer', {read: ViewContainerRef}) attribute: ViewContainerRef;

  product: Product = new Product();
  imagesToUpload: UploadImage[] = [];

  subscriptions: Subscription[] = [];

  constructor(private sanitization: DomSanitizer,
              private resolver: ComponentFactoryResolver,
              private languageService: LanguageService,
              private attributeService: AttributeService,
              private categoryService: CategoryService,
              private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.categories = this.categoryService.categories;
    this.attributes = this.attributeService.attributes;
    this.languages = this.languageService.languages;
    const langSubscription = this.languageService.lang.subscribe(lang => this.lang = lang);
    const routeSubscription = this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.product = this.productService.getProductById(params['id']);
      }
    });
    this.subscriptions.push(langSubscription, routeSubscription);
    console.log(this.product.attributes.length);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  setFiles(event) {
    const files: FileList = event.target.files;
    Array.from(files).forEach(file =>
      this.imagesToUpload
        .push(
          new UploadImage(
            this.sanitizeFileUrl(file),
            file
          )
        )
    );
  }

  removeImage(index: number) {
    this.imagesToUpload.splice(index, 1);
  }

  addAttribute(attributes: Attribute[]) {
    this.attribute.clear();
    const factory = this.resolver.resolveComponentFactory(AttributeSelectorComponent);
    const newAttribute = this.attribute.createComponent(factory);
    newAttribute.instance.attributes = attributes;
    newAttribute.instance.parent = this;
    const newAttributeSubscription = newAttribute.instance.attributeRef
      .subscribe(selected => this.productAttributeSelected = selected);
    newAttribute.onDestroy(() => {
      newAttributeSubscription.unsubscribe();
    });
    this.attributeRef = newAttribute;
    return newAttribute;
  }

  addProductAttribute() {
    this.attribute.clear();
    this.product.attributes.push(this.attributeRef.instance.productAttribute);
    console.log(this.product.attributes);
  }

  deleteAttribute(id: string) {
    const indexPa = this.product.attributes.findIndex(pa => pa.id === id);
    if (indexPa !== -1) {
      this.product.attributes.splice(indexPa, 1);
    }
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitization.bypassSecurityTrustUrl(url);
  }

  createTempUrl(file: File): string {
    return window.URL.createObjectURL(file);
  }

  sanitizeFileUrl(file: File): SafeUrl {
    return this.sanitizeUrl(this.createTempUrl(file));
  }

  assignCategory(category: Category) {
    this.product.category = category;
  }

  onCategoryPresent() {
    if (this.product.category !== undefined) {
      return this.product.category.id;
    }
  }

  getSimpleProduct() {
    const data = {};
    for (const prop in this.product.i18n) {
      if (this.product.i18n.hasOwnProperty(prop)) {
        data[prop] = this.product.i18n[prop];
      }
    }
    data['discount'] = this.product.discount;
    data['bulkPrice'] = this.product.bulkPrice;
    data['retailPrice'] = this.product.retailPrice;
    data['category'] = this.product.category.id;
    const attributes = data['attributes'] = [];
    for (const attribute of this.product.attributes) {
      attributes[attribute.id] = attribute.valueId;
    }
    return data;
  }

  submitProduct() {
    console.log(this.product.attributes);
  }
}

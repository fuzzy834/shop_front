import {
  AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, Input, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {UploadImage} from '../../model/image';
import {Product} from '../../model/product';
import {Category} from '../../model/category';
import {Attribute} from '../../model/attribute';
import {AttributeSelectorComponent} from './attribute-selector/attribute-selector.component';
import {ProductAttribute} from '../../model/product.attribute';
import {LanguageService} from '../language.service';
import {Language} from '../../model/language';
import {RouterModule} from '@angular/router';
import {AttributeService} from '../attribute.service';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
  entryComponents: [AttributeSelectorComponent]
})
export class ProductManagementComponent implements OnInit {

  languages: Language[];
  lang: Language;

  attributeCount = 0;
  attributeRefs: any[] = [];

  categories: Category[];
  attributes: Attribute[];

  @ViewChild('attributeContainer', {read: ViewContainerRef}) attribute: ViewContainerRef;

  product: Product = new Product();
  imagesToUpload: UploadImage[] = [];

  constructor(private sanitization: DomSanitizer,
              private resolver: ComponentFactoryResolver,
              private languageService: LanguageService,
              private attributeService: AttributeService,
              private categoryService: CategoryService) {
    this.categories = categoryService.categories;
    this.attributes = attributeService.attributes;
    this.languages = languageService.languages;
    languageService.lang.subscribe(lang => this.lang = lang);
  }

  ngOnInit() {
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
    const factory = this.resolver.resolveComponentFactory(AttributeSelectorComponent);
    const newAttribute = this.attribute.createComponent(factory);
    newAttribute.instance.attributes = attributes;
    newAttribute.instance.parent = this;
    newAttribute.instance.id = this.attributeCount;
    newAttribute.instance.attributeToDelete.subscribe(pointer => this.deleteAttribute(pointer.id, pointer.index));
    newAttribute.instance.attributeRef.subscribe(pa => this.addProductAttribute(pa));
    this.attributeRefs.push(newAttribute);
    this.attributeCount++;
  }

  addProductAttribute(productAttribute: ProductAttribute) {
    if (this.product.attributes === undefined) {
      this.product.attributes = [];
    }
    const index = this.product.attributes.findIndex(pa => pa.id === productAttribute.id);
    if (index !== -1) {
      this.product.attributes.splice(index, 1);
    }
    this.product.attributes.push(productAttribute);
  }

  deleteAttribute(id: string, index: number) {
    this.attributeRefs[index].destroy();
    this.attributeRefs.splice(index, 1);
    if (this.product.attributes !== undefined) {
      const indexPa = this.product.attributes.findIndex(pa => pa.id === id);
      if (indexPa !== -1) {
        this.product.attributes.splice(indexPa, 1);
      }
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
      attributes[attribute.id] = attribute.value;
    }
    return data;
  }

  submitProduct() {
    console.log(this.getSimpleProduct());
  }
}

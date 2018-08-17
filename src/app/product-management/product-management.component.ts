import {
  ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild,
  ViewContainerRef, EventEmitter
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
import {FormControl, FormGroup, NgForm, Validators, FormArray} from '@angular/forms';
import {ProductAttribute} from '../../model/product.attribute';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
  entryComponents: [AttributeSelectorComponent]
})
export class ProductManagementComponent implements OnInit, OnDestroy {

  product: Product = new Product();
  productForm = new FormGroup({});

  subscriptions: Subscription[] = [];
  languages: Language[];
  lang: Language;

  attributeRef: ComponentRef<AttributeSelectorComponent>;
  assignableCategories: Category[];
  attributes: Attribute[];
  imagesToUpload: UploadImage[] = [];

  productAttributeSelected: EventEmitter<ProductAttribute> = new EventEmitter<ProductAttribute>();

  @ViewChild('attributeContainer', {read: ViewContainerRef}) attribute: ViewContainerRef;

  constructor(private sanitization: DomSanitizer,
              private resolver: ComponentFactoryResolver,
              private languageService: LanguageService,
              private attributeService: AttributeService,
              private categoryService: CategoryService,
              private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.assignableCategories = this.categoryService.flatCategories.filter(category => category.children.length === 0);
    this.attributes = this.attributeService.attributes;
    this.languages = this.languageService.languages;
    const langSubscription = this.languageService.lang.subscribe(lang => this.lang = lang);
    const routeSubscription = this.route.queryParams.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.product = this.productService.getProductById(params['id']);
      }
    });
    this.subscriptions.push(langSubscription, routeSubscription);

    const discountControl = new FormControl(null, [Validators.min(0), Validators.max(100)]);
    discountControl.setValue(this.product.discount);
    this.productForm.addControl('discount', discountControl);

    const retailPriceControl = new FormControl(null, [Validators.required, Validators.min(0)]);
    retailPriceControl.setValue(this.product.retailPrice);
    this.productForm.addControl('retailPrice', retailPriceControl);

    const bulkPriceControl = new FormControl(null, [Validators.required, Validators.min(0)]);
    bulkPriceControl.setValue(this.product.bulkPrice);
    this.productForm.addControl('bulkPrice', bulkPriceControl);

    const videoUrlControl = new FormControl();
    this.productForm.addControl('videoUrl', videoUrlControl);

    const categoryControl = new FormControl(null, [Validators.required]);
    categoryControl.setValue(this.product.category);
    this.productForm.addControl('category', categoryControl);

    if (this.product.attributes === undefined) {
      this.product.attributes = [];
    }

    const attributesArray = new FormArray([], [Validators.required]);
    this.product.attributes.forEach(attribute => {
      const attributeControl = new FormControl();
      attributeControl.setValue(attribute);
      attributesArray.push(attributeControl);
    });
    this.productForm.addControl('attributes', attributesArray);

    const filesArray = new FormArray([], [Validators.required]);
    this.productForm.addControl('files', filesArray);
    if (this.product.images !== undefined) {
      this.product.images.forEach(image => {
        const fileControl: FormControl = new FormControl();
        fileControl.setValue(image);
        filesArray.push(fileControl);
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  setFiles(event) {
    const files: FileList = event.target.files;
    const filesArray: FormArray = <FormArray> this.productForm.get('files');
    Array.from(files).forEach(file => {
      const uploadImage = new UploadImage(this.sanitizeFileUrl(file), file);
      const fileControl = new FormControl();
      fileControl.setValue(uploadImage);
      filesArray.push(fileControl);
    });

  }

  removeImage(index: number) {
    const filesArray: FormArray = <FormArray> this.productForm.get('files');
    filesArray.removeAt(index);
  }

  bytesToSize(bytes: number): string {
    const sizes: string[] = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return '0 B';
    }
    const i: number = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  getProductAttributes() {
    const attributesArray: FormArray = <FormArray> this.productForm.get('attributes');
    return attributesArray.controls.map(control => {
      return control.value;
    });
  }

  getProductImages() {
    const images: FormArray = <FormArray> this.productForm.get('files');
    return images.controls.map(control => control.value);
  }

  emitAttribute(attribute: ProductAttribute) {
    console.log(attribute);
    this.productAttributeSelected.emit(attribute);
    this.attribute.clear();
    const factory = this.resolver.resolveComponentFactory(AttributeSelectorComponent);
    const newAttribute = this.attribute.createComponent(factory);
    newAttribute.instance.attributes = this.attributes;
    newAttribute.instance.parent = this;
    newAttribute.instance.getAttrValues(attribute);
    this.attributeRef = newAttribute;
    return newAttribute;
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

  assignCategory() {
    const category: Category = this.productForm.get('category').value;
    let attributes = [];
    attributes.push(...category.attributes);
    let parent: Category = category.parent;
    while (parent !== undefined && parent !== null) {
      attributes.push(...parent.attributes);
      parent = parent.parent;
    }
    attributes = attributes.filter(a => a !== undefined)
      .map(a => new ProductAttribute(a.id, a.priority, a.name));
    const attributesArray: FormArray = <FormArray> this.productForm.get('attributes');
    attributesArray.setValue([]);
    attributes.forEach(attribute => {
      const attributeControl = new FormControl();
      attributeControl.setValue(attribute);
      attributesArray.push(attributeControl);
    });
  }

  onCategoryPresent() {
    if (this.product.category !== undefined) {
      return this.product.category.id;
    }
  }

  getProductDto() {
    const data = {
      productId: this.product.id,
      productBase: {

      }
    };
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
      attributes[attribute.id] = attribute.values;
    }
    return data;
  }

  submitProduct() {
    console.log(this.productForm);
  }
}

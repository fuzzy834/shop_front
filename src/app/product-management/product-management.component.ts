import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {UploadImage} from '../../model/image';
import {Product} from '../../model/product';
import {Category} from '../../model/category';
import {Attribute} from '../../model/attribute';
import {AttributeSelectorComponent} from './attribute-selector/attribute-selector.component';
import {ProductAttribute} from '../../model/product.attribute';

declare var $: any;

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
  entryComponents: [AttributeSelectorComponent]
})
export class ProductManagementComponent implements OnInit {

  attributeCount = 0;
  attributeRefs: any[] = [];

  @Input() categories: Category[];
  @Input() attributes: Attribute[];

  @ViewChild('attributeContainer', {read: ViewContainerRef}) attribute: ViewContainerRef;

  product: Product = new Product();
  imagesToUpload: UploadImage[] = [];

  constructor(private sanitization: DomSanitizer, private resolver: ComponentFactoryResolver) {
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

  private addProductAttribute(productAttribute: ProductAttribute) {
    if (this.product.attributes === undefined) {
      this.product.attributes = [];
    }
    const index = this.product.attributes.findIndex(pa => pa.id === productAttribute.id);
    if (index !== -1) {
      this.product.attributes.splice(index, 1);
    }
    this.product.attributes.push(productAttribute);
  }

  private deleteAttribute(id: string, index: number) {
    this.attributeRefs[index].destroy();
    this.attributeRefs.splice(index, 1);
    if (this.product.attributes !== undefined) {
      const indexPa = this.product.attributes.findIndex(pa => pa.id === id);
      if (indexPa !== -1) {
        this.product.attributes.splice(indexPa, 1);
      }
    }
  }

  private sanitizeUrl(url: string): SafeUrl {
    return this.sanitization.bypassSecurityTrustUrl(url);
  }

  private createTempUrl(file: File): string {
    return window.URL.createObjectURL(file);
  }

  private sanitizeFileUrl(file: File): SafeUrl {
    return this.sanitizeUrl(this.createTempUrl(file));
  }

  private assignCategory(category: Category) {
    this.product.category = category;
  }
}

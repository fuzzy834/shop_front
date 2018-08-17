import {Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Attribute} from '../../../model/attribute';
import {ProductManagementComponent} from '../product-management.component';
import {ProductAttribute} from '../../../model/product.attribute';
import {Value} from '../../../model/value';

@Component({
  selector: 'app-attribute-selector',
  templateUrl: './attribute-selector.component.html',
  styleUrls: ['./attribute-selector.component.css']
})
export class AttributeSelectorComponent implements OnInit {

  productAttribute: ProductAttribute;
  parent: ProductManagementComponent;
  attributes: Attribute[];
  hideValues = true;

  // @Output() attributeRef = new EventEmitter<boolean>();
  // @Output() attributeToDelete = new EventEmitter<{ id: string, index: number }>();

  @ViewChild('attributeName') attribute: ElementRef<HTMLSelectElement>;
  @ViewChild('attributeValue') value: ElementRef<HTMLSelectElement>;

  constructor() {
  }

  ngOnInit() {
  }

  getAttrValues(productAttribute: ProductAttribute) {
    console.log('called');
    this.productAttribute = productAttribute;
    console.log(productAttribute);
    this.value.nativeElement.options.length = 0;
    const attr = this.attributes.find(attribute => attribute.id === productAttribute.id);
    if (attr !== undefined) {
      const values = attr.values;
      values.forEach(val => {
        const option = document.createElement('option');
        option.value = val.id;
        option.text = val.value;
        this.value.nativeElement.add(option);
      });
      this.hideValues = false;
    } else {
      this.hideValues = true;
      // this.attributeRef.emit(false);
    }
  }

  onAttributeValueSelected(valueId: string) {
    if (valueId !== '') {
      const attribute: Attribute = this.attributes.find(a => a.id === this.productAttribute.id);
      const value: Value = attribute.values.find(v => v.id === valueId);
      this.productAttribute.id = attribute.id;
      this.productAttribute.name = attribute.name;
      this.productAttribute.priority = attribute.priority;
      if (this.productAttribute.values === undefined) {
        this.productAttribute.values = [];
      }
      if (this.productAttribute.values.findIndex(v => v.id === value.id) === -1) {
        this.productAttribute.values.push({id: value.id, name: value.value});
        // this.attributeRef.emit(true);
      }
    }
  }

  isPresent(attribute: Attribute) {
    const index = this.parent.product.attributes.findIndex(attr => attr.id === attribute.id);
    return index !== -1;
  }

  deleteValue(id: string) {
    const index = this.productAttribute.values.findIndex(v => v.id === id);
    this.productAttribute.values.splice(index, 1);
  }
}

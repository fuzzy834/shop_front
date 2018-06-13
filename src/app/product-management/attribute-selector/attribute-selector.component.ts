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

  productAttribute: ProductAttribute = new ProductAttribute();
  parent: ProductManagementComponent;
  attributes: Attribute[];
  hideValues = true;

  @Output() attributeRef = new EventEmitter<boolean>();
  @Output() attributeToDelete = new EventEmitter<{ id: string, index: number }>();

  @Input() attributeId: string;
  @Input() valueId: string;

  @ViewChild('attributeName') attribute: ElementRef<HTMLSelectElement>;
  @ViewChild('attributeValue') value: ElementRef<HTMLSelectElement>;

  constructor() {
  }

  ngOnInit() {
  }

  getAttrValues(id: string, value: HTMLSelectElement) {
    value.options.length = 0;
    const attr = this.attributes.find(attribute => attribute.id === id);
    if (attr !== undefined) {
      const values = attr.values;
      this.onAttributeValueSelected(id, values[0].id);
      values.forEach(val => {
        const option = document.createElement('option');
        option.value = val.id;
        option.text = val.value;
        value.add(option);
      });
      this.hideValues = false;
    } else {
      this.hideValues = true;
      this.attributeRef.emit(false);
    }
  }

  onAttributeValueSelected(id: string, valueId: string) {
    if (valueId !== '') {
      const attribute: Attribute = this.attributes.find(a => a.id === id);
      const value: Value = attribute.values.find(v => v.id === valueId);
      this.productAttribute.id = attribute.id;
      this.productAttribute.name = attribute.name;
      this.productAttribute.priority = attribute.priority;
      this.productAttribute.value = value.value;
      this.productAttribute.valueId = value.id;
      this.attributeRef.emit(true);
    }
  }

  isPresent(attribute: Attribute) {
    const index = this.parent.product.attributes.findIndex(attr => attr.id === attribute.id);
    return index !== -1;
  }
}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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

  id: number;
  parent: ProductManagementComponent;
  attributes: Attribute[];

  @Output() attributeRef = new EventEmitter<ProductAttribute>();

  @Output() attributeToDelete = new EventEmitter<{id: string, index: number}>();

  constructor() {
  }

  ngOnInit() {
  }

  getAttrValues(id: string, value: HTMLSelectElement) {
    value.selectedIndex = 0;
    value.options.length = 0;
    const attr = this.attributes.find(attribute => attribute.id === id);
    if (!(attr === undefined)) {
      const values = attr.values;
      const emptyOption = document.createElement('option');
      value.add(emptyOption);
      values.forEach(val => {
        const option = document.createElement('option');
        option.value = val.id;
        option.text = val.value;
        value.add(option);
      });
    }
  }

  onAttributeValueSelected(id: string, valueId: string) {
    const attribute: Attribute = this.attributes.find(a => a.id === id);
    const value: Value = attribute.values.find(v => v.id === valueId);
    const productAttribute = new ProductAttribute(id, attribute.priority, attribute.name, value.id);
    this.attributeRef.emit(productAttribute);
  }

  onDeleteAttribute(id: string) {
    const index = this.parent.attributeRefs.findIndex(ref => ref.instance.id === this.id);
    this.attributeToDelete.emit({id: id, index: index});
  }
}

import {
  Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Value} from '../../../../model/value';
import {TranslatedInputComponent} from '../../translated-input/translated-input.component';
import {Attribute} from '../../../../model/attribute';

@Component({
  selector: 'app-attribute-value',
  templateUrl: './attribute-value.component.html',
  styleUrls: ['./attribute-value.component.css'],
  entryComponents: [TranslatedInputComponent]
})
export class AttributeValueComponent implements OnInit {

  valueRef: ComponentRef<TranslatedInputComponent>;

  @Output() valueEmitter = new EventEmitter<Value>();

  @Input() attribute: Attribute;

  @ViewChild('valueContainer', {read: ViewContainerRef}) input: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.addNewValue();
  }

  addNewValue() {
    if (this.valueRef !== undefined) {
      this.valueEmitter.emit(<Value> this.valueRef.instance.obj);
    }
    this.input.clear();
    const factory = this.resolver.resolveComponentFactory(TranslatedInputComponent);
    const newValue = this.input.createComponent(factory);
    newValue.instance.obj = new Value();
    newValue.instance.name = 'value';
    newValue.instance.title = 'Значення';
    newValue.instance.textarea = false;
    this.valueRef = newValue;
  }

  editValue(value: Value) {
    this.input.clear();
    const factory = this.resolver.resolveComponentFactory(TranslatedInputComponent);
    const newValue = this.input.createComponent(factory);
    newValue.instance.obj = value;
    newValue.instance.name = 'value';
    newValue.instance.title = 'Значення';
    newValue.instance.textarea = false;
    this.valueRef = newValue;
  }

  confirmEdit() {
    this.valueRef.instance.obj = new Value();
  }

  discardEdit(editedValue) {
    console.log(editedValue);
    this.valueRef.instance.obj.i18n['value'] = editedValue;
    this.valueRef.instance.obj = new Value();
  }
}

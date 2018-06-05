import {Component, OnInit, Output, EventEmitter,
        ViewChild, ComponentRef, ViewContainerRef,
        ComponentFactoryResolver, Input} from '@angular/core';
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

  isDisabled() {
    return !this.valueRef.instance.obj.i18n.hasOwnProperty('value');
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
}

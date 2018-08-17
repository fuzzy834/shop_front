import {
  Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Value} from '../../../../model/value';
import {TranslatedInputComponent} from '../../translated-input/translated-input.component';
import {Attribute} from '../../../../model/attribute';
import {FormGroup, FormControl} from '@angular/forms';
import {LanguageService} from '../../../language.service';

@Component({
  selector: 'app-attribute-value',
  templateUrl: './attribute-value.component.html',
  styleUrls: ['./attribute-value.component.css'],
  entryComponents: [TranslatedInputComponent]
})
export class AttributeValueComponent implements OnInit {

  valueForm: FormGroup;
  valueForms = [];
  valueRef: ComponentRef<TranslatedInputComponent>;
  editing = false;

  @Output() valueEmitter = new EventEmitter<Value>();

  @Input() attribute: Attribute;

  @ViewChild('valueContainer', {read: ViewContainerRef}) input: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver, private languageService: LanguageService) {
  }

  ngOnInit() {
    this.addNewValue();
  }

  addNewValue() {
    if (this.valueRef !== undefined && this.valueForm.valid) {
      this.valueEmitter.emit(<Value> this.valueRef.instance.obj);
      this.valueForms.push({value: this.valueRef.instance.obj, form: this.valueRef.instance.parentForm});
    }
    this.input.clear();
    const factory = this.resolver.resolveComponentFactory(TranslatedInputComponent);
    const newValue = this.input.createComponent(factory);
    this.valueForm = newValue.instance.parentForm = new FormGroup({});
    newValue.instance.name = 'value';
    newValue.instance.title = 'Значення';
    newValue.instance.textarea = false;
    newValue.instance.obj = new Value();
    this.valueRef = newValue;
  }

  editValue(value: Value) {
    this.editing = true;
    this.input.clear();
    let formValuePair = this.valueForms.find(vf => vf.value === value);
    let form;
    if (formValuePair === undefined) {
      form = new FormGroup({});
      formValuePair = {value : value, form: form};
      this.valueForms.push(formValuePair);
    } else {
      form = formValuePair.form;
    }
    const factory = this.resolver.resolveComponentFactory(TranslatedInputComponent);
    const newValue = this.input.createComponent(factory);
    newValue.instance.parentForm = form;
    newValue.instance.obj = value;
    newValue.instance.name = 'value';
    newValue.instance.title = 'Значення';
    newValue.instance.textarea = false;
    this.valueRef = newValue;
  }

  confirmEdit() {
    this.addNewValue();
    this.editing = false;
  }

  discardEdit(editedValue) {
    const resetObj = {};
    this.valueRef.instance.obj.i18n['value'] = editedValue;
    this.valueRef.instance.languages.forEach(lang => resetObj['value-' + lang.code] = editedValue[lang.code]);
    this.valueRef.instance.parentForm.reset(resetObj);
    this.addNewValue();
    this.editing = false;
  }
}

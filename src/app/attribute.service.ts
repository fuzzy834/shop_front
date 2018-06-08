import {Injectable} from '@angular/core';
import {Attribute} from '../model/attribute';
import {Value} from '../model/value';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  attributes: Attribute[] = [];

  constructor() {
    const v1: Value = new Value('1', 'value1');
    const v2: Value = new Value('2', 'value2');
    const v3: Value = new Value('3', 'value3');
    const v4: Value = new Value('4', 'value4');
    const v5: Value = new Value('5', 'value5');

    const values: Value[] = [v1, v2, v3, v4, v5];

    const a1 = new Attribute('1', 'attribute1', 1, values);
    const a2 = new Attribute('2', 'attribute2', 2, values);
    const a3 = new Attribute('3', 'attribute3', 3, values);
    const a4 = new Attribute('4', 'attribute4', 4, values);
    const a5 = new Attribute('5', 'attribute5', 5, values);

    this.attributes.push(...[a1, a2, a3, a4, a5]);
  }
}

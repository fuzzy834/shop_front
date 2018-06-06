import 'reflect-metadata';

function addMeta(target: Object, metaKey: string, metaValue: string | symbol) {
  const val: (string | symbol)[] = [metaValue];
  if (Reflect.hasMetadata(metaKey, target)) {
    const meta: (string | symbol)[] = Reflect.getMetadata(metaKey, target);
    meta.forEach(data => val.push(data));
  }
  Reflect.defineMetadata(metaKey, val, target);
}

function getMeta(key: string, target: Object): any[] {
  if (Reflect.hasMetadata(key, target)) {
    return Reflect.getMetadata(key, target);
  }
  return [];
}

/*
 * @Translated decorator
 */
export function Translated(target: Object, propertyKey: string | symbol) {
  addMeta(target.constructor, 'translatedFields', propertyKey);
}

/*
 * @Translated helper method
 */
export function getTranslatedFields(target: Object): any[] {
  return getMeta('translatedFields', target);
}

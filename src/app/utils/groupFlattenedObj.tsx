import flattenObj from './flattenObj';
import {isPlainObject} from './';

export default function groupFlattenedObj(obj) {
    if (Array.isArray(obj)) {
        const newObj = obj.map(item => {
            const flatObjItem = flattenObj(item);
            return flatObjItem;
        });
        return newObj;
    } else if (isPlainObject(obj)) {
        const newObj = Object.entries(obj).map(item => {
            const flatObjItem = flattenObj(item[1]);
            return flatObjItem;
        });
        return newObj;
    }
}

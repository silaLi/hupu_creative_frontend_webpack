import './app';
import { prefixerCss, version as prefixerCssVersion } from '../lib/prefixerCss';
import { version as CreateIdVersion, CreateId } from '../lib/CreateId';

console.log('prefixerCss version: ', prefixerCssVersion);
console.log('CreateId version: ', CreateIdVersion);

let a = prefixerCss('transform', 'translate(-50%)');
console.log(a)
console.log("i'm testing")
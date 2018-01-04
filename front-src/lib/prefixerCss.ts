export let version = '0.0.1';
import * as _ from 'lodash';

let style_transition = '-webkit-transition: @{{value}};\
                                 -moz-transition: @{{value}};\
                                 -mos-transition: @{{value}};\
                                  -ms-transition: @{{value}};\
                                   -o-transition: @{{value}};\
                                      transition: @{{value}};';

let transition_duration = '-webkit-transition-duration: @{{value}};\
                        -moz-transition-duration: @{{value}};\
                        -mos-transition-duration: @{{value}};\
                         -ms-transition-duration: @{{value}};\
                          -o-transition-duration: @{{value}};\
                             transition-duration: @{{value}};';

let style_transform = '-webkit-transform: @{{value}};\
                    -moz-transform: @{{value}};\
                    -mos-transform: @{{value}};\
                     -ms-transform: @{{value}};\
                      -o-transform: @{{value}};\
                         transform: @{{value}};';
let styles = [{
  'key': 'transition',
  'value': style_transition
}, {
  'key': 'transition-duration',
  'value': transition_duration
}, {
  'key': 'transform',
  'value': style_transform
}]
export function prefixerCss(cssName: string, value: string): string {
  let cssIndex = _.findIndex(styles, el => el.key == cssName);
  return styles[cssIndex].value.replace(/\s/g, '').replace(/@\{\{value\}\}/g, value);
}

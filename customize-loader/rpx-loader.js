// @function r($rem) {
//   @return $rem / 640 * 3.2 * 1rem;
// }

module.exports = function(source) {
  const {psd: psdQuery, unit: unitQuery} = this.query;
  source = source.replace(new RegExp(`(\\d+)(${unitQuery})`), function(value, num, unit){
    return num / psdQuery * 3.2 + "rem";
  })
  return source;
};
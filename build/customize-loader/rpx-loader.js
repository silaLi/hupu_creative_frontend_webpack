// @function r($rem) {
//   @return $rem / 640 * 3.2 * 1rem;
// }
let defaultOptions = {
  psdQuery: 750,
  unitQuery: "rpx",
  numFixed: 5,
}
let options = {...defaultOptions, ...this.query};
module.exports = function(source) {
  this.cacheable(true);
  let {psdQuery, unitQuery, numFixed} = options;
  source = source.replace(new RegExp(`(\\d+)(${unitQuery})`, "g"), function(value, num, unit){
    let r = num / psdQuery * 3.2;
    return r.toFixed(numFixed) + "rem";
  })
  return source;
};
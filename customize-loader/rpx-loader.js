// @function r($rem) {
//   @return $rem / 640 * 3.2 * 1rem;
// }
let defaultOptions = {
  psdQuery: 750,
  unitQuery: "rpx",
  numFixed: 5,
}
module.exports = function(source) {
  let options = {...defaultOptions, ...this.query};
  let {psdQuery, unitQuery, numFixed} = options;
  source = source.replace(new RegExp(`(\\d+)(${unitQuery})`, "g"), function(value, num, unit){
    let r = num / psdQuery * 3.2;
    return r.toFixed(5) + "rem";
  })
  return source;
};
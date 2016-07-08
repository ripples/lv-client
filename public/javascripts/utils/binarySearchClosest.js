/**
 * Binary searches list for closest number
 * {@link http://stackoverflow.com/a/8584940}
 * @param {Number} num - number to fine
 * @param {Array<String>|Array<Number>} arr - list to search through
 * @return {String|Number} - returns closest match
 */
export default function binarySearch(num, arr) {
  let mid;
  let lo = 0;
  let hi = arr.length - 1;
  while (hi - lo > 1) {
    mid = Math.floor((lo + hi) / 2);
    if (Number(arr[mid]) < num) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  if (num - Number(arr[lo]) <= Number(arr[hi]) - num) {
    return arr[lo];
  }
  return arr[hi];
}
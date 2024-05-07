const sort = (str) => {
  const arr = str.split('')
  const sort = (arr, reverse = false, ignoreLast = false) => {
    arr.sort()
    if (reverse) arr.reverse()
    return arr.reduce((res, cur, i) => {
      if (!res.includes(cur) || (ignoreLast && !arr[i+1])) {
        res.push(cur)
        delete arr[i]
      }
      return res
    }, [])
  }
  const result = [sort(arr), sort(arr, true), sort(arr, false, true)]
  console.log(result)
  return result.flat().join('')
}

// -> abccbaabc
console.log(sort('aaabbbccc'))
// -> acefinn
console.log(sort('finance'))
// -> xyzzyx
console.log(sort('xxyyzz'))
// -> ijkjiij
console.log(sort('ijijkij'))
console.log(sort('aaaabbc'))
console.log(sort('aaaaaabbbdddeee'))

// Interview Case
const sort = (str) => {
  const arr = str.split('')
  const sort = (arr, reverse = false) => {
    arr.sort()
    if (reverse) arr.reverse()
    return arr.reduce((res, cur, i) => {
      if (!res.includes(cur) || !arr[i+1]) {
        res.push(cur)
        delete arr[i]
      }
      return res
    }, [])
  }
  const result = [sort(arr), sort(arr, true), sort(arr)]
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

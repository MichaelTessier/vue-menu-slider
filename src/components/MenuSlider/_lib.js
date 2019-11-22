export const getIndex = function (array, item) {
  if (!array || !item || typeof array !== 'object') return false
  return Object.values(array).indexOf(item)
}

export const getPrevItem = function (array, scrollLeft, offsetLeft) {
  return Object.values(array).reverse().find((item) => {
    return (item.offsetLeft) < (offsetLeft + scrollLeft)
  })
}

export const getNextItem = function (array, offsetRight) {
  return Object.values(array).find((item) => {
    return item.getBoundingClientRect().right > offsetRight
  })
}

export const removeClass = function (array, className) {
  Object.values(array).forEach(child => {
    child.children[0].classList.remove(className)
  })
}

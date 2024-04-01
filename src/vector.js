class Vector extends Array {
  add(other) {
    return this.map((element, index) => element + other[index])
  }

  sub(other) {
    return this.map((element, index) => element - other[index])
  }

  dot(other) {
    return this.map((element, index) => element * other[index])
      .reduce((sum, currentVal) => {
        return sum + currentVal
      }, 0)
  }
}

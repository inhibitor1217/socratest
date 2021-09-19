function round(n, i) {
  const v = Math.round(n * (10 ** i)).toString()
  return [
    v.slice(0, -i),
    v.slice(-i),
  ].join('.')
}

exports.round = round

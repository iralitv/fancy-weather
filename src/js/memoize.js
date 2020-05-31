function memoize(method) {
  const cache = {};

  return async function memoizedFunc(...rest) {
    const args = JSON.stringify(rest);
    cache[args] = cache[args] || method.apply(this, rest);
    return cache[args];
  };
}

export default memoize;

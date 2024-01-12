export function instanceToJson<T extends object>(instance: T[]) {
  return [...instance].reduce((obj, item) => {
    const prop = {};
    prop[item[0]] = item[1];
    return { ...obj, ...prop };
  }, {});
}

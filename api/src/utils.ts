export const first = <T>(data: T[]) => {
  return data.length > 0 ? data[0] : 'no elements';
};

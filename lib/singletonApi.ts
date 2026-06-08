export function stripMongoFields<T extends Record<string, unknown>>(raw: T) {
  const data = { ...raw };
  delete data._id;
  delete data.__v;
  delete data.createdAt;
  delete data.updatedAt;
  return data;
}

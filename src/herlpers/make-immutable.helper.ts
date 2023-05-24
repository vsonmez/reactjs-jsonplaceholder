export const makeImmutable = <T>(obj: T): T =>
  obj && (JSON.parse(JSON.stringify(obj)) as T);

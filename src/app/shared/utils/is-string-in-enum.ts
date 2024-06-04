export function isStringInEnum(enumArg: object, value: string): boolean {
  return Object.values(enumArg).includes(value);
}

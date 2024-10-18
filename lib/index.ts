export const camelCase = (text: string) => {
  return text.replace(text.charAt(0), text.charAt(0).toUpperCase());
};

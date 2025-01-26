function camelCaseToTitleCase(camelCaseStr: string): string {
  return (
    camelCaseStr
      // Insert a space before any uppercase letter
      .replace(/([A-Z])/g, ' $1')
      // Capitalize the first letter of each word
      .replace(/^./, (match: string) => match.toUpperCase())
      // Trim any leading spaces
      .trim()
  );
}

// eslint-disable-next-line import/prefer-default-export
export { camelCaseToTitleCase };

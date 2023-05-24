const turkishTitleCase = (text: string) =>
  text
    .toLocaleLowerCase("tr-TR")
    .replace(/(?:^|\s|,|;|!|:|-|\.|\?)[a-z0-9ğçşüöıi]/g, (match) => {
      return match.toLocaleUpperCase("tr-TR");
    });
export default turkishTitleCase;

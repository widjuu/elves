export const getTxt = (data) => {
  let txt = [];

  if (!data) {
    return null;
  }

  data
    .filter((i) => i[0])
    .map((item) => {
      txt.push(`${item[0].toString().padStart(4, "0")}.0001="${item[1]}"`);
      txt.push(`${item[0].toString().padStart(4, "0")}.0002="${item[2]}"`);
      txt.push(`${item[0].toString().padStart(4, "0")}.0003="1"`);
      txt.push(`${item[0].toString().padStart(4, "0")}.0004="${item[3] ?? 0}"`);
      txt.push(`${item[0].toString().padStart(4, "0")}.0005="0,000"`);
      txt.push(`${item[0].toString().padStart(4, "0")}.0006="0,000"`);

      return null;
    });

  return ["[1]", ...txt];
};

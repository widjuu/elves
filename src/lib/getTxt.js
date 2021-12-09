export const getTxt = (data) => {
  let txt = [];

  if (!data) {
    return null;
  }

  const regExp = /[^a-zа-яё0-9,.\s]/gi;

  const getCode = (code) => {
    if (code && code.length > 0 && code.length <= 13) {
      return code;
    }

    if (code && code.length > 13) {
      return code.substring(0, 13);
    }

    return 0;
  };

  const getName = (name) => {
    return name?.substring(0, 27).replace(regExp, " ");
  };

  const getPrice = (price) => price?.toFixed(3).toString().replace(".", ",");

  /*
  data
    .filter((i) => i[0])
    .map((item) => {
      txt.push(
        `${item[0].toString().padStart(4, "0")}.0001="${getName(item[1])}"`
      ); //наименование
      txt.push(
        `${item[0].toString().padStart(4, "0")}.0002="${item[2]
          ?.toString()
          .replace(".", ",")}"`
      ); //цена товара
      txt.push(`${item[0].toString().padStart(4, "0")}.0003="1"`);
      txt.push(
        `${item[0].toString().padStart(4, "0")}.0004="${getCode(item[3])}"`
      ); //штрих код
      txt.push(`${item[0].toString().padStart(4, "0")}.0005="0,000"`);
      txt.push(`${item[0].toString().padStart(4, "0")}.0006="0,000"`);

      return null;
    });

    */

  txt.push("1;1;П №1;П №2;П №3;П №4;[??] Поле 5;[??] Поле 6");
  txt.push("1;1;1;0;0;0;0;0");

  data
    .filter((i) => i[0])
    .map((item) => {
      txt.push(
        `1;${item[0].toString()};"${getName(item[1])}";"${getPrice(
          item[2]
        )}";"1";"${getCode(item[3])}";"0,000";"0,000"`
      );

      return null;
    });

  return [...txt];
};

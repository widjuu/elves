export const encodeCP1251 = (string) => {
  function encodeChar(c) {
    let isKyr = function (str) {
      return /[а-я]/i.test(str);
    };

    let cp1251 =
      "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬*®Ї°±Ііґµ¶·\
ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя";

    let p = isKyr(c) ? cp1251.indexOf(c) + 128 : c.charCodeAt(0);

    let h = p.toString(16);

    if (h === "a") {
      h = "0A";
    }

    return "%" + h;
  }

  let res = "";

  for (let i = 0; i < string.length; i++) {
    res += encodeChar(string.charAt(i)); //ну или string[i]
  }

  return res;
};

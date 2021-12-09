import { encodeCP1251 } from "./encode";

export const download = (txt) => {
  let xlsxURL = window.URL.createObjectURL(
    new Blob([[txt.join("\r\n")]], {
      type: "text/x-csrc",
    })
  );
  let tempLink = document.createElement("a");
  tempLink.href = xlsxURL;
  tempLink.setAttribute(
    "href",
    "data:text/x-csrc;charset=cp1251," + encodeCP1251(txt.join("\n"))
  );
  tempLink.setAttribute("download", "elves.csv2");
  tempLink.click();
};

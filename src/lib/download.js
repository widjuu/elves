import { encodeCP1251 } from "./encode";

export const download = (txt) => {
  let xlsxURL = window.URL.createObjectURL(
    new Blob([[txt.join("\r\n")]], {
      type: "text/plain",
    })
  );
  let tempLink = document.createElement("a");
  tempLink.href = xlsxURL;
  tempLink.setAttribute(
    "href",
    "data:text/plain;charset=cp1251," + encodeCP1251(txt.join("\n"))
  );
  tempLink.setAttribute("download", "elves.txt");
  tempLink.click();
};

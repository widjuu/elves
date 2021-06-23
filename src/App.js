import { useState } from "react";
import XLSX from "xlsx";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

export const App = () => {
  const [file, setFile] = useState([]);
  const [data, setData] = useState([]);

  const props = {
    onRemove: (file) => {
      const index = file.indexOf(file);
      const newFileList = file.slice();
      newFileList.splice(index, 1);
      setFile([newFileList]);
    },

    beforeUpload: (file) => {
      const isCsvOrXlsx =
        file.type === "text/csv" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      if (!isCsvOrXlsx) {
        message.error("Error");
      }

      if (isCsvOrXlsx) {
        setFile([file]);
      }
    },
  };

  const reader = new FileReader();

  const rABS = !!reader.readAsBinaryString;

  reader.onload = (e) => {
    /* Parse data */
    const bstr = e.target.result;
    const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
    /* Get first worksheet */
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    /* Convert array of arrays */
    const data = XLSX.utils.sheet_to_json(ws, {
      header: 1,
    });
    setData(data);
  };

  const onClick = () => {
    reader.readAsBinaryString(file[0]);
  };

  const csvdata = data
    .map(
      (item) =>
        `1;${item[0].toString()};"${item[1]}";"${
          item[2]
        }";"1";"0";"0,000";"0,000"`
    )
    .join("\r\n");

  console.log(csvdata);

  let txt = ["[1]"];
  const txtdata = data.map((item) => {
    txt.push(`${item[0].toString().padStart(4, "0")}.0001="${item[1]}"`);
    txt.push(`${item[0].toString().padStart(4, "0")}.0002="${item[2]}"`);
    txt.push(`${item[0].toString().padStart(4, "0")}.0003="1"`);
    txt.push(`${item[0].toString().padStart(4, "0")}.0004="0"`);
    txt.push(`${item[0].toString().padStart(4, "0")}.0005="0,000"`);
    txt.push(`${item[0].toString().padStart(4, "0")}.0006="0,000"`);
  });

  console.log(txt.join("\r\n"));

  /*0001.0001="ÒÎÂÀÐ    1"
0001.0002="1,00"
0001.0003="1"
0001.0004="0"
0001.0005="0,000"
0001.0006="0,000" */

  const download = () => {
    var xlsxURL = window.URL.createObjectURL(
      new Blob([[txt.join("\r\n")]], {
        type: "text/plain",
      })
    );
    let tempLink = document.createElement("a");
    tempLink.href = xlsxURL;
    tempLink.setAttribute("download", "elves.txt");
    tempLink.click();
  };

  return (
    <div>
      <Upload {...props} fileList={file}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>

      <button onClick={onClick}>read</button>

      <button onClick={download}>download</button>
    </div>
  );
};

export default App;

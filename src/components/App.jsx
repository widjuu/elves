import { useState } from "react";
import XLSX from "xlsx";

//components
import { Alert, Button } from "antd";
import { UploadFile } from "./Upload";

//utils
import { download } from "../lib/download";
import { getTxt } from "../lib/getTxt";

//style
import style from "./App.module.css";
import "antd/dist/antd.css";

export const App = () => {
  const [file, setFile] = useState([]);
  const [data, setData] = useState([]);

  const reader = new FileReader();

  const rABS = !!reader.readAsBinaryString;

  reader.onload = (e) => {
    const bstr = e.target.result;
    const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const data = XLSX.utils.sheet_to_json(ws, {
      header: 1,
    });
    setData(data);
  };

  const downloadClick = () => {
    reader.readAsBinaryString(file[0]);

    const txt = getTxt(data);

    if (txt) {
      download(txt);
    }
  };

  return (
    <div className={style.main}>
      <Alert
        message={
          <span>
            Скачайте &nbsp;
            <a href="/templates/шаблон.xlsx" download>
              шаблон
            </a>
            &nbsp; и заполните его.
          </span>
        }
        type="info"
      />

      <div className={style.buttons}>
        <UploadFile file={file} setFile={setFile} />

        <Button
          type="primary"
          onClick={downloadClick}
          disabled={file.length === 0}
        >
          Скачать
        </Button>
      </div>
    </div>
  );
};

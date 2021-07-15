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
    setData(getTxt(data));
  };

  const handleRead = (file) => {
    reader.readAsBinaryString(file);
  };

  const downloadClick = (data) => {
    download(data);
  };

  return (
    <div className={style.main}>
      <Alert
        message={
          <span>
            Скачайте &nbsp;
            <a href="/elves/templates/шаблон.xlsx" download>
              шаблон
            </a>
            &nbsp; и заполните его.
          </span>
        }
        type="info"
      />

      <div className={style.buttons}>
        <UploadFile handleRead={handleRead} />

        <Button
          type="primary"
          onClick={() => downloadClick(data)}
          disabled={data.length === 0}
        >
          Скачать
        </Button>
      </div>
    </div>
  );
};

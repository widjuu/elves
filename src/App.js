import { useState } from "react";
import XLSX from "xlsx";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

export const App = () => {
  const [file, setFile] = useState([]);

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

  console.log(file);

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

    console.log(data);
  };

  if (file[0]) {
    reader.readAsBinaryString(file[0]);
  }

  return (
    <div>
      <Upload {...props} fileList={file}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </div>
  );
};

export default App;

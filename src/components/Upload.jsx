import { useState } from "react";

//componetns
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const UploadFile = ({ handleRead }) => {
  const [file, setFile] = useState([]);

  const props = {
    onRemove: () => {
      setFile([]);
    },

    beforeUpload: (file) => {
      const isCsvOrXlsx =
        file.type === "text/csv" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      if (!isCsvOrXlsx) {
        message.error("Не правильный формат файла");
      }

      setFile([file]);
      handleRead(file);
    },
  };

  return (
    <Upload {...props} fileList={file}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

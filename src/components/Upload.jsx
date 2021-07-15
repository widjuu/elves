//componetns
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const UploadFile = ({ file, setFile }) => {
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
        message.error("Не правильный формат файла");
      }

      if (isCsvOrXlsx) {
        setFile([file]);
      }
    },
  };

  return (
    <Upload {...props} fileList={file}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import "./ImageUpload.css";

interface ImageUploadProps {
  id: string;
  onInput: (id: string, file: File) => void;
  placeholder: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  onInput,
  placeholder,
}) => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  useEffect(() => {
    setPreviewUrl(placeholder);
  }, [placeholder]);

  const pickedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);

    onInput(id, file);
  };

  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };

  return (
    <div className="form-control">
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className="image-upload">
        <div className="image-upload__preview">
          {placeholder && <img src={placeholder} alt="Preview" />}{" "}
          {/* placeholder가 존재할 때만 이미지를 보여줌 */}
          {!placeholder && <p>이미지를 선택해주세요.</p>}
        </div>
        <button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;

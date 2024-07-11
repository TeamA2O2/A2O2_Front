import React, { useRef, useState, ChangeEvent } from "react";
import "./ImageUpload.css";

interface ImageUploadProps {
  id: string;
  onInput: (id: string, file: File, isValid: boolean) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ id, onInput }) => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [isValid, setIsValid] = useState(false);

  const pickedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file

    if (!file) return;

    const fileIsValid = file.type.startsWith("image/");
    setIsValid(fileIsValid);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);

    onInput(id, file, fileIsValid);
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
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>이미지를 선택해주세요.</p>}
        </div>
        <button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;

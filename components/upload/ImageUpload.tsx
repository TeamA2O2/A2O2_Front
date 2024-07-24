import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import "./ImageUpload.css";
import Image from "next/image";
import CameraIcon from "@/components/svg/camera.svg";
interface ImageUploadProps {
  id: string;
  onInput: (file: File) => void;
  placeholder?: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  onInput,
  placeholder,
}) => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  useEffect(() => {
    setPreviewUrl(placeholder ?? undefined); //Nullish 병합 연산자
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

    onInput(file);
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
      <div className="image-upload" onClick={pickImageHandler}>
        <div className="image-upload__preview">
          {previewUrl && <Image src={previewUrl} alt="preview" />}
          {!previewUrl && <div>{placeholder || <CameraIcon />}</div>}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;

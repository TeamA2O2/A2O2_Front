import React, { ChangeEvent, FormEvent } from "react";
import ImageUpload from "@/components/upload/ImageUpload";
import styles from "./FundingForm.module.css";

interface FundingFormProps {
  formData: {
    title: string;
    userId: string;
    item: string;
    price: number;
    deadline: string;
    image: File | null;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (file: File) => void;
  onSubmit: (e: FormEvent) => void;
  placeholders: {
    title: string;
    userId: string;
    item: string;
    price: string;
    image: string | null;
    deadline: string;
  };
}

const FundingForm: React.FC<FundingFormProps> = ({
  formData,
  onChange,
  onFileChange,
  onSubmit,
  placeholders,
}) => {
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleImageInput = (file: File) => {
    onFileChange(file);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <ImageUpload
          id="image"
          onInput={handleImageInput}
          placeholder={placeholders.image}
        />
      </div>

      <div className={styles.input_div}>
        <p className={styles.title}>유저</p>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={onChange}
          placeholder={placeholders.userId}
          className={styles.input}
          required
        />
      </div>
      <hr></hr>
      <div className={styles.input_div}>
        <p className={styles.title}>펀딩명</p>
        <input
          type="text"
          name="title"
          className={styles.input}
          value={formData.title}
          onChange={onChange}
          placeholder={placeholders.title}
          required
        />
      </div>
      <hr></hr>
      <div className={styles.input_div}>
        <p className={styles.title}>상품명</p>
        <input
          type="text"
          name="item"
          className={styles.input}
          value={formData.item}
          onChange={onChange}
          placeholder={placeholders.item}
          required
        />
      </div>
      <hr></hr>
      <div className={styles.input_div}>
        <p className={styles.title}>가격</p>
        <input
          type="number"
          name="price"
          className={styles.input}
          value={formData.price}
          onChange={onChange}
          placeholder={placeholders.price}
          required
        />
      </div>
      <hr></hr>
      <div className={styles.input_div}>
        <p className={styles.title}>마감기한</p>
        <input
          type="text"
          name="deadline"
          className={styles.input}
          value={formData.deadline ? formatDate(formData.deadline) : ""}
          onChange={onChange}
          onFocus={(e) => {
            e.target.type = "date";
          }}
          onBlur={(e) => {
            if (!e.target.value) {
              e.target.type = "text";
            }
          }}
          placeholder={placeholders.deadline}
          required
        />
      </div>
      <hr></hr>
      <button type="submit" className={styles.button}>
        <p
          style={{
            fontFamily: "NanumSquareRound, sans-serif",
            width: "173.365px",
            height: "46.869px",
            flexShrink: 0,
            color: "white",
            fontSize: "20px",
          }}
        >
          게시하기
        </p>
      </button>
    </form>
  );
};

export default FundingForm;

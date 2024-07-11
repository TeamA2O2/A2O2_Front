import React, { ChangeEvent, FormEvent } from "react";
import ImageUpload from "@/components/upload/ImageUpload";

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
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleImageInput = (id: string, file: File) => {
    onFileChange(file);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>유저</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={onChange}
          placeholder={placeholders.userId}
          required
        />
      </div>
      <div>
        <label>펀딩 제목</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder={placeholders.title}
          required
        />
      </div>
      <div>
        <label>상품명</label>
        <input
          type="text"
          name="item"
          value={formData.item}
          onChange={onChange}
          placeholder={placeholders.item}
          required
        />
      </div>
      <div>
        <label>가격</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={onChange}
          placeholder={placeholders.price}
          required
        />
      </div>
      <div>
        <label>마감 날짜</label>
        <input
          type="date"
          name="deadline"
          value={formatDate(formData.deadline)}
          onChange={onChange}
          placeholder={placeholders.deadline}
          required
        />
      </div>
      <div>
        <label>사진 업로드</label>
        <ImageUpload
          id="image"
          onInput={handleImageInput}
          placeholder={placeholders.image}
        />
      </div>
      <button type="submit">게시하기</button>
    </form>
  );
};

export default FundingForm;

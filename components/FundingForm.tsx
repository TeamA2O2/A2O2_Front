import React from "react";

interface FundingFormProps {
  formData: {
    title: string;
    userId: string;
    item: string;
    price: number;
    deadline: string;
    image: File | null;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FundingForm: React.FC<FundingFormProps> = ({
  formData,
  onChange,
  onFileChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <label>유저</label>
      <input
        type="text"
        name="userId"
        value={formData.userId}
        onChange={onChange}
      />
      <label>펀딩 제목</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={onChange}
      />
      <label>상품명</label>
      <input
        type="text"
        name="item"
        value={formData.item}
        onChange={onChange}
      />
      <label>가격</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={onChange}
      />
      <label>마감 날짜</label>
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={onChange}
      />
      <label>사진 업로드</label>
      <input type="file" name="image" onChange={onFileChange} />
      <button type="submit">게시하기</button>
    </form>
  );
};

export default FundingForm;

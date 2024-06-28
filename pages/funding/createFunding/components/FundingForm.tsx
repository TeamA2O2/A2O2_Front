import React from "react";

export default function FundingForm() {
  return (
    <div>
      <div>
        <label>받고 싶은 선물</label>
        <div>
          <input type="text" placeholder="상품" />
        </div>
      </div>
      <div>
        <label>가격</label>
        <div>
          <input type="number" placeholder="가격" />
        </div>
      </div>
      <div>
        <label>사진 업로드</label>
        <div>
          <input type="file" placeholder="사진" />
        </div>
      </div>
      <div>
        <label>마감기한</label>
        <div>
          <input type="date" placeholder="기한" />
        </div>
      </div>
      <div>
        <button>게시하기</button>
      </div>
    </div>
  );
}

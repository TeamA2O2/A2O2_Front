import React from "react";

export default function OngoingFundings() {
  return (
    <div>
      <h1>펀딩 진행 페이지</h1>
      <div>
        <div>
          <span>주최자 이름</span>
          <button>Share Icon</button>
        </div>
        <div>
          <img src="/path/to/gift-icon.png" alt="Gift Icon" />
          <div>
            <span>상품명</span>
          </div>
          <div>
            <div>모금 진행도 바</div>
          </div>
          <div>
            <button>펀딩하기 (결제)</button>
          </div>
        </div>
      </div>
    </div>
  );
}

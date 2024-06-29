import React from "react";

interface FundingItemProps {
  item: string;
}

const FundingItem: React.FC<FundingItemProps> = ({ item }) => {
  return (
    <div>
      <span>{item}</span>
      <button>수정 버튼</button>
      <button>삭제 버튼</button>
    </div>
  );
};

export default FundingItem;

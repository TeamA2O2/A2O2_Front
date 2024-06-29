import React from "react";
import FundingItem from "./FundingItem";

const fundingList = ["삼성노트북", "샤넬가방"];

const FundingList: React.FC = () => {
  return (
    <div>
      {fundingList.map((item, index) => (
        <FundingItem key={index} item={item} />
      ))}
    </div>
  );
};

export default FundingList;

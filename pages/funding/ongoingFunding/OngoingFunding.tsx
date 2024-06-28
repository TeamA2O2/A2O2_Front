// OngoingFunding.tsx

import React from "react";

interface OngoingFundingProps {
  organizer: string;
  productName: string;
  progress: number;
  imageSrc: string;
}

const OngoingFunding: React.FC<OngoingFundingProps> = ({
  organizer,
  productName,
  progress,
  imageSrc,
}) => {
  return (
    <div>
      <div>
        <div>
          <span>주최자 : {organizer}</span>
          <button>공유하기</button>
        </div>
        <div>
          <img src={imageSrc} alt="Gift" />
          <div>
            <span>{productName}</span>
          </div>
          <div>
            <div>{`모금 진행도: ${progress}%`}</div>
          </div>
          <div>
            <button>펀딩하기 (결제)</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingFunding;

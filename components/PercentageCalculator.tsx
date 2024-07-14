import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

interface PercentageCalculatorProps {
  productPrice: number;
  currentAmount: number;
}

const PercentageCalculator: React.FC<PercentageCalculatorProps> = ({
  productPrice,
  currentAmount,
}) => {
  // 퍼센트 계산
  const calculatePercentage = () => {
    if (productPrice <= 0) return 0; // 제품 가격이 0 이하인 경우 예외 처리
    const percentage = (currentAmount / productPrice) * 100;
    return Math.round(percentage * 100) / 100; // 소수점 둘째 자리까지 반올림
  };

  const percentage = calculatePercentage();

  return (
    <div>
      {/* <p>
        제품 가격: {productPrice}원, 현재 금액: {currentAmount}W
      </p> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "NanumSquareRound, sans-serif",
            width: "322.85px",
            height: "84.922px",
            flexShrink: 0,
            margin: 0,
          }}
        >
          {percentage}%
        </h1>
        <p
          style={{
            width: "242.921px",
            height: "50.03px",
            flexShrink: "0",
            color: "#4A4A4A",
            fontFamily: "NanumSquareRound, sans-serif",
            fontWeight: "Light",
            margin: 0,
          }}
        >
          {currentAmount}원
        </p>
      </div>
      <ProgressBar
        completed={percentage}
        bgColor="#9AC87F"
        height="20px"
        width="100%"
        isLabelVisible={false}
        // labelAlignment="center"
        // labelColor="#ffffff"
        // labelSize="16px"
      />
    </div>
  );
};

export default PercentageCalculator;

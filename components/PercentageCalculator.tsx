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
    <div style={{ width: "100%", marginTop: "10%", boxSizing: "border-box" }}>
      {/* <p>
        제품 가격: {productPrice}원, 현재 금액: {currentAmount}W
      </p> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "left",
          marginBottom: "2%",
        }}
      >
        <h1
          style={{
            fontFamily: "NanumSquareRound, sans-serif",
            flexShrink: 0,
            margin: 0,
            maxWidth: "70%",
            fontSize: "clamp(2rem, 5vw, 2rem)",
          }}
        >
          {percentage}%
        </h1>
        <p
          style={{
            flexShrink: 0,
            color: "#4A4A4A",
            fontFamily: "NanumSquareRound, sans-serif",
            fontWeight: "Light",
            margin: 0,
            fontSize: "clamp(1rem, 3.5vw, 1.5rem)",
          }}
        >
          {currentAmount}원
        </p>
      </div>
      <ProgressBar
        completed={percentage}
        bgColor="#9AC87F"
        height="0.8em" // 상대적인 높이로 설정
        width="100%"
        isLabelVisible={false}
      />
    </div>
  );
};

export default PercentageCalculator;

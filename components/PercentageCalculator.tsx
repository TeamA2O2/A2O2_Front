import React from "react";

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
      <p>
        제품 가격: {productPrice}원, 현재 금액: {currentAmount}W
      </p>
      <p>진행률: {percentage}%</p>
    </div>
  );
};

export default PercentageCalculator;

"use client";
import React, { useState } from "react";
import axios from "axios";

const FundingApplicationContainer = () => {
  const [formData, setFormData] = useState({
    amount: 0,
    applicantName: "",
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 제출 동작 방지

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/apply`,
        formData
      );
      console.log("펀딩 신청 성공:", response.data);
    } catch (error) {
      console.error("펀딩 신청 실패:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          금액:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          신청자 이름:
          <input
            type="text"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">펀딩 신청하기</button>
      </form>
    </div>
  );
};

export default FundingApplicationContainer;

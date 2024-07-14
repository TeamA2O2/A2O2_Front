"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const FundingApplicationContainer = () => {
  const [fid, setFid] = useState<string | null>(null);
  const [data, setData] = useState({
    id: "",
    price: 0,
    applicantName: "",
  });

  useEffect(() => {
    const urlParams = new URL(window.location.href);
    const fid = urlParams.searchParams.get("id");
    if (fid) {
      setFid(fid);
      setData((prevData) => ({
        ...prevData,
        id: fid,
      }));
    }
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 제출 동작 방지
    console.log(data);
    try {
      console.log(data);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/funding/participate`,
        { data }
      );
      console.log("펀딩 참여 성공:", response.data);
      alert("펀딩 참여 성공");
    } catch (error) {
      console.error("펀딩 참여 실패:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
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
            name="price"
            value={data.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          신청자 이름:
          <input
            type="text"
            name="applicantName"
            value={data.applicantName}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">
          <p>펀딩 신청하기</p>
        </button>
      </form>
    </div>
  );
};

export default FundingApplicationContainer;

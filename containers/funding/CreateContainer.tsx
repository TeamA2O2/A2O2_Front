"use client";

import React, { useState } from "react";
import FundingForm from "@/components/FundingForm";
import axios from "axios";

const FundingCreateContainer = () => {
  const [formData, setFormData] = useState({
    title: "",
    item: "",
    price: 0,
    deadline: "",
    userId: "",
    image: null as File | null, //File | null 타입을 가질 수 있도록 명시적으로 정의
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //변경된 input 핸들러
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //파일 input 핸들러
    if (e.target.files) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    //제출
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("item", formData.item);
    data.append("price", formData.price.toString());
    data.append("deadline", formData.deadline);
    data.append("userId", formData.userId);
    if (formData.image) {
      data.append("image", formData.image);
    }

    //data 확인
    data.forEach((value, key) => {
      console.log(key + ": " + value);
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/funding/create`,
        data
      );
      if (response.status === 201) {
        console.log("Funding created success:", response.data);
      } else {
        console.error("Failed to create funding", response.status);
      }
    } catch (error) {
      console.error("Error creating funding:", error);
    }
  };

  return (
    <div>
      <FundingForm
        formData={formData}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FundingCreateContainer;

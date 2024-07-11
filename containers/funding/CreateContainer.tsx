"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import FundingForm from "@/components/FundingForm";
import axios from "axios";

const FundingCreateContainer = () => {
  const [formData, setFormData] = useState({
    title: "",
    item: "",
    price: 0,
    deadline: "",
    userId: "",
    image: null as File | null,
  });

  const [placeholders, setPlaceholders] = useState({
    title: "펀딩 제목을 입력하세요",
    item: "상품명을 입력하세요",
    price: "가격을 입력하세요",
    deadline: "마감 날짜를 선택하세요",
    userId: "유저 ID를 입력하세요",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [fid, setFid] = useState<string | null>(null);

  useEffect(() => {
    const fetchFundingData = async () => {
      const urlParams = new URL(window.location.href);
      const fid = urlParams.searchParams.get("fid");
      if (fid) {
        setFid(fid);
      }
      if (fid) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/funding/view?id=${fid}`
          );

          if (response.status === 200) {
            const data = response.data[0];

            setFormData({
              title: data.title,
              item: data.item,
              price: data.price,
              deadline: data.deadline,
              userId: data.userId,
              image: null,
            });

            setPlaceholders({
              title: data.title,
              item: data.item,
              price: data.price.toString(),
              deadline: data.deadline,
              userId: data.userId,
            });

            setIsEdit(true);
          } else if (response.status === 204) {
            console.log("No funding found with this ID");
          }
        } catch (error) {
          console.error("Error fetching funding data:", error);
        }
      }
    };

    fetchFundingData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (file: File, isValid: boolean) => {
    if (isValid) {
      setFormData({
        ...formData,
        //image: file,
        image: null,
      });
    } else {
      console.error("선택된 파일이 유효하지 않습니다.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      ...(fid ? { id: Number(fid) } : {}),
      ...formData,
    };

    console.log(data);
    try {
      const response = isEdit
        ? await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/funding/update`,
            { data }
            // {
            //   headers: {
            //     "Content-Type": "multipart/form-data",
            //   },
            // }
          )
        : await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/funding/create`,
            { data }
            // {
            //   headers: {
            //     "Content-Type": "multipart/form-data",
            //   },
            // }
          );

      if (response.status === 200 || response.status === 201) {
        console.log(
          isEdit ? "펀딩 수정 성공" : "펀딩 생성 성공",
          response.data
        );
      }
    } catch (error) {
      console.error("Error processing funding:", error);
    }
  };

  return (
    <div>
      <FundingForm
        formData={formData}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        placeholders={placeholders}
      />
    </div>
  );
};

export default FundingCreateContainer;

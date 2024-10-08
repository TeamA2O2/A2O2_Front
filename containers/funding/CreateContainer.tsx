"use client";
import Head from "next/head";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import FundingForm from "@/components/FundingForm";
import axios from "axios";
import Modal from "@/components/modal/Modal";

import styles from "./CreateContainer.module.css";

const FundingCreateContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    item: "",
    price: 0,
    deadline: "",
    userId: "",
    image: null as File | null,
  });

  const [placeholders, setPlaceholders] = useState({
    title: "펀딩 제목을 입력해주세요.",
    item: "상품명을 입력해주세요",
    price: "가격을 입력해주세요",
    deadline: "마감 기한을 입력해주세요. (예시: 2024-01-01)",
    userId: "유저 ID를 입력해주세요.",
    image: null,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [fid, setFid] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("Id");

    if (!userId) {
      // 로컬 스토리지에 userId가 없으면 로그인 페이지로 리디렉션
      window.location.href = "/user/login";
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      userId,
    }));

    const fetchFundingData = async () => {
      const urlParams = new URL(window.location.href);
      const fid = urlParams.searchParams.get("id");
      if (fid) {
        setFid(fid);
      }
      if (fid) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/funding/view?id=${fid}`
          );
          console.log(response.data);
          if (response.status === 200) {
            const data = response.data;

            setFormData({
              ...setFormData,
              title: data.title,
              item: data.item,
              price: data.price,
              deadline: data.deadline,
              userId: data.userId || formData.userId,
              image: data.image || null,
            });

            setPlaceholders({
              title: data.title,
              item: data.item,
              price: data.price.toString(),
              deadline: data.deadline,
              userId: data.userId,
              image: data.image || null,
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

  const handleFileChange = (file: File) => {
    console.log("파일 변경");
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    if (isEdit) {
      data.append("id", fid!); // 수정할 때만 id 추가
    }
    data.append("title", formData.title);
    data.append("item", formData.item);
    data.append("price", formData.price.toString());
    data.append("deadline", formData.deadline);
    data.append("userId", formData.userId);

    if (formData.image) {
      data.append("image", formData.image);
    }

    console.log({ data });
    try {
      const response = isEdit
        ? await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/funding/update`,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
        : await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/funding/create`,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

      if (response.status === 200 || response.status === 201) {
        if (isEdit) {
          setIsModalOpen(true);
          setModalMessage("펀딩 수정 성공");
        } else {
          setIsModalOpen(true);
          setModalMessage("펀딩 생성 성공!");
        }
      }
    } catch (error) {
      console.error("Error processing funding:", error);
      data.forEach((key, value) => {
        console.log(key, value);
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        message={modalMessage}
      />
      <div className={styles.content}>
        <div className={styles.header_container}>
          <h1>받고 싶은 선물</h1>
          <button
            className={styles.recommend_button}
            onClick={() => {
              setIsModalOpen(true);
              setModalMessage("추천 펀딩 리스트");
            }}
          >
            <p>추천 선물</p>
          </button>
        </div>
        <p>선물 정보를 입력해주세요.</p>
        <FundingForm
          formData={formData}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          placeholders={placeholders}
        />
      </div>
    </>
  );
};

export default FundingCreateContainer;

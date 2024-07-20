"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal/Modal";

import styles from "./ApplyContainer.module.css";

const ApplyContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();
  const [fid, setFid] = useState<string | null>(null);
  const [data, setData] = useState({
    id: "",
    price: 0,
    applicantName: "",
  });
  const [image, setImage] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [item, setItem] = useState<string | undefined>(undefined);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fid = urlParams.get("id");
    const title = urlParams.get("title");
    const item = urlParams.get("item");
    const image = urlParams.get("image");

    if (fid && title && item && image) {
      setFid(fid);
      setTitle(title);
      setItem(item);
      setImage(image);

      setData((prevData) => ({
        ...prevData,
        id: fid,
      }));
    } else {
      router.back(); //쿼리 파라미터로 받아온 값이 없으면 이전 페이지로
    }
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 제출 동작 방지
    console.log(data);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/funding/participate`,
        { data }
      );
      console.log("펀딩 참여 성공:", response.data);
      setIsModalOpen(true);
      setModalMessage("펀딩 참여 성공!");
    } catch (error) {
      console.error("펀딩 참여 실패:", error);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        message={modalMessage}
      />

      <form onSubmit={handleFormSubmit} className={styles.content}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={image} alt="Gift" />
        </div>
        <div style={{ padding: "5% 5% 0" }}>
          <div className={styles.mainInfo}>
            <h1>펀딩 제목 : {title}</h1>
          </div>
          <p className={styles.item}>상품명 : {item}</p>
          <hr className={styles.hr} style={{ marginBottom: "10%" }} />
          <div className={styles.input_div}>
            <p className={styles.title}>참여자 이름</p>
            <input
              type="text"
              name="applicantName"
              value={data.applicantName}
              onChange={handleChange}
              className={styles.input}
              placeholder="펀딩에 참여하실 별명을 적어주세요."
            />
          </div>
          <hr className={styles.hr} />
          <div className={styles.input_div}>
            <p className={styles.title}>금액</p>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              className={styles.input}
              placeholder=""
            />
          </div>

          <hr className={styles.hr} />
          <button type="submit" className={styles.button}>
            <p>결제하기</p>
          </button>
        </div>
      </form>
    </>
  );
};

export default ApplyContainer;

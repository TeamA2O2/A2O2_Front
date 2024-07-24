"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import Modal from "@/components/modal/Modal";
import PercentageCalculator from "@/components/PercentageCalculator";
import Share from "@/components/svg/share.svg";
import styles from "./DetailContainer.module.css";

interface DetailFundingProps {
  userId: string;
  title: string;
  item: string;
  money: number;
  image?: string;
  createdAt: string;
  deadline: string;
  price: number;
}

const FundingDetailContainer = () => {
  const path = usePathname();
  const fid = path.split("/").pop();
  const router = useRouter();

  console.log("fid:", fid);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [fundingData, setFundingData] = useState<DetailFundingProps>({
    userId: "",
    title: "",
    item: "",
    money: 0,
    image: "",
    createdAt: "",
    deadline: "",
    price: 0,
  });

  useEffect(() => {
    const fetchFundingData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/funding/view?id=${fid}`
        );
        if (response.status === 200) {
          console.log(response.data);
          setFundingData(response.data);
          console.log("펀딩 디테일 불러오기 성공");
        } else if (response.status === 204) {
          console.log("사용자가 생성한 펀딩이 없는 경우");
          router.back();
        }
      } catch (error) {
        console.error("Error fetching funding data:", error);
        router.back();
      }
    };

    if (fid) {
      fetchFundingData();
    }
  }, [fid]);

  const updateFunding = (id: string | undefined) => {
    const queryParams = new URLSearchParams({
      id: id || "",
      title: fundingData.title,
      item: fundingData.item,
      image: fundingData.image || "",
    }).toString();

    router.push(`/funding/apply?${queryParams}`);
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setModalMessage("URL이 복사되었습니다.");
      setIsModalOpen(true);
    } catch (e) {
      setModalMessage("다시 시도해주세요");
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { userId, title, item, money, image, createdAt, deadline, price } =
    fundingData;

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        message={modalMessage}
      />
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={image} alt="Gift" />
        </div>
        <div style={{ padding: "5% 5% 0" }}>
          <div className={styles.mainInfo}>
            <h1>{title}</h1>
            <Share
              onClick={() => {
                handleCopyClipBoard(
                  `https://a2-o2-front-five.vercel.app${path}`
                ); //공유 클릭하면 복사함수 호출
              }}
              className={styles.icon}
            />
          </div>
          <p className={styles.item}>{item}</p>
          <hr className={styles.hr} />
          <p>
            목표 금액 : {price}원 &nbsp;&nbsp;&nbsp;&nbsp;마감일 :{" "}
            {new Date(deadline).toLocaleDateString()}
          </p>
          {/* <br></br>
          <p>마감일 : {new Date(deadline).toLocaleDateString()}</p> */}
          <div>
            <PercentageCalculator productPrice={price} currentAmount={money} />
          </div>
          <button onClick={() => updateFunding(fid)} className={styles.button}>
            <p>펀딩하기</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default FundingDetailContainer;

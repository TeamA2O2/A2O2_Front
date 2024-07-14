"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import PercentageCalculator from "@/components/PercentageCalculator";
import Share from "@/components/img/share.svg";
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
        }
      } catch (error) {
        console.error("Error fetching funding data:", error);
      } finally {
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

  const { userId, title, item, money, image, createdAt, deadline, price } =
    fundingData;

  return (
    <div className={styles.content}>
      <img className={styles.img} src={image} alt="Gift" />
      <div>
        <div className={styles.mainInfo}>
          <h1>펀딩 제목 : {title}</h1>

          {/* <p>주최자: {userId}</p> */}
          <Share className={styles.icon} />
        </div>
        <h3 className={styles.item}>상품명 : {item}</h3>

        <hr></hr>
        <p>목표 금액 : {price}원</p>
        <p>생성일 : {new Date(createdAt).toLocaleDateString()}</p>
        <p>마감일 : {new Date(deadline).toLocaleDateString()}</p>
        <div className={styles.percent}>
          <PercentageCalculator productPrice={price} currentAmount={money} />
        </div>

        <button onClick={() => updateFunding(fid)} className={styles.button}>
          <p
            style={{
              fontFamily: "NanumSquareRound, sans-serif",
              width: "173.365px",
              height: "46.869px",
              flexShrink: 0,
              color: "white",
              fontSize: "20px",
            }}
          >
            펀딩하기
          </p>
        </button>
      </div>
    </div>
  );
};

export default FundingDetailContainer;

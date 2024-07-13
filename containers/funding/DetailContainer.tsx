"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import PercentageCalculator from "@/components/PercentageCalculator";

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
    router.push(`/funding/apply?id=${id}`);
  };

  const { userId, title, item, money, image, createdAt, deadline, price } =
    fundingData;

  return (
    <div>
      <div>
        <div>
          <span>주최자: {userId}</span>
        </div>
        <div>
          <span>펀딩 이름: {title}</span>
        </div>
        <div>
          <img
            src={image}
            alt="Gift"
            style={{ width: "200px", height: "auto" }}
          />
          <div>
            <span>품목: {item}</span>
          </div>
          <div>
            <PercentageCalculator productPrice={price} currentAmount={money} />
          </div>
          <div>
            <div>펀딩 가격: {price}원</div>
          </div>
          <div>
            <div>생성일: {new Date(createdAt).toLocaleDateString()}</div>
          </div>
          <div>
            <div>마감일: {new Date(deadline).toLocaleDateString()}</div>
          </div>
          <div>
            <button onClick={() => updateFunding(fid)}>펀딩하기 (결제)</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingDetailContainer;

"use client";
import React from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import Back from "@/components/svg/back.svg";

const Header: React.FC = () => {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back(); // 뒤로가기 버튼 클릭 시 이전 페이지로 이동합니다.
  };

  return (
    <header className={styles.header}>
      <Back className={styles.back} onClick={handleBackButtonClick} />
      <h1 className={styles.headerTitle}></h1>
    </header>
  );
};

export default Header;

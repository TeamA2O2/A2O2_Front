"use client";

import Logo from "@/components/img/logo.svg";
import { useRouter } from "next/navigation";
import styles from "./IntroContianer.module.css";

const IntroContainer = () => {
  const router = useRouter();

  const Routing = (value: string) => {
    router.push(`/user/${value}`);
  };
  // const userId = localStorage.getItem("Id");

  // if (userId) {
  //   // 로컬 스토리지에 userId가 있으면 메인으로
  //   window.location.href = "/user/info";
  //   return;
  // }

  return (
    <div className={styles.content}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <div className={styles.button_div}>
        <button
          className={styles.button}
          onClick={() => {
            Routing("login");
          }}
        >
          <p>로그인</p>
        </button>
        <button
          className={styles.button}
          onClick={() => {
            Routing("register");
          }}
        >
          <p>회원가입</p>
        </button>
      </div>
    </div>
  );
};
export default IntroContainer;

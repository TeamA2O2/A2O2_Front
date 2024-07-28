"use client";

import { useState } from "react";
import axios from "axios";

import styles from "./login.module.css";

export default function Login() {
  // 완료시 로컬스토리지 저장

  const [user, setUser] = useState({
    id: "",
    password: "",
  });

  const InputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const LoginUser = async () => {
    const data = user;

    try {
      await axios
        .post(`https://ao-rztme.run.goorm.site/user/signIn`, { data })
        .then((res) => {
          if (res.status === 200) {
            alert("로그인완료");
            localStorage.setItem("Id", user.id);
            window.location.href = "/user/info";
          }
          
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className={styles.text}>로그인</h1>
      <div>
        <div>
          <label className={styles.label}>아이디</label>
        </div>
        <div>
          <input onChange={InputData} name="id" className={styles.input} />
        </div>
        <div>
          <label className={styles.label}>비번</label>
        </div>
        <div>
          <input
            onChange={InputData}
            name="password"
            className={styles.input}
          />
        </div>
      </div>
      <button onClick={LoginUser} className={styles.button}>
        로그인
      </button>
    </div>
  );
}

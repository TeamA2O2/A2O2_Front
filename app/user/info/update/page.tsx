"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./update.module.css";

export default function Update() {
  const [user, setUser] = useState({
    name: "",
    id: "",
    password: "",
    phone: "",
    email: "",
  });

  const [pw, checkPw] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("Id");


    axios.get(`https://ao-rztme.run.goorm.site/user/getUserData/`+userId)
    .then((res)=>{
      console.log(res.data.data)
      setUser(res.data.data)
    })

  },[]);

  const InputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  //비밀번호 일치 확인
  const CheckPassword = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (user.password === event.target.value) {
      checkPw(true);
    } else {
      checkPw(false);
    }
  };

  //회원수정
  const UpdateUser = async () => {
    const data = user;

    try {
      await axios
        .post(`https://ao-rztme.run.goorm.site/user/editUser`, { data })
        .then((res) => {
          if (res.status === 200) {
            alert("회원수정완료");
          }
          console.log(res);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className={styles.text}>회원 정보 수정</h2>
      <div>
        <div>
          <label className={styles.label}>이름</label>
        </div>
        <div>
          <input
            onChange={InputData}
            name="name"
            placeholder={user.name}
            className={styles.input}
          />
        </div>

        <div>
          <div>
            <label className={styles.label}>아이디</label>
          </div>
          <input
            onChange={InputData}
            name="id"
            placeholder={user.id}
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>비번</label>
        </div>
        <div>
          <input
            onChange={InputData}
            name="password"
            required
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>비번 확인</label>
        </div>
        <div>
          <input
            onChange={CheckPassword}
            name="passworkChek"
            required
            className={styles.input}
          />
          <div>
            {pw ? (
              <p className="text-sm">비밀번호가 일치합니다</p>
            ) : (
              <p className="text-sm">비밀번호가 일치하지 않습니다 </p>
            )}
          </div>
        </div>

        <div>
          <label className={styles.label}>전화번호</label>
        </div>
        <div>
          <input
            onChange={InputData}
            name="phone"
            required
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>이메일</label>
        </div>
        <div>
          <input
            name="email"
            placeholder={user.email}
            className={styles.input}
          />
        </div>
      </div>

      <button onClick={UpdateUser} className={styles.button}>
        회원 수정
      </button>
    </div>
  );
}

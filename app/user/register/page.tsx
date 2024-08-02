"use client"

import { useState } from "react";
import axios from 'axios';

import styles from "./register.module.css";

export default function Register() {

    const [user, setUser] = useState({
        name: null,
        id: null,
        password: null,
        phone: null,
        email: null
    });

    const [pw, checkPw] = useState(false);

    const InputData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => {
            return {
                ...prev, [event.target.name]: event.target.value
            };
        });
    }

    //ID 중복 확인
    const DuplicateId = async () => {
        const data = user.id;

        try {
            await axios.get(`https://ao-rztme.run.goorm.site/user/checkDuplicatedId`, { data })
                .then((res) => {
                    if (res.status === 200) {
                        alert("사용가능한 ID입니다")
                    }
                    console.log(res)
                })
        } catch (error) {
            console.error(error);
            alert(error)
        }

    }

    //비밀번호 일치 확인
    const CheckPassword = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (user.password === event.target.value) {
            checkPw(true);
        }
        else {
            checkPw(false)
        }
    }

    //회원가입
    const RegisterUser = async () => {
        const data = user;

        try {
            await axios.post(`https://ao-rztme.run.goorm.site/user/signUp`, { data })
                .then((res) => {
                    if (res.status === 200) {
                        alert("회원가입완료")
                    }
                    console.log(res)
                })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.asdf}>
            <h2 className={styles.title}>회원가입</h2>
            <p className={styles.description}>서비스 이용을 위해 아래 정보를 입력해주세요</p>
            <div>
                <div className={styles.block}>
                    <div>
                        <label className={styles.label}>이름</label>
                    </div>
                    <div>
                        <input
                            onChange={InputData} name="name" required
                            className={styles.inputs} placeholder="실명을 입력해주세요."/>
                    </div>
                </div>
                <div className={styles.block}>
                    <div>
                        <label className={styles.label}>아이디</label>
                    </div>
                    <div className={styles.id}>
                        <input onChange={InputData} name="id" required
                            className={styles.inputs} placeholder="아이디를 입력해주세요."/>
                        <button onClick={DuplicateId} className={styles.duplit}>중복확인</button>
                    </div>
                </div>
                <div className={styles.block}>
                    <div>
                        <label className={styles.label}>비밀번호</label>
                    </div>
                    <div>
                        <input onChange={InputData} name="password" required
                            className={styles.inputs} placeholder="8자 이상의 영문, 숫자를 사용해주세요." type="password"/>
                    </div>
                    <div>
                        <label className={styles.label}>비밀번호 확인</label>
                    </div>
                    <div>
                        <input onChange={CheckPassword} name="passworkChek" required
                            className={styles.inputs} placeholder="비밀번호 확인을 위해 재입력 해주세요." type="password"/>
                        <div className={styles.description}>{pw ? <p>비밀번호가 일치합니다</p> : <p className={styles.wrongpw}>비밀번호가 일치하지 않습니다 </p>}</div>
                    </div>
                </div>
                <div className={styles.block}>
                    <div>
                        <label className={styles.label}>이메일</label>
                    </div>
                    <div>
                        <input onChange={InputData} name="email" required
                            className={styles.inputs} placeholder="이메일을 입력해주세요."/>
                    </div>
                </div>
                <div className={styles.block}>
                    <div>
                        <label className={styles.label}>전화번호</label>
                    </div>
                    <div>
                        <input onChange={InputData} name="phone" required
                            className={styles.inputs} placeholder="숫자만 입력해주세요."/>
                    </div>
                </div>
                <button className={styles.button} onClick={RegisterUser}>회원가입</button>
            </div>
        </div>
    )
}
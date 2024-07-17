"use client"

import { useCallback, useState } from "react";
import axios from 'axios';

import styles from "./register.module.css";

export default function register() {

    const [user, setUser] = useState({
        name: "",
        id: "",
        password: "",
        phone: "",
        email: ""
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
        <div>
            <h2 className={styles.input}>회원가입</h2>
            <p>서비스 이용을 위해 아래 정보를 입력해주세요</p>
            <div>
                <div>
                    <label>이름</label>
                </div>
                <div>
                    <input
                        onChange={InputData} name="name" placeholder="이름" required
                        className="input" />
                </div>

                <div>
                    <div>
                        <label className="text-xl ">아이디</label>
                    </div>
                    <input onChange={InputData} name="id" placeholder="아이디" required
                        className="border-b-2 border-lime-200" />
                    <button onClick={DuplicateId}>중복확인</button>
                </div>
                <div>
                    <label>비번</label>
                </div>
                <div>
                    <input onChange={InputData} name="password" required
                        className="border-b-2 border-lime-200" />
                </div>


                <div>
                    <label>비번 확인</label>
                </div>
                <div>
                    <input onChange={CheckPassword} name="passworkChek" required
                        className="border-b-2 border-lime-200" />
                    <div>{pw ? <p className="text-sm">비밀번호가 일치합니다</p> : <p className="text-sm">비밀번호가 일치하지 않습니다 </p>}</div>
                </div>

                <div>
                    <label>전화번호</label>
                </div>
                <div>
                    <input onChange={InputData} name="phone" required
                        className="border-b-2 border-lime-200" />
                </div>

                <div>
                    <label>이메일</label>
                </div>
                <div>
                    <input onChange={InputData} name="email" required
                        className="border-b-2 border-lime-200" />
                </div>
            </div>

            <button onClick={RegisterUser} className="m-auto">회원가입</button>
        </div>
    )
}
"use client"

import { useState } from "react";
import axios from "axios";

export default function find() {

    const [user, setUser] = useState({});

    const [id, getid] = useState();

    const InputData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => {
            return {
                ...prev, [event.target.name]: event.target.value
            };
        });
    }

    //아이디 찾기
    const FindId = async () => {
        const data = user;

        try {
            await axios.post(`https://ao-rztme.run.goorm.site/user/findId`, { data })
                .then((res) => {
                    if (res.status === 200) {
                        alert("ID")
                        getid(res.data);
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    //비번 찾기 -> 재설정할것인지
    const FindPassword = async () => {
        const data = user;

        try {
            await axios.post(`https://ao-rztme.run.goorm.site/user/findPassword`, { data })
                .then((res) => {
                    if (res.status === 200) {
                        alert("비밀번호")
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div>
            <h1>아이디비번찾기</h1>
            <div>
                <label>아이디찾기</label>
                <p>
                    <input onChange={InputData} name="email" />
                    <button onClick={FindId}>찾기</button>
                </p>
            </div>
            <div>
                <label>비번찾기</label>
                <p>
                    <input onChange={InputData} name="email" />
                    <input onChange={InputData} name="id" />
                    <button onClick={FindPassword}>찾기</button>
                </p>
            </div>
        </div>

    )
}
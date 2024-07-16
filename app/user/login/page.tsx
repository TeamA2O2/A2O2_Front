"use client"

import { useState } from "react";
import axios from "axios";

export default function login() {

    // 완료시 로컬스토리지 저장

    const [user,setUser]=useState({
        id:"",
        password: ""
    });

    const InputData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => {
            return {
                ...prev,[event.target.name]:event.target.value
            };
        });
    }

    const LoginUser = async () => {
        const data = user;

        try{
            await axios.post(`https://ao-rztme.run.goorm.site/user/signIn`,{data})
            .then((res)=> {
                if(res.status===200){
                    alert("로그인완료");
                    localStorage.setItem("Id",user.id);
                }
                console.log(res)
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>로그인</h1>
            <div>
                <div>
                <label>아이디</label>
                <input onChange={InputData} name="id" />
                </div>
                <div>
                <label>비번</label>
                <input onChange={InputData} name="password" />
                </div>
            </div>
            <button onClick={LoginUser}>로그인</button>
        </div>
    )
}
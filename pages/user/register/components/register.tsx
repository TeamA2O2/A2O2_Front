import { useCallback, useState } from "react";
import axios from 'axios';


export default function register() {

    function check() {
        console.log(user);
    }

    const [user,setUser]=useState({
        // name:"",
        // id:"",
        // password:"",
        // phone:"",
        // email:""
    });

    const InputData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => {
            return {
                ...prev,[event.target.name]:event.target.value
            };
        });
    }

    const RegisterUser = async () => {
        const data = user;

        try{
            await axios.post(`https://ao-rztme.run.goorm.site/user/signUp`,{data})
            .then((res)=> {
                console.log(process.env.Back_URL)
                console.log(res)
            })
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div>
            <h1>회원가입</h1>
            <div>
            <div>
                <label>이름</label>
                <input onChange={InputData} name="name" placeholder="이름" />
                </div>
                <div>
                <label>아이디</label>
                <input onChange={InputData} name="id" placeholder="아이디" />
                </div>
                
                <div>
                <label>비번</label>
                <input onChange={InputData} name="password"/>
                </div>
                
                <div>
                <label>비번확인</label>
                <input type="string" />
                </div>
                
                <div>
                <label>전화번호</label>
                <input onChange={InputData} name="phone" />
                </div>
                
                <div>
                <label>이메일</label>
                <input onChange={InputData} name="email" />
                </div>
                
            </div>
            <button onClick={RegisterUser} ></button>
        </div>
    )
}
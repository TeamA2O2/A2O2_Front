"use client"

import { useCallback, useState } from "react";
import axios from 'axios';


export default function register() {

    const [user,setUser]=useState({
        name:"",
        id:"",
        password:"",
        phone:"",
        email:""
    });

    const [id,setId] = useState();

    const [pw,checkpw]= useState(false);

    function check() {
        console.log(user);
    }

    const InputData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => {
            return {
                ...prev,[event.target.name]:event.target.value
            };
        });
    }

    const DuplicateId = async () => {
        const data = id;
        
        try{
            await axios.post(`https://ao-rztme.run.goorm.site/user/checkDuplicatedId`,{data})
            .then((res)=> {
                if(res.status===200){
                    alert("사용가능한 ID입니다")
                }
                console.log(process.env.Back_URL)
                console.log(res)
            })
        } catch (error) {
            console.error(error);
            alert(error)
        }

    }

    const CheckPassword = async (event: React.ChangeEvent<HTMLInputElement>) =>{
        if(user.password===event.target.value){
            checkpw(true);
        }
        else{
            checkpw(false)
        }
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
        <div className="m-2 p-2">
            <h2 className="text-xl">회원가입</h2>
            <p>서비스 이용을 위해 아래 정보를 입력해주세요</p>
            <div>
            <div>
                <label>이름</label>
                <input 
                onChange={InputData} name="name" placeholder="이름" 
                className="border-2 border-green-500"
                />
                </div>
                <div>
                <label>아이디</label>
                <input onChange={()=>{InputData,setId}} name="id" placeholder="아이디" />
                <button onClick={DuplicateId}>중복확인</button>
                </div>
                
                <div>
                <label>비번</label>
                <input onChange={InputData} name="password"/>
                </div>
                
                <div>
                <label>비번확인</label>
                <input onChange={CheckPassword} name="passworkChek" />
                <div>{pw ? <p>비밀번호가 일치합니다</p>:<p>비밀번호가 일치하지 않습니다 </p>}</div>
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
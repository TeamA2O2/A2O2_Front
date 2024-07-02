import { useCallback, useState,useNavigate } from "react";
import axios from 'axios';


export default function register() {

    const navigate = useNavigate();

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

    const [id,setId] = useState();

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
                console.log(process.env.Back_URL)
                console.log(res)
            })
        } catch (error) {
            console.error(error);
            alert(error)
        }

    }

    const RegisterUser = async () => {
        const data = user;

        try{
            await axios.post(`https://ao-rztme.run.goorm.site/user/signUp`,{data})
            .then((res)=> {
                console.log(process.env.Back_URL)
                console.log(res)
                navigator(-1)
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
                <input onChange={InputData,setId} name="id" placeholder="아이디" />
                <button onClick={DuplicateId}>중복확인</button>
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
"use client"

import { Router } from "next/router";
import { useState } from "react";

export default function info() {


    const [list, getList] = useState([
        { id: 1 },
        { id: 2 },
    ]);

    const [user, setUser] = useState({});

    //info /list 구분해서? 한번에?
    const getUserFundingList = async () => {
        try {
            await fetch(`https://ao-rztme.run.goorm.site/user/info/list`)
                .then(async (res) => {
                    if (res.status === 200) {
                        const data = res.data;
                        await setUser(data);
                        await fetch(`https://ao-rztme.run.goorm.site/user/info/list` + data.funding)
                            .then(async (res) => {
                                const list = res.data;
                                await getList(data);
                            })
                    }
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    //펀딩삭제
    const deleteFunding = async () => {
        try{
            await fetch(`https://ao-rztme.run.goorm.site/funding/delete`)
            .then(async(res)=> {
                if(res.status===200){
                    alert("펀딩이 삭제되었습니다")
                }
                else{

                }
            })
        } catch(error){

        }
    }

    //펀딩 수정페이지로 라우팅
    const updateFunding = async () => {
        // try{
        //     await fetch(`https://ao-rztme.run.goorm.site/funding`)
        // }
        alert("펀딩작성페이지로 이동")
    }

    return (
        <div>
            <h1>이름</h1>
            <div>이미지</div>
            <div>
                {
                    list.map((item, index) => {
                        return (
                            <div>
                                <h3>{item.id}</h3>
                                <h3>진행도 바</h3>
                                <div>
                                    <button onClick={updateFunding}>수정</button>
                                    <button onClick={deleteFunding}>삭제</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
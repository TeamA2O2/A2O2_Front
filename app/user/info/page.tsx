"use client"

import { useState } from "react";

export default function info() {

    const [list, getList] = useState([{
        id:1
    },{id:2}]);

    const [user,setUser] = useState({});

    const getFundinglist = async () => {
        try {
            await fetch(`https://ao-rztme.run.goorm.site/user/info`)
                .then(async (res) => {
                    const data = res.data.list;

                    await getList(data);

                })

        } catch (error) {

        }
    }

    return (
        <div>
            <h1>이름 </h1>
            <div>이미지</div>
            <div>
                {
                    list.map((item, index) => {
                        return (
                            <div>
                                <h3>상품명</h3>
                                <h3>진행도 바</h3>
                                <div>
                                    <button>수정</button>
                                    <button>삭제</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
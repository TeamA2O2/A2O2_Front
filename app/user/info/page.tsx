"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function Info() {
  const router = useRouter();

  const [list, getList] = useState([{ id: 38 }, { id: 39 }]);

  const [user, setUser] = useState({});

  //info /list 구분해서? 한번에?
  const getUserFundingList = async () => {
    const data = user;
    try {
      await fetch(
        `https://ao-rztme.run.goorm.site/user/getUserData` + data
      ).then(async (res) => {
        if (res.status === 200) {
          const data = res;
          await setUser(data);
          await axios
            .post(`https://ao-rztme.run.goorm.site/finding/viewList` + data)
            .then(async (res) => {
              const list = res;
              //await getList(list);
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //펀딩삭제
  const deleteFunding = async () => {
    try {
      await fetch(`https://ao-rztme.run.goorm.site/funding/delete`).then(
        async (res) => {
          if (res.status === 200) {
            alert("펀딩이 삭제되었습니다");
          } else {
          }
        }
      );
    } catch (error) {}
  };

  //펀딩 수정페이지로 라우팅
  const updateFunding = (id: number) => {
    router.push(`/funding/create?id=${id}`);
  };

  return (
    <div>
      <h1>이름</h1>
      <div>이미지</div>
      <div>
        {list.map((item, index) => {
          return (
            <div key={index}>
              <h3>{item.id}</h3>
              <h3>진행도 바</h3>
              <div>
                <button onClick={() => updateFunding(item.id)}>수정</button>
                <button onClick={deleteFunding}>삭제</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

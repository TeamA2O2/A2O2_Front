"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Info() {
  const router = useRouter();

  //var userid = localStorage.getItem("Id")

  const [list, getList] = useState([]);

  const [userId, getUser] = useState({userId:"doyeon"});
  const [isCallLists, setIsCallLists] = useState(false);
  

  useEffect(() => {
    const data=userId;
    const getData = async () => {
      // await axios.get(`https://ao-rztme.run.goorm.site/user/getUserData/`+data.userId )
      //   .then((res) => {
      //     try {
      //       console.log(res.data.data)
      //       getUser(res.data.data)
      //     } catch {
      //       return;
      //     }})
      await axios.post(`https://ao-rztme.run.goorm.site/funding/viewList` , {data})
        .then((res) => {
          try {
            console.log(res.data)
            getList(res.data)
            setIsCallLists(true)

          } catch {
            return;
          }})
      }
    getData();
    },[])

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
    } catch (error) { }
  };

  //펀딩 수정페이지로 라우팅
  const updateFunding = (id: number) => {
    router.push(`/funding/create?id=${id}`);
  };

  return (
    <div>
      <h1>{userId.userId}</h1>
      <div>이미지</div>
      <div>
        {
        (list&&list.length == 0)
        ?
        <div>
          펀딩을 작성해보세요
        </div>
        :
        list.map((item, index) => {
          return (
            <div key={index}>
              <h3>{item.title}</h3>
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

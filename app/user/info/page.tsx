"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./info.module.css";

export default function Info() {
  const router = useRouter();

  const [list, getList] = useState([
    {
      id: 0,
      image: "",
      item: "",
      money: 0,
      price: 0,
      title: "",
    },
  ]);

  const [userId, getUser] = useState({
    email: "",
    id: "",
    image: "" || null || undefined,
    name: "",
    phone: "",
  });
  const [isCallLists, setIsCallLists] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("Id");
    console.log(data);
    const getData = async () => {
      await axios
        .get(`https://ao-rztme.run.goorm.site/user/getUserData/` + data)
        .then((res) => {
          try {
            console.log(res.data.data);
            getUser(res.data.data);
          } catch {
            return;
          }
        });
      await axios
        .post(`https://ao-rztme.run.goorm.site/funding/viewList`, {
          data: {
            userId: data,
          },
        })
        .then((res) => {
          try {
            console.log(res.data);
            getList(res.data);
            setIsCallLists(true);
          } catch {
            return;
          }
        });
    };
    getData();
  }, []);

  //펀딩삭제
  const deleteFunding = async (id: Number) => {
    try {
      await fetch(`https://ao-rztme.run.goorm.site/funding/delete` + id).then(
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

  const createFunding = () => {
    router.push(`/funding/create`);
  };

  const updateUser = () => {
    router.push(`/user/info/update`);
  };

  const detailPage = (id: Number) => {
    router.push(`/funding/detail/${id}`);
  };
  return (
    <div>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <span>마이페이지</span>
          <span onClick={updateUser}>개인정보수정</span>
        </div>
        <div className={styles.line1}></div>
        {userId && (
          <div className={styles.profileContent}>
            <div className={styles.profileDetails}>
              <p className={styles.name}>{userId.id}</p>
              <p className={styles.email}>{userId.email}</p>
            </div>
            <img
              alt="user 이미지"
              src={userId.image}
              className={styles.profilePicture}
            ></img>
          </div>
        )}
      </div>
      <p className={styles.text1}>나의 펀딩 횟수</p>
      <div className={styles.myFunding}>
        <span className={styles.times}>{list.length}회</span>
        <span onClick={createFunding}>
          <button className={styles.fundingBtn}>펀딩하기</button>
        </span>
      </div>
      <div className={styles.line2}></div>
      <div>
        {list && list.length == 0 ? (
          <div>펀딩을 작성해보세요</div>
        ) : (
          list.map((item, index) => {
            return (
              <div
                id={"itemContainer"}
                key={index}
                className={styles.itemContainer}
                onClick={() => detailPage(item.id)}
              >
                <img
                  src={`https://ao-rztme.run.goorm.site/images/${item.image}`}
                  className={styles.itemImg}
                ></img>
                <div className={styles.itemDetails}>
                  <div className={styles.titlePrice}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemPrice}>{item.price}원</p>
                  </div>
                  <div className={styles.itemPercent}>
                    {((item.money / item.price) * 100).toFixed(2)}%
                  </div>
                  <div className={styles.progressContainer}>
                    <div
                      className={styles.progressBar}
                      style={{ width: `${(item.money / item.price) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className={styles.buttons}>
                  <button
                    className={styles.editBtn}
                    onClick={() => updateFunding(item.id)}
                  ></button>
                  <button
                    className={styles.delBtn}
                    onClick={() => deleteFunding(item.id)}
                  ></button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

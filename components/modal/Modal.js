import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";

const Modal = ({ isOpen, closeModal, message }) => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (message === "추천 펀딩 리스트") {
      fetchFundingList();
    }
  }, [message]);

  const fetchFundingList = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/funding/listItem`
      );
      if (response.status === 200) {
        console.log(response.data);
        setListData(response.data);
        console.log("추천 펀딩 리스트 불러오기 성공");
      }
    } catch (error) {
      console.error("추천 펀딩 리스트 불러오기 오류", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{message}</h2>
        {message === "추천 펀딩 리스트" && (
          <ul>
            {listData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
        <button className="modal-button" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;

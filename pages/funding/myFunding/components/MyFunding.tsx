import React from "react";
import FundingList from "./FundingList";

const MyFunding: React.FC = () => {
  return (
    <div>
      <h1>회원 페이지</h1>
      <div>
        <div>
          <div>
            <img
              src="https://cdn.esquimaltmfrc.com/wp-content/uploads/2015/09/flat-faces-icons-circle-man-6.png"
              alt="Profile Icon"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div>
            <FundingList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFunding;

import React, { useContext } from "react";
import tokenIcon from "../assets/Golden-Ticket-icon.png";
import { ApiContext } from "../js/api";

function MyPoints({ tab1 }) {
  const { userInfo } = useContext(ApiContext);

  return (
    <div className={tab1 ? "my-points-tab1" : "my-points"}>
      {tab1 ? (
        <>
          <div className="my-points-category d-flex al-center jc-center gap-1">
            My Category:{" "}
            {userInfo?.level == 1 ? (
              <span className="c-yellow fw-bold"> S</span>
            ) : userInfo?.level == 2 ? (
              <span className="c-yellow fw-bold"> A</span>
            ) : userInfo?.level == 3 ? (
              <span className="c-yellow fw-bold"> B</span>
            ) : userInfo?.level == 4 ? (
              <span className="c-yellow fw-bold"> C</span>
            ) : userInfo?.level == 5 ? (
              <span className="c-yellow fw-bold"> Rejected</span>
            ) : (
              <span className="c-yellow fw-bold"> Not Categorized</span>
            )}
          </div>
          <div className="my-points-collected d-flex al-center jc-center">
            My Points Collected: {userInfo?.watchPoints ? userInfo?.watchPoints : "0"}
          </div>
        </>
      ) : (
        <>
          <div className="my-points-category d-flex fd-column al-center jc-center">
            Available Tokens <br />
            <div className="d-flex al-center gap-1">
              <span>Balance: {userInfo?.surplusTokens ? userInfo?.surplusTokens : "0"}</span> <img className="w-4vw" src={tokenIcon} alt="" />
            </div>
          </div>
          <div className="my-points-category d-flex fd-column al-center jc-center">
            Total Weekly Tokens <br />
            <div className="d-flex al-center gap-1">
              <span>Collected: {userInfo?.totalTokens ? userInfo?.totalTokens : "0"}</span> <img className="w-4vw" src={tokenIcon} alt="" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MyPoints;

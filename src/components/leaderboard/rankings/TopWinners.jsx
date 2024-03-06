import React, { useContext } from "react";
import unknown from "../../../assets/unknown.png";
import frame from "../../../assets/winners-frame.png";
import first from "../../../assets/1st.png";
import second from "../../../assets/2nd.png";
import third from "../../../assets/3rd.png";
import { captureImageError, currencySlang, estimatedBeans } from "../../../js/helpers";
import { baserUrl } from "../../../js/baserUrl";
import beanIcon from "../../../assets/bean.png";
import starIcon from "../../../assets/star-icon.png";
import { ApiContext } from "../../../js/api";

function TopWinners({ userName, userScore, userAvatar, userId, index, userLevel, actorLevel, categ, tab1, tab2, expectBeans, delight, gallery }) {
  const { userInfo } = useContext(ApiContext);
  let beansPot;
  let levelUrl;
  let level;
  if (tab1) {
    beansPot = userInfo?.actorRankBeansPot ? userInfo?.actorRankBeansPot : 0;
    levelUrl = `${baserUrl}streamkar/common/img/tlv/`;
    level = actorLevel;
  } else if (tab2) {
    beansPot = userInfo?.tokensRankBeansPot ? userInfo?.tokensRankBeansPot : 0;
    if (delight) {
      levelUrl = `${baserUrl}streamkar/common/img/ulv/`;
      level = userLevel;
    } else {
      levelUrl = `${baserUrl}streamkar/common/img/tlv/`;
      level = actorLevel;
    }
  }
  let rank = index + 1;

  return (
    <div className="innerData p-rel f-Heinemann">
      <img
        className="rank p-abs w-10vw"
        style={delight ? { top: "20vw" } : { top: "28vw" }}
        src={rank == 1 ? first : rank == 2 ? second : third}
        alt=""
      />
      <div className={rank == 1 ? "first-user" : "runner-user"}>
        <img onError={captureImageError} className="rank-user-image" src={userAvatar ? userAvatar : unknown} alt="" />
        <a href={`http://www.kktv1.com/m/?roomid=${userId}`}>
          <img className="rank-border-image p-rel" src={frame} alt="" />
        </a>
      </div>
      <div className="bottom-data">
        <div className="bottom-info">
          <div className="username">{userName && userName.slice(0, 12)}</div>
          <img style={tab1 || (tab2 && gallery) ? { width: "7vw" } : { width: "12vw" }} src={levelUrl + level + ".png"} alt="" />
        </div>
        <div className="score-box d-flex fd-column al-center">
          {delight ? null : (
            <div className="score d-flex al-center fd-column">
              <span>Est. rewards</span>
              <div className="d-flex al-center jc-center">
                <img style={{ width: "3vw" }} src={beanIcon} alt="" />
                {tab1 ? <span> {estimatedBeans(rank, beansPot, categ, tab1)}</span> : <span>{expectBeans ? expectBeans : 0}</span>}
              </div>
            </div>
          )}
          <div className="points">
            {tab1 ? (
              <>
                {userScore === 1 ? (
                  <span>
                    {currencySlang(userScore)} point <br />
                    received
                  </span>
                ) : (
                  <span>
                    {currencySlang(userScore)} points <br />
                    received
                  </span>
                )}
              </>
            ) : (
              <>
                {userScore === 1 ? (
                  <span>
                    {currencySlang(userScore)}{" "}
                    {delight ? (
                      <>
                        <img style={{ width: "3vw", verticalAlign: "bottom" }} src={starIcon} alt="" /> collected
                      </>
                    ) : (
                      <>
                        Token <br />
                        Collected
                      </>
                    )}
                  </span>
                ) : (
                  <span>
                    {currencySlang(userScore)}{" "}
                    {delight ? (
                      <>
                        <img style={{ width: "3vw", verticalAlign: "bottom" }} src={starIcon} alt="" /> collected
                      </>
                    ) : (
                      <>
                        Tokens <br />
                        Collected
                      </>
                    )}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopWinners;

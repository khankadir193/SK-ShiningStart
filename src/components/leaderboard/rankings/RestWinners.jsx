import React, { useContext } from "react";
import unknown from "../../../assets/unknown.png";
import { baserUrl } from "../../../js/baserUrl";
import { captureImageError, formatData } from "../../../js/helpers";
import { ApiContext } from "../../../js/api";
import beanIcon from "../../../assets/bean.png";
import starIcon from "../../../assets/star-icon.png";
import LeaderBoardSlider from "../../leaderboard-slider/LeaderBoardSlider";

function RestWinners({
  userName,
  userScore,
  userAvatar,
  index,
  userId,
  listNumber,
  userLevel,
  actorLevel,
  tab1,
  tab2,
  tab3,
  desc,
  expectBeans,
  delight,
  gallery,
}) {
  const { userInfo } = useContext(ApiContext);
  let beansPot;
  let levelUrl;
  let level;
  if (tab1) {
    beansPot = userInfo?.actorRankBeansPot;
    levelUrl = `${baserUrl}streamkar/common/img/tlv/`;
    level = actorLevel;
  } else if (tab2) {
    beansPot = userInfo?.tokensRankBeansPot;
    if (delight) {
      levelUrl = `${baserUrl}streamkar/common/img/ulv/`;
      level = userLevel;
    } else {
      levelUrl = `${baserUrl}streamkar/common/img/tlv/`;
      level = actorLevel;
    }
  } else {
    levelUrl = `${baserUrl}streamkar/common/img/ulv/`;
    level = userLevel;
  }
  let arrayDesc = desc && JSON.parse(desc);

  return (
    <div className="users-details-onward" key={index}>
      <div className="d-flex gap-2 al-center p-rel jc-center">
        <div className="rank-id d-flex al-center jc-center">{listNumber}.</div>
        <div className="d-flex al-center gap-2">
          <div className={tab3 ? "frame d-flex al-center jc-center" : ""}>
            <a className="d-flex jc-center al-center" href={`http://www.kktv1.com/m/?roomid=${userId}`}>
              <img onError={captureImageError} className="user-image" src={userAvatar ? userAvatar : unknown} alt="" />
            </a>
          </div>
          <div className="user-info d-flex fd-column">
            <span className="username">{userName && userName.slice(0, 8)}</span>
            <img style={tab1 || (tab2 && gallery) ? { width: "7vw" } : { width: "12vw" }} src={levelUrl + level + ".png"} alt="" />
          </div>
        </div>
      </div>
      {tab1 ? (
        <div className="est-rew d-flex al-center jc-start gap-1">
          <span>
            {userScore} {userScore === 1 ? "Point" : "Points"} Received
          </span>
        </div>
      ) : tab2 ? (
        <div className="d-flex gap-2 al-center">
          {listNumber <= 5 ? (
            <>
              {delight ? null : (
                <div className="d-flex al-center jc-start fd-column" style={{ fontSize: "2vw" }}>
                  Est. rewards
                  <div className="d-flex al-center jc-center">
                    <img style={{ width: "3vw" }} src={beanIcon} alt="" />
                    <span> {expectBeans}</span>
                  </div>
                </div>
              )}
            </>
          ) : null}
          <div className="est-rew d-flex al-center jc-start gap-1">
            <span>
              {userScore}{" "}
              {delight ? (
                <>
                  <img style={{ width: "3vw", verticalAlign: "bottom" }} src={starIcon} alt="" /> collected
                </>
              ) : (
                "Tokens Collected"
              )}
            </span>
          </div>
        </div>
      ) : (
        <div className="est-rew d-flex al-center jc-start gap-1" style={{ width: "35vw" }}>
          <LeaderBoardSlider description={formatData(arrayDesc)} />
        </div>
      )}
    </div>
  );
}

export default RestWinners;

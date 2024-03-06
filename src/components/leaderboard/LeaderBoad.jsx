import React, { useState, useRef } from "react";
import TopWinners from "./rankings/TopWinners";
import RestWinners from "./rankings/RestWinners";
import SeeButton from "./../SeeButton";
import lbHeading from "../../assets/Leaderboard-text.png";
import lbHeading2 from "../../assets/Leaderboard-tag.png";
import lbText from "../../assets/Leaderboard-text2.png";
import Loader from "./../common/Loader";

function LeaderBoard({ delight, gallery, topData, restData, array, categ, tab1, tab2, tab3, isLoading }) {
  const restBoard = useRef(null);
  const [active, setActive] = useState(true);
  const handleChangeActive = () => {
    setActive((previous) => {
      return !previous;
    });
    if (!active) {
      restBoard.current.scrollTop = 0;
    }
  };
  return (
    <div className="leaderboard p-rel" style={tab1 || tab2 ? { paddingTop: "15vw", paddingBottom: "7vw" } : { paddingBottom: "7vw" }}>
      <img
        className="lb-heading p-abs m-auto"
        src={tab1 ? lbHeading : lbHeading2}
        alt=""
        style={tab1 ? { width: "45vw", top: "-4vw" } : { width: "60vw", top: "-10vw" }}
      />
      {delight ? <img style={{ width: "80%", marginBottom: "5vw" }} src={lbText} alt="" /> : null}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="rank-section">
          {tab1 || tab2 ? (
            <>
              {array?.length == 0 ? (
                <p className="no-data f-acme">No Data Found</p>
              ) : (
                <div className="rank-section-inner">
                  <div className="top-position-holders jc-center al-center">
                    {topData?.map(({ nickname, userScore, userLevel, actorLevel, portrait, userId, expectBeans }, index) => {
                      return (
                        <div className="user-container p-rel" key={index} style={delight ? { paddingBottom: "0vw" } : { paddingBottom: "7vw" }}>
                          <TopWinners
                            userName={nickname}
                            userScore={userScore}
                            userAvatar={portrait}
                            userId={userId}
                            index={index}
                            userLevel={userLevel}
                            actorLevel={actorLevel}
                            categ={categ}
                            tab1={tab1}
                            tab2={tab2}
                            expectBeans={expectBeans}
                            delight={delight}
                            gallery={gallery}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div
                    ref={restBoard}
                    className={active ? "rest-position-holders " : "rest-position-holders rest-position-holders-max"}
                    style={{ height: "79vw" }}
                  >
                    {restData &&
                      restData?.map(({ nickname, userScore, userLevel, actorLevel, portrait, userId, expectBeans }, index) => (
                        <div key={index}>
                          <RestWinners
                            userName={nickname}
                            userScore={userScore}
                            userAvatar={portrait}
                            index={index}
                            userId={userId}
                            listNumber={index + 4}
                            userLevel={userLevel}
                            actorLevel={actorLevel}
                            categ={categ}
                            tab1={tab1}
                            tab2={tab2}
                            tab3={tab3}
                            expectBeans={expectBeans}
                            delight={delight}
                            gallery={gallery}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="rank-section-inner" style={{ paddingTop: "10vw", paddingBottom: "3vw" }}>
              <div
                ref={restBoard}
                className={active ? "rest-position-holders " : "rest-position-holders rest-position-holders-max"}
                style={{ height: "115vw" }}
              >
                <>
                  {array?.length == 0 ? (
                    <p className="no-data f-acme">No Data Found</p>
                  ) : (
                    <>
                      {array &&
                        array?.map(({ nickname, userScore, userLevel, actorLevel, portrait, userId, desc }, index) => (
                          <div key={index}>
                            <RestWinners
                              userName={nickname}
                              userScore={userScore}
                              userAvatar={portrait}
                              index={index}
                              userId={userId}
                              listNumber={index + 1}
                              userLevel={userLevel}
                              actorLevel={actorLevel}
                              categ={categ}
                              tab1={tab1}
                              tab2={tab2}
                              tab3={tab3}
                              desc={desc}
                            />
                          </div>
                        ))}
                    </>
                  )}
                </>
              </div>
            </div>
          )}

          {array?.length > 10 || restData?.length > 10 ? <SeeButton active={active} handleChangeActive={handleChangeActive} /> : null}
        </div>
      )}
    </div>
  );
}

export default LeaderBoard;

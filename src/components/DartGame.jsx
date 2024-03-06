import React, { useState, useContext } from "react";
import shootBtn from "../assets/Shoot-btn.gif";
import wheel from "../assets/dart_wheel/Wheel.png";
import wheelStand from "../assets/Wheel-Stand.png";
import chances from "../assets/10K-beans-chance.png";
import { angleFunc, arrows, callDartApi, overFlowAuto, overFlowHidden, successAlert, unsuccessAlert } from "../js/helpers";
import RewardsHistory from "./popups/RewardsHistory";
import { ApiContext } from "../js/api";
import { baserUrl } from "../js/baserUrl";
import uhOh from "../assets/popups/Uh-Oh.png";
import yayy from "../assets/popups/Yay.png";
import oops from "../assets/popups/oops.png";
import closeButton from "../assets/close-Button.png";
import errIcon from "../assets/error.png";
import { rewardImages } from "../js/data";

function DartGame({ giftIcon, openHistory, history, sethistory, loadMoreHistory, isLoading, gameRecords, setLoadMore }) {
  const [alert, setAlert] = useState(false);
  const [alertpopup, setAlertpopup] = useState([]);
  const [input, setInput] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("Max value = 99");
  const [errorIcon, setErrorIcon] = useState(false);
  const [arrowValue, setarrowValue] = useState("");
  const [success, setsuccess] = useState(false);
  const { userId, userToken, userInfo, refreshApi } = useContext(ApiContext);

  let chancesLeft = userInfo?.gamePoints;
  let myChances = Math.floor(chancesLeft / 10000);
  let description = arrowValue && arrowValue[0];

  const handleInput = (event) => {
    let value = event.target.value;
    let max = myChances < 99 ? myChances : 99;
    let val = value.replace(/[^0-9]/g, "");
    let number = parseInt(val) > max ? max : parseInt(val) <= 0 ? 1 : parseInt(val);
    setInput(number);
    if (event.target.value === "") {
      setError("Enter some value");
      setButtonDisabled(true);
    } else if (
      value === `${max}.0` ||
      value === `${max}.00` ||
      value === `${max}.000` ||
      value === `${max}.0000` ||
      value === `${max}.00000` ||
      value === `${max}.000000` ||
      value === `${max}.0000000` ||
      value === `${max}.00000000` ||
      value === `${max}.000000000` ||
      value === `${max}.0000000000`
    ) {
      setInput(number);
      setError("Wrong input value");
      setErrorIcon(true);
      setButtonDisabled(true);
    } else {
      setErrorIcon(false);
      setError("Max value = 99");
      setButtonDisabled(false);
    }
  };

  const close = () => {
    overFlowAuto();
    setButtonDisabled(false);
    setAlert(false);
    setsuccess(false);
    setarrowValue("");
    setInput(1);
    sethistory(false);
    setLoadMore(1);
  };

  const shootDart = () => {
    setButtonDisabled(true);
    if (myChances < 1) {
      setAlert(true);
      setAlertpopup(
        unsuccessAlert(
          uhOh,
          <div className="w-100 d-flex al-center jc-center">
            To play the dart game, Please spend 10,000 beans on event gifts and start aiming. We're waiting to see you play. Come soon!
          </div>
        )
      );
      overFlowHidden();
    } else {
      callDartApi(`${baserUrl}api/activity/shiningStar/playGame?type=2&playCount=${input}`, userId, userToken)
        .then(function (response) {
          if (response.msg === "success") {
            setarrowValue(response?.data?.rewardDTOList.map((item) => item?.desc));
            setTimeout(() => {
              setAlert(true);
              setAlertpopup(
                successAlert(
                  yayy,
                  <div>
                    You aimed it with perfection & won
                    <div className="rews-box d-flex al-start jc-center">
                      {response?.data?.rewardDTOList.map((item, index) => {
                        return (
                          <div className="d-flex al-center jc-center fd-column gap-2" key={index} style={{ width: "20vw" }}>
                            <img src={rewardImages(item?.desc)} alt="" />
                            <div className="name c-yellow">
                              <div className="c-yellow">{item.desc}</div>x{" "}
                              {item?.desc == "Beans" ? (
                                item?.count
                              ) : (
                                <>
                                  {item.count} {item.count === 1 ? "day" : "days"}
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              );
              setsuccess(true);
              overFlowHidden();
              refreshApi();
              setarrowValue("");
            }, 1200);
          } else if (response.errorCode === 10000004) {
            setAlert(true);
            setAlertpopup(
              unsuccessAlert(
                oops,
                <div>Seems like you have entered more darts than you actually have. Please spend some more beans to play the game.</div>
              )
            );
            overFlowHidden();
          } else {
            setAlert(true);
            setAlertpopup(unsuccessAlert(oops, response.msg));
            overFlowHidden();
          }
        })
        .catch(function (error) {
          setAlert(true);
          setAlertpopup(unsuccessAlert(oops, error.message));
          overFlowHidden();
        });
    }
  };
  return (
    <>
      <div className="dart-game m-auto d-flex al-center jc-center p-rel">
        <img className="gift-icon p-abs" src={giftIcon} alt="" onClick={openHistory} />
        <div className="dart-wheel p-rel d-flex al-center jc-center">
          <img id="dart-img" className="wheel w-50vw p-abs" src={wheel} alt="" />
          <img className="bean-chances p-abs" src={chances} alt="" />
          <img className="stand p-abs w-50vw" src={wheelStand} alt="" />
          <div className="my-chances p-abs">My Darts = {myChances}</div>
          <img id={angleFunc(description)} style={{ position: "absolute", zIndex: "1", width: "30vw" }} src={arrows(description)} alt="" />
        </div>
        <div className="button-section w-100 d-flex jc-sEven al-center p-abs">
          <div className="d-flex jc-center">
            <div className="chances d-flex jc-center al-center">
              <input
                className="input-field"
                placeholder="Type here"
                name="NumInput"
                type="number"
                value={input}
                min={0}
                max={99}
                onChange={handleInput}
              />
            </div>
            <p className="error p-abs">{error}</p>
            <img className="errIcon p-abs" src={errorIcon ? errIcon : null} alt="" />
          </div>
          <div className="play-btn">
            <button disabled={buttonDisabled} onClick={shootDart}>
              <img className={buttonDisabled ? "w-30vw mt-4vw gray-1" : "w-30vw mt-4vw gray-0"} src={shootBtn} alt="" />
            </button>
          </div>
        </div>
      </div>
      <RewardsHistory history={history} close={close} gameRecords={gameRecords} loadMoreHistory={loadMoreHistory} isLoading={isLoading} />

      {/* Popup Box */}
      <div className="overlay" style={{ visibility: alert ? "visible" : "hidden" }}>
        {alert ? (
          <div className="game-popup d-flex al-center jc-center">
            {alertpopup?.map((item) => {
              return (
                <div className={success ? "success p-rel d-flex al-center jc-center " : "unsuccess p-rel d-flex al-center jc-center "}>
                  <div className="head-text p-abs" style={success ? { top: "35vw" } : { top: "14vw" }}>
                    <img src={item?.headtext} alt="" />
                  </div>
                  <div className="content m-auto p-abs d-flex al-center jc-center" style={success ? { top: "50vw" } : { top: "27vw" }}>
                    <div className="body-text d-flex al-center jc-center fd-column">{item.data}</div>
                  </div>
                  <div className="modal-close p-abs" onClick={close}>
                    <img src={closeButton} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default DartGame;

import React, { useState, useContext } from "react";
import tokenIcon from "../assets/Golden-Ticket-icon.png";
import { usersAccessories, usersAccessoriesRewards } from "../js/data";
import { callingApi, overFlowAuto, overFlowHidden, successAlert, unsuccessAlert } from "../js/helpers";
import { baserUrl } from "../js/baserUrl";
import { ApiContext } from "../js/api";
import closeButton from "../assets/close-Button.png";
import oops from "../assets/popups/oops.png";
import yayy from "../assets/popups/Yay.png";
import RewardsHistory from "./popups/RewardsHistory";

function RedeemRewards({ giftIcon, openHistory, history, sethistory, loadMoreHistory, isLoading, gameRecords }) {
  const { userId, userToken, userInfo, refreshApi } = useContext(ApiContext);
  const [selectedData, setSelectedData] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertpopup, setAlertpopup] = useState([]);
  const [success, setsuccess] = useState(false);

  const [daily] = usersAccessoriesRewards?.filter((items) => items.level == selectedData);
  let accessories = usersAccessories;
  let icon = tokenIcon;
  let taskpoints = userInfo?.surplusTokens;
  let points = daily?.voucher;

  const handleClick = (boxIndex) => {
    setSelectedData(boxIndex);
  };

  const close = () => {
    setAlert(false);
    overFlowAuto();
    setButtonDisabled(false);
    setsuccess(false);
    sethistory(false);
  };

  const redeem = () => {
    setButtonDisabled(true);
    if (selectedData) {
      if (taskpoints < points) {
        setAlert(true);
        setAlertpopup(
          unsuccessAlert(
            oops,
            <div>Seems like you have tied to utilize more Tokens than you actually have. Please collect more Tokens by completing daily tasks.</div>
          )
        );
        overFlowHidden();
        setSelectedData();
      } else {
        callingApi(`${baserUrl}api/activity/shiningStar/playGame?type=1&playCount=${selectedData}`, userId, userToken)
          .then((response) => {
            if (response.errorCode === 0) {
              setAlert(true);
              setAlertpopup(
                successAlert(
                  yayy,
                  <div>
                    You've successfully redeemed
                    <div className="d-flex fd-column jc-center al-center">
                      <span className="c-yellow"> {daily.name}</span>
                      <span className="d-flex fd-column jc-center al-center">
                        <img className="rew-img" src={daily.img} alt="" />
                        <span className="c-yellow">x{daily.days}.</span>
                      </span>
                      <span className="bottom-txt">
                        We've deducted <span className="c-yellow"> {daily.voucher} </span>Tokens. Continue doing daily tasks regularly to earn extra
                        Tokens.
                      </span>
                    </div>
                  </div>
                )
              );
              refreshApi();
              overFlowHidden();
              setSelectedData();
              setsuccess(true);
            } else {
              setAlert(true);
              setAlertpopup(unsuccessAlert(oops, <div>{response?.msg}</div>));
              overFlowHidden();
              setSelectedData();
            }
          })
          .catch(() => {
            console.log("error");
          });
      }
    } else {
      setAlert(true);
      setAlertpopup(
        unsuccessAlert(
          oops,
          <div>
            <span>Please select any one rewards box first!</span>
          </div>
        )
      );
      overFlowHidden();
    }
  };

  return (
    <>
      <div className="accessories-store p-rel">
        <img className="gift-icon p-abs" src={giftIcon} alt="" onClick={openHistory} />
        <div className="accessories d-flex ">
          <div className={`box ${selectedData === 1 ? "selected" : ""}`} onClick={() => handleClick(1)}>
            <span className="d-flex jc-center al-center gap-1">
              <span>{accessories.val1}</span> <img className="icon w-5vw" src={icon} alt="" />
            </span>
            <img className="giftImg" src={accessories.img1} alt="" />
          </div>
          <div className={`box ${selectedData === 2 ? "selected" : ""}`} onClick={() => handleClick(2)}>
            <span className="d-flex jc-center al-center gap-1">
              <span> {accessories.val2}</span> <img className="icon w-5vw" src={icon} alt="" />
            </span>
            <img className="giftImg" src={accessories.img2} alt="" />
          </div>
          <div className={`box ${selectedData === 3 ? "selected" : ""}`} onClick={() => handleClick(3)}>
            <span className="d-flex jc-center al-center gap-1">
              <span> {accessories.val3}</span> <img className="icon w-5vw" src={icon} alt="" />
            </span>
            <img className="giftImg" src={accessories.img3} alt="" />
          </div>
          <div className={`box ${selectedData === 4 ? "selected" : ""}`} onClick={() => handleClick(4)}>
            <span className="d-flex jc-center al-center gap-1">
              <span> {accessories.val4}</span> <img className="icon w-5vw" src={icon} alt="" />
            </span>
            <img className="giftImg" src={accessories.img4} alt="" />
          </div>
          <div className="redeemBtn-cont d-flex jc-center al-center">
            <button className="redeemBtn" onClick={redeem} disabled={buttonDisabled}></button>
          </div>
          <div className={`box ${selectedData === 5 ? "selected" : ""}`} onClick={() => handleClick(5)}>
            <span className="d-flex jc-center al-center gap-1">
              <span> {accessories.val5}</span> <img className="icon w-5vw" src={icon} alt="" />
            </span>
            <img className="giftImg" src={accessories.img5} alt="" />
          </div>
          <div className={`box ${selectedData === 6 ? "selected" : ""}`} onClick={() => handleClick(6)}>
            <span className="d-flex jc-center al-center gap-1">
              <span> {accessories.val6}</span> <img className="icon w-5vw" src={icon} alt="" />
            </span>
            <img className="giftImg" src={accessories.img6} alt="" />
          </div>
          <div className={`box ${selectedData === 7 ? "selected" : ""}`} onClick={() => handleClick(7)}>
            <span className="d-flex jc-center al-center gap-1">
              <span> {accessories.val7}</span> <img className="icon w-5vw" src={icon} alt="" />
            </span>
            <img className="giftImg" src={accessories.img7} alt="" />
          </div>
          <div className={`box ${selectedData === 8 ? "selected" : ""}`} onClick={() => handleClick(8)}>
            <span className="d-flex jc-center al-center gap-1">
              <span> {accessories.val8}</span> <img className="icon w-5vw" src={icon} alt="" />
            </span>
            <img className="giftImg" src={accessories.img8} alt="" />
          </div>
        </div>
      </div>
      <RewardsHistory history={history} close={close} gameRecords={gameRecords} loadMoreHistory={loadMoreHistory} isLoading={isLoading} />

      {/* Popup Box */}
      <div className="overlay" style={{ visibility: alert ? "visible" : "hidden" }}>
        {alert ? (
          <div className="game-popup d-flex al-center jc-center">
            {alertpopup?.map((item, i) => {
              return (
                <div className={success ? "success p-rel d-flex al-center jc-center " : "unsuccess p-rel d-flex al-center jc-center "} key={i}>
                  <div className="head-text p-abs" style={success ? { top: "35vw" } : { top: "14vw" }}>
                    <img src={item?.headtext} alt="" />
                  </div>
                  <div className="content m-auto p-abs d-flex al-center jc-center" style={success ? { top: "50vw" } : { top: "27vw" }}>
                    <div className="body-text">{item.data}</div>
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

export default RedeemRewards;

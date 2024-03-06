import React, { useContext, useState } from "react";
import DailyTasks from "../DailyTasks";
import MyPoints from "./../MyPoints";
import DailyProgress from "../DailyProgress";
import RedeemRewards from "../RedeemRewards";
import LeaderBoard from "./../leaderboard/LeaderBoad";
import { overFlowHidden, slicePlease } from "../../js/helpers";
import { ApiContext } from "../../js/api";
import giftIcon from "../../assets/Gift-icon.png";
import { baserUrl } from "../../js/baserUrl";
import axios from "axios";
import Rewards from "../Rewards";

function AccessoriesGallery({ tab2 }) {
  const { userId, getWinner, dailyDelight } = useContext(ApiContext);

  const [history, sethistory] = useState(false);
  const [gameRecords, setgameRecords] = useState([]);
  const [loadMore, setLoadMore] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [subTab, setsubTab] = useState({
    deDelight: true,
    accGallery: false,
  });
  const subTabSwitch = (id) => {
    let newCat = {
      deDelight: false,
      accGallery: false,
    };
    setsubTab({ ...newCat, [id]: true });
  };
  let rankings;
  if (subTab.deDelight) {
    rankings = dailyDelight;
  } else if (subTab.accGallery) {
    rankings = getWinner;
  }
  const array = rankings?.list ? rankings?.list : [];
  const topData = slicePlease(array, 0, 3);
  const restData = slicePlease(array, 3, array.length);

  const openHistory = () => {
    gameRecord();
    sethistory(true);
    overFlowHidden();
  };
  const gameRecord = () => {
    setIsLoading(true);
    axios
      .get(
        `${baserUrl}api/activity/eidF/getRecordInfo?eventDesc=20231211_shiningStar&rankIndex=21&pageNum=${loadMore}&pageSize=10&type=1&userId=${userId}`
      )
      .then((response) => {
        setgameRecords(response?.data);
        setIsLoading(false);
      });
  };
  const loadMoreHistory = () => {
    setLoadMore(loadMore + 1);
    gameRecord();
  };

  return (
    <>
      <DailyTasks />
      <MyPoints />
      <DailyProgress />
      <div className="gallery-sub-btns d-flex jc-s-between al-center">
        <button
          className={subTab.deDelight ? "c-white btn-active-delight" : "c-white btn-delight"}
          onClick={() => subTabSwitch("deDelight")}
        ></button>
        <button
          className={subTab.accGallery ? "c-white btn-active-gallery" : "c-white btn-gallery"}
          onClick={() => subTabSwitch("accGallery")}
        ></button>
      </div>
      {subTab.deDelight ? (
        <Rewards tab2={tab2} delight={subTab.deDelight} />
      ) : (
        <RedeemRewards
          giftIcon={giftIcon}
          openHistory={openHistory}
          history={history}
          sethistory={sethistory}
          loadMoreHistory={loadMoreHistory}
          isLoading={isLoading}
          gameRecords={gameRecords?.data}
        />
      )}
      <LeaderBoard
        tab2={tab2}
        delight={subTab.deDelight}
        gallery={subTab.accGallery}
        topData={topData}
        restData={restData}
        array={array}
        isLoading={isLoading}
      />
    </>
  );
}

export default AccessoriesGallery;

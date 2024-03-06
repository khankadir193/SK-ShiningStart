import React, { useContext } from "react";
import { dailyActivityTasks } from "../js/data";
import rightIcon from "../assets/Right-icon.png";
import wrongIcon from "../assets/Wrong-icon.png";
import { ApiContext } from "../js/api";

function DailyTasks() {
  const { userInfo } = useContext(ApiContext);
  let dailyTasks = userInfo?.taskInfoList;

  return (
    <>
      <div className="daily-activity m-auto d-flex jc-center al-center fd-column">
        <div className="text-box">Do the following tasks daily & gather Tokens to purchase the accessories of your choice.</div>
        <div className="heading d-flex font-bold">
          <span>Sr.</span>
          <span>Tasks</span>
          <span>Tokens</span>
        </div>
        {dailyTasks?.map((data, index) => {
          let statusValue = data?.isComplete;
          const [tokens] = dailyActivityTasks.filter((item) => item.id === data.taskId);
          return (
            <div className="d-flex m-auto w-100 p-rel" key={index}>
              <div className="desc m-auto d-flex w-100">
                <span>{data?.taskId}.</span>
                <span>{data?.desc}</span>
                <span>{tokens?.tokens}</span>
              </div>
              <img className="icon p-abs" src={statusValue == 1 ? rightIcon : wrongIcon} alt="" />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DailyTasks;

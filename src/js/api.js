import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baserUrl } from "./baserUrl";

const ApiContext = createContext();
function EventProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [getWinner, setgetWinner] = useState([]);
  const [dailyDelight, setdailyDelight] = useState([]);
  const [tickerTape, settickerTape] = useState([]);
  const [categS, setcategS] = useState([]);
  const [categA, setcategA] = useState([]);
  const [categB, setcategB] = useState([]);
  const [categC, setcategC] = useState([]);

  const [user, setUser] = useState({
    id: 0,
    uid: 0,
    token: undefined,
  });

  const refreshApi = () => {
    setRefresh(!refresh);
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const nowDate = `${year}-${month}-${day}`;

  useEffect(() => {
    try {
      // window.phone.getUserInfo(function (userInfo) {
      //   setUser({
      //     uid: userInfo.userId > 0 ? userInfo.userId : 0,
      //     token: userInfo.token !== "" ? userInfo.token : null,
      //   });
      // });
      setUser({
        uid: 596492376,
        token: "A1E3187CE0CDFD48CC9FDEDB6FAC2CAFA4",
      });
    } catch (_error) {
      setUser({
        uid: 0,
        token: "",
      });

      console.error("Can't get userInfo by window.phone.getUserInfo");
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (user.uid > 0) {
      axios.get(`${baserUrl}api/activity/shiningStar/getUserEventInfo?userId=${user.uid}`).then((response) => {
        setUserInfo(response.data);
        setIsLoading(false);
      });
    }
  }, [user, refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${baserUrl}api/activity/shiningStar/getTokensRank?pageNum=1&pageSize=20`).then((response) => {
      setgetWinner(response.data);
      setIsLoading(false);
    });
  }, [user, refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20240128_star&rankIndex=11&pageNum=1&pageSize=20&dayIndex=S`)
      .then((response) => {
        setcategS(response.data);
        setIsLoading(false);
      });
  }, [refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20240128_star&rankIndex=11&pageNum=1&pageSize=20&dayIndex=A`)
      .then((response) => {
        setcategA(response.data);
        setIsLoading(false);
      });
  }, [refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20240128_star&rankIndex=11&pageNum=1&pageSize=20&dayIndex=B`)
      .then((response) => {
        setcategB(response.data);
        setIsLoading(false);
      });
  }, [refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20240128_star&rankIndex=11&pageNum=1&pageSize=20&dayIndex=C`)
      .then((response) => {
        setcategC(response.data);
        setIsLoading(false);
      });
  }, [refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${baserUrl}api/activity/eidF/getWinnerRankInfo?eventDesc=20240128_star&pageNum=1&pageSize=20&rankIndex=1`).then((response) => {
      settickerTape(response.data);
      setIsLoading(false);
    });
  }, [refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20240128_star&rankIndex=12&pageNum=1&pageSize=20&dayIndex=${nowDate}`)
      .then((response) => {
        setdailyDelight(response.data);
        setIsLoading(false);
      });
  }, [refresh]);
  return (
    <div>
      <ApiContext.Provider
        value={{
          isLoading,
          setIsLoading,
          refreshApi,
          userId: user.uid,
          userToken: user.token,
          userInfo: userInfo.data,
          getWinner: getWinner?.data,
          categS: categS?.data,
          categA: categA?.data,
          categB: categB?.data,
          categC: categC?.data,
          tickerTape: tickerTape?.data,
          dailyDelight: dailyDelight?.data,
        }}
      >
        {children}
      </ApiContext.Provider>
    </div>
  );
}

export { ApiContext, EventProvider };

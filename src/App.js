import React, { useState, useEffect, useContext } from "react";
import Register from "./components/registration/Register";
import header from "./assets/register_page/Header.gif";
import upBtn from "./assets/up-btn.png";
import Footer from "./components/common/Footer";
import TabButtons from "./components/tab-buttons/TabButtons";
import Guide from "./components/popups/Guide";
import LanguageBar from "./components/LanguageBar";
import { ApiContext } from "./js/api";
import "./App.scss";

function App() {
  let [language, setLanguage] = useState("English");
  const [tab1, settab1] = useState(true);
  const [tab2, settab2] = useState(false);
  const [tab3, settab3] = useState(false);
  const { userInfo } = useContext(ApiContext);
  const [showBtnUp, setShowBtnUp] = useState(false);

  useEffect(() => {
    // Define the event handler function
    function handleScroll() {
      // Check if the vertical scroll position is greater than 100 pixels
      setShowBtnUp(window.pageYOffset > 100);
    }

    // Add event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(userInfo, 'userInfo')
  let whetherApply = userInfo && userInfo?.whetherApply;
  console.log('whetherApply...', whetherApply);
  // let stage = userInfo && userInfo?.stage;
  let stage = 1;
  let level = userInfo && userInfo?.level;
  let isPoster = userInfo && userInfo?.havePoster;
  console.log('leve...???', level);
  console.log('isPoster...', isPoster);

  const handleScrollToTop = () => {
    console.log('clicked this funtions...');
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="App">
      <span id="extraContent"></span>
      <img className="header" src={header} alt="" />

      {stage === 1 ? (
        <Register whetherApply={whetherApply} isPoster={isPoster} level={level} />
      ) : stage === 2 && (
        <TabButtons tab1={tab1} settab1={settab1} tab2={tab2} settab2={settab2} tab3={tab3} settab3={settab3} />
      )}

      {showBtnUp && (
        <button className="btn-up" onClick={handleScrollToTop}>
          <img src={upBtn} alt="" />
        </button>
      )}

      <Footer />
      <LanguageBar setLanguage={setLanguage} language={language} />
      <Guide language={language} />
    </div>
  );
}

export default App;

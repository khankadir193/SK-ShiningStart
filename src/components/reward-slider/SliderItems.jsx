import React from "react";
import RewardSlider, { CarouselItem } from "./RewardSlider";
import { categArewards, categBrewards, categCrewards, categSrewards, dailyDelightRewards, rewardImages } from "../../js/data";

function SliderItems({ tab1, tab2, categS, categA, categB, categC, description, count, tab3, listNumber, delight }) {
  let rewards;
  if (tab1 && categS) {
    rewards = categSrewards;
  } else if (tab1 && categA) {
    rewards = categArewards;
  } else if (tab1 && categB) {
    rewards = categBrewards;
  } else if (tab1 && categC) {
    rewards = categCrewards;
  } else {
    rewards = dailyDelightRewards;
  }
  return (
    <>
      {tab3 ? (
        <div className="rewards-slider f-poppin">
          <div className="sliderItem d-flex fd-column f-acme p-rel">
            <RewardSlider>
              <CarouselItem key={listNumber}>
                <div className="d-flex al-center jc-center fd-column">
                  <img style={{ width: "7vw" }} src={rewardImages(description[0])} alt="" />
                </div>
              </CarouselItem>
            </RewardSlider>
          </div>
        </div>
      ) : (
        <div className="rewards-slider f-poppin">
          <div className="sliderItem d-flex fd-column f-acme p-rel">
            <RewardSlider>
              {rewards &&
                rewards?.map((item, i) => {
                  let index = i + 1;
                  return (
                    <CarouselItem key={i}>
                      {delight ? null : (
                        <div className="rank p-abs d-flex fd-column al-center jc-center">
                          <span>Top {item.rank}</span>
                        </div>
                      )}
                      <div className="rewardImg p-abs d-flex al-center jc-center">
                        {item?.frame?.map((_items, index) => (
                          <div
                            className="img-box d-flex al-center jc-center"
                            key={index}
                            style={tab2 ? { width: "22vw", height: "22vw" } : { width: "17vw", height: "17vw" }}
                          >
                            <img src={_items.pic} alt="" key={index} />
                          </div>
                        ))}
                      </div>
                      <div className="desc d-flex fd-column jc-center al-center">{item.desc}</div>
                    </CarouselItem>
                  );
                })}
            </RewardSlider>
          </div>
        </div>
      )}
    </>
  );
}

export default SliderItems;

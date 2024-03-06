import unknown from "../assets/unknown.png";
import axios from "axios";
import rightArrow from "../assets/dart_wheel/l-to-r.gif";
import leftArrow from "../assets/dart_wheel/r-to-l.gif";
let env = 1;

export const overFlowAuto = () => {
  if (typeof window != "undefined" && window.document) {
    document.body.style.overflow = "auto";
  }
};
export const overFlowHidden = () => {
  if (typeof window != "undefined" && window.document) {
    document.body.style.overflow = "hidden";
  }
};
export const currencySlang = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};
export const captureImageError = (event) => {
  event.target.src = unknown;
  return true;
};
export const slicePlease = (array, from, to) => {
  const cutting = array?.slice(from, to);
  return cutting;
};
export const callingApi = async (url, uid, uToken) => {
  if (env == 0) {
    return redeem();
  } else {
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        userId: uid,
        token: uToken,
      },
    };
    const result = await axios.request(config);
    return result.data;
  }
};
export const redeem = () => {
  return {
    errorCode: 0,
    msg: "success",
    data: true,
  };
};
export const successAlert = (yayy, data) => [
  {
    headtext: `${yayy}`,
    data: <>{data}</>,
  },
];
export const unsuccessAlert = (oops, msj) => [
  {
    headtext: `${oops}`,
    data: <>{msj}</>,
  },
];
export const estimatedBeans = (rank, potvalue, categ, tab1) => {
  let beans;
  if (tab1) {
    if (categ.categS) {
      if (rank == 1) {
        beans = Math.floor((potvalue * 22) / 100);
      } else if (rank == 2) {
        beans = Math.floor((potvalue * 16) / 100);
      } else if (rank == 3) {
        beans = Math.floor((potvalue * 14) / 100);
      }
    }
    if (categ.categA) {
      if (rank == 1) {
        beans = Math.floor((potvalue * 10) / 100);
      } else if (rank == 2) {
        beans = Math.floor((potvalue * 9) / 100);
      } else if (rank == 3) {
        beans = Math.floor((potvalue * 8) / 100);
      }
    }
    if (categ.categB) {
      if (rank == 1) {
        beans = Math.floor((potvalue * 6) / 100);
      } else if (rank == 2) {
        beans = Math.floor((potvalue * 5) / 100);
      } else if (rank == 3) {
        beans = Math.floor((potvalue * 4) / 100);
      }
    }
    if (categ.categC) {
      if (rank == 1) {
        beans = Math.floor((potvalue * 3) / 100);
      } else if (rank == 2) {
        beans = Math.floor((potvalue * 2) / 100);
      } else if (rank == 3) {
        beans = Math.floor((potvalue * 1) / 100);
      }
    }
  } else {
    if (rank == 1) {
      beans = Math.floor((potvalue * 22) / 100);
    } else if (rank == 2) {
      beans = Math.floor((potvalue * 16) / 100);
    } else if (rank == 3) {
      beans = Math.floor((potvalue * 14) / 100);
    }
  }

  return beans;
};
export const angleFunc = (angleValue) => {
  let Class;
  if (angleValue.includes("Beans")) {
    Class = "angel1";
  } else if (angleValue.includes("SVIP") || angleValue.includes("svip")) {
    Class = "angel2";
  } else if (angleValue.includes("Victory Slide entrance")) {
    Class = "angel3";
  } else if (angleValue.includes("Phantom entrance")) {
    Class = "angel4";
  } else if (angleValue.includes("VIP")) {
    Class = "angel5";
  } else if (angleValue.includes("Thunder Audio broadcast theme")) {
    Class = "angel6";
  } else {
    Class = "";
  }
  return Class;
};
export const callDartApi = async (url, uid, uToken) => {
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      userId: uid,
      token: uToken,
    },
  };
  const result = await axios.request(config);
  return result.data;
};
export const arrows = (arrowValue) => {
  let arrow;
  if (arrowValue.includes("Beans") || arrowValue.includes("SVIP") || arrowValue.includes("Victory Slide entrance")) {
    arrow = rightArrow;
  } else if (arrowValue.includes("Phantom entrance") || arrowValue.includes("VIP") || arrowValue.includes("Thunder Audio broadcast theme")) {
    arrow = leftArrow;
  } else {
    arrow = null;
  }
  return arrow;
};
export const formatData = (originalArray) => {
  const newArray = [];
  for (let i = 0; i < originalArray?.length; i += 3) {
    newArray?.push(originalArray?.slice(i, i + 3));
  }
  return newArray;
};

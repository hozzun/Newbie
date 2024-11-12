import { GetWeatherResponse } from "../api/weatherApi";
import CustomError from "./CustomError";

export const pty: Record<number, string> = {
    1: "🌧 비",
    2: "🌨 비/눈",
    3: "🌨 눈",
    4: "⛈ 소나기",
};
  
export const sky: Record<number, string> = {
    1: "☀ 맑음",
    2: "🌥 구름많음",
    3: "☁ 흐림",
};

const getFcstTime = (): string => {
    const today = new Date();

    const hours = today.getHours() + 1;

    return `${hours.toString().padStart(2, "0")}00`;
};
  
export const calculateWeather = (items: Array<GetWeatherResponse>): string => {
    let ptyItem = null;
    let skyItem = null;

    const targetTime = getFcstTime();
    for (const item of items) {
        if (item.fcstTime === targetTime) {
        if (item.category === "PTY") {
            ptyItem = item;
        } else if (item.category === "SKY") {
            skyItem = item;
        }
        }
    }

    if (ptyItem && parseInt(ptyItem.fcstValue) > 0) {
        return pty[parseInt(ptyItem.fcstValue)];
    } else if (skyItem) {
        return sky[parseInt(skyItem.fcstValue)];
    } else {
        throw new CustomError("[ERROR] 날씨 데이터 토대로 계산 by HOME");
    }
};
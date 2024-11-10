import axios from "axios";

const getWeatherApiUrl = import.meta.env.VITE_GET_WEATHER;
const weatherDataApiKey = import.meta.env.VITE_WEATHER_DATA_API_KEY;

const RE = 6371.00877;
const GRID = 5.0;
const SLAT1 = 30.0;
const SLAT2 = 60.0;
const OLON = 126.0;
const OLAT = 38.0;
const XO = 210 / GRID;
const YO = 675 / GRID;

export interface GetWeatherRequest {
    nx: number;
    ny: number;
}

export interface GetWeatherResponse {
    baseDate: string;
    baseTime: string;
    category: string;
    fcstDate: string;
    fcstTime: string;
    fcstValue: string;
    nx: number;
    ny: number;
}

const getBaseDate = (): string => {
    const today = new Date();

    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}${month}${day}`
}

const getBaseTime = (): string => {
    const today = new Date();

    let hours = today.getHours();
    let minutes = today.getMinutes();

    if (minutes < 45) {
        hours--;
        minutes = 30;
    } else {
        minutes = 30;
    }

    return `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}`
}

const translatePoint = (nx: number, ny: number): GetWeatherRequest => {
    const DEGRAD = Math.PI / 180.0;

    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);

    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;

    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = re * sf / Math.pow(ro, sn);
    
    let ra = Math.tan(Math.PI * 0.25 + (nx) * DEGRAD * 0.5);
    ra = re * sf / Math.pow(ra, sn);

    let theta = ny * DEGRAD - olon;
    if (theta > Math.PI) {
        theta -= 2.0 * Math.PI;
    }
    if (theta < -Math.PI) {
        theta += 2.0 * Math.PI;
    }
    theta *= sn;

    const resultX = Math.floor(ra * Math.sin(theta) + XO);
    const resultY = Math.floor(ro - ra * Math.cos(theta) + YO);

    return {
        nx: resultX,
        ny: resultY
    }

}

export const getWeather = (request: GetWeatherRequest) => {
    const point = translatePoint(request.nx, request.ny);

    return axios.get<{response: {body: {items: {item: Array<GetWeatherResponse>}}}}>(getWeatherApiUrl, {
        params: {
            serviceKey: weatherDataApiKey,
            pageNo: 1,
            numOfRows: 1000,
            dataType: "JSON",
            base_date: getBaseDate(),
            base_time: getBaseTime(),
            nx: point.nx,
            ny: point.ny
        }
    })
}
interface GeoPoint {
    logitude: number;
    latitude: number;
  }

const Stadiums: Record<string, GeoPoint> = {
    잠실: {
      logitude: 37.512011,
      latitude: 127.071619,
    },
    고척: {
      logitude: 37.498229,
      latitude: 126.866836,
    },
    문학: {
      logitude: 37.436962,
      latitude: 126.693254,
    },
    수원: {
      logitude: 37.299585,
      latitude: 127.009526,
    },
    청주: {
      logitude: 36.638676,
      latitude: 127.470008,
    },
    대전: {
      logitude: 36.316982,
      latitude: 127.429025,
    },
    광주: {
      logitude: 35.168194,
      latitude: 126.889385,
    },
    대구: {
      logitude: 35.84104,
      latitude: 128.681774,
    },
    포항: {
      logitude: 36.007952,
      latitude: 129.359549,
    },
    울산: {
      logitude: 35.532037,
      latitude: 129.265693,
    },
    창원: {
      logitude: 35.222439,
      latitude: 128.582573,
    },
    사직: {
      logitude: 35.193742,
      latitude: 129.061572,
    },
};
  
export default Stadiums;
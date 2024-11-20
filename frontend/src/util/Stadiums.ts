interface GeoPoint {
    longitude: number;
    latitude: number;
  }

const Stadiums: Record<string, GeoPoint> = {
    잠실: {
      longitude: 37.512011,
      latitude: 127.071619,
    },
    고척: {
      longitude: 37.498229,
      latitude: 126.866836,
    },
    문학: {
      longitude: 37.436962,
      latitude: 126.693254,
    },
    수원: {
      longitude: 37.299585,
      latitude: 127.009526,
    },
    청주: {
      longitude: 36.638676,
      latitude: 127.470008,
    },
    대전: {
      longitude: 36.316982,
      latitude: 127.429025,
    },
    광주: {
      longitude: 35.168194,
      latitude: 126.889385,
    },
    대구: {
      longitude: 35.84104,
      latitude: 128.681774,
    },
    포항: {
      longitude: 36.007952,
      latitude: 129.359549,
    },
    울산: {
      longitude: 35.532037,
      latitude: 129.265693,
    },
    창원: {
      longitude: 35.222439,
      latitude: 128.582573,
    },
    사직: {
      longitude: 35.193742,
      latitude: 129.061572,
    },
};
  
export default Stadiums;
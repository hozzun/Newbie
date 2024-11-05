const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API;
const GOOGLE_REST_API_KEY = import.meta.env.VITE_GOOGLE_REST_API;
const NAVER_REST_API_KEY = import.meta.env.VITE_NAVER_REST_API;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&state=STATE_STRING`;

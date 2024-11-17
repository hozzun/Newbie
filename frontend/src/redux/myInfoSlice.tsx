import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../util/axiosInstance';

// 초기 상태
interface MyInfoState {
  nickname: string;
  email: string;
  profileImage: string;
  address: string;
}

const initialState: MyInfoState = {
  nickname: "",
  email: "",
  profileImage: "",
  address: ""
};

// 비동기 API 호출 액션 생성자
export const fetchMyInfo = createAsyncThunk(
  'myInfo/fetchMyInfo',
  async () => {
    const response = await axiosInstance.get('/api-user/users');
    console.log(response.data)
    return response.data;
  }
);

// myInfoSlice 생성
const myInfoSlice = createSlice({
  name: 'myInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyInfo.fulfilled, (state, action) => {
        state.nickname = action.payload.nickname;
        state.email = action.payload.email;
        state.profileImage = action.payload.profileImage;
        state.address = action.payload.address;
      });
  },
});

export default myInfoSlice.reducer;

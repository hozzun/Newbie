import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../util/axiosInstance';

// 초기 상태
interface TeamState {
  team: number;
}

const initialState: TeamState = {
  team: 0,
};

const params = { userId: 5 }

// 비동기 API 호출 액션 생성자
export const fetchTeam = createAsyncThunk(
  'team/fetchTeam',
  async () => {
    const response = await axiosInstance.get('/api-user/users/5/favorite-team', { params });
    return response.data;
  }
);

// teamSlice 생성
const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.team = action.payload; // 숫자값이 반환되면 바로 팀 정보로 저장
      })
  },
});

export default teamSlice.reducer;

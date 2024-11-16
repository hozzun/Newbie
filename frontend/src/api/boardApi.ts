import axiosInstance from "../util/axiosInstance";

const axios = axiosInstance;

// 자유게시판 게시글 전체 조회
export interface GetGeneralBoardResponse {
  id: number;
  userId: number;
  userName: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string; // ISO 8601 날짜 문자열 형식
  updatedAt: string; // ISO 8601 날짜 문자열 형식
  tags: string[];
  commentCount: number;
  likeCount: number;
  scrapCount: number;
  viewCount: number;
}

export const getGeneralBoard = () => {
  return axios.get<GetGeneralBoardResponse[]>("/api-board/general-board");
};

export interface PostGeneralBoardRequest {
  userId: number;
  userName: string;
  title: string;
  content: string;
  tags: string[];
  imageFile?: File;
}

export interface PostGeneralBoardResponse {
  id: number;
  userId: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  commentCount: number;
  likeCount: number;
  scrapCount: number;
  viewCount: number;
}

export const postGeneralBoard = async (data: FormData, params: { userId: number }) => {
  return axios.post<PostGeneralBoardResponse>("/api-board/general-board/create", data, { params });
};

export const getUserProfile = () => {
  return axios.get("/api-user/users/userId"); // userId 수정필요
};
//---------------------------------------------------------------------

// 중고거래 게시글 전체 조회
export interface GetUsedBoardResponse {
  id: number;
  userId: number;
  userName: string;
  title: string;
  content: string;
  price: number;
  region: string;
  imageUrl: string;
  createdAt: string;
  tags: string[];
  likeCount: number;
  commentCount: number;
  scrapCount: number;
}

export const getUsedBoard = () => {
  return axios.get<GetUsedBoardResponse[]>("/api-board/used-board");
};

export interface UsedBoardDto {
  userId: number;
  title: string;
  content: string;
  tags: string[];
  price: number;
  region: string;
}

export interface UsedBoardResponse {
  id: number;
  userId: number;
  userName: string;
  title: string;
  content: string;
  price: number;
  region: string;
  imageUrl: string;
  createdAt: string;
  tags: string[];
  likeCount: number;
  commentCount: number;
  scrapCount: number;
  viewCount: number;
}

export const createUsedBoard = async (formData: FormData): Promise<UsedBoardResponse> => {
  try {
    const response = await axios.post<UsedBoardResponse>("/used-board/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create used board:", error);
    throw error;
  }
};

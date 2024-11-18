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

export interface GetGeneralComment {
  id: number;
  userName: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  replies: string[];
}

export const getGeneralBoard = () => {
  return axios.get<GetGeneralBoardResponse[]>("/api/v1/board/general-board");
};

export const getGeneralBoardDetail = async (id: number) => {
  return axios.get<GetGeneralBoardResponse>(`/api/v1/board/general-board/${id}`, {
    params: { id: id },
  });
};

export const getGeneralComment = async (boardId: number) => {
  return axios.get<GetGeneralComment[]>(`/api/v1/board/general-comment/${boardId}`, {
    params: { boardId: boardId },
  });
};

export interface PostGeneralBoardRequest {
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

export const postGeneralBoard = async (data: FormData) => {
  return axios.post<PostGeneralBoardResponse>("/api/v1/board/general-board/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export interface PostGeneralBoardScrapRequest {
  userId: number; // 사용자 ID
  boardId: number; // 게시글 ID
  boardType: string; // 게시판 유형 ("general" | "used")
}

// 스크랩 API 함수 정의
export const postGeneralBoardScrap = async (data: PostGeneralBoardScrapRequest) => {
  try {
    const response = await axios.post("/api/vi/board/scrap", data);
    return response.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    console.error("Error posting board scrap:", error);
    throw error; // 에러를 호출한 곳으로 전달
  }
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
  return axios.get<GetUsedBoardResponse[]>("/api/v1/board/used-board");
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
    const response = await axios.post<UsedBoardResponse>(
      "/api/v1/board/used-board/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create used board:", error);
    throw error;
  }
};

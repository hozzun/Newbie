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
  profile: string;
  createdAt: string; // ISO 8601 날짜 문자열 형식
  updatedAt: string; // ISO 8601 날짜 문자열 형식
  tags: string[];
  commentCount: number;
  likeCount: number;
  scrapCount: number;
  viewCount: number;
  scrapedByUser: boolean;
  likedByUser: boolean;
}

export interface GetGeneralComment {
  id: number;
  userName: string;
  content: string;
  profile: string;
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

//---------------------------------------------------------------------

// 중고거래 게시글 전체 조회
export interface GetUsedBoardResponse {
  id: number;
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
  scrapedByUser: boolean;
  likedByUser: boolean;
  profile: string;
}

export interface GetUsedComment {
  id: number;
  userName: string;
  content: string;
  imageUrl: string;
  profile: string;
  createdAt: string;
  replies: string[];
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

export const getUsedBoardDetail = async (id: number) => {
  return axios.get<GetUsedBoardResponse>(`/api/v1/board/used-board/${id}`, {
    params: { id: id },
  });
};

export const getUsedComment = async (boardId: number) => {
  return axios.get<GetGeneralComment[]>(`/api/v1/board/used-comment/${boardId}`, {
    params: { boardId: boardId },
  });
};
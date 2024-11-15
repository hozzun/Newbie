import axiosInstance from "../util/axiosInstance";

const axios = axiosInstance;

// 유저 게시글 전체 조회
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

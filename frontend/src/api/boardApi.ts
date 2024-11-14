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

// 유저 게시글 검색 조회
export interface GetUsedBoardRequest {
  keyword: string;
}

export const getUsedSearchBoard = (request: GetUsedBoardRequest) =>
  axios.get<{ content: GetUsedBoardResponse[] }>("/api-board/used-board/search", {
    params: {
      keyword: request.keyword,
    },
  });

// 유저 게시글 조회 (id로 조회)
export const getUsedBoardById = (id: number) => {
  return axios.get<GetUsedBoardResponse>(`/api-board/used-board/${id}`);
};

// 유저 게시글 수정 (id로 수정)
export interface UpdateUsedBoardRequest {
  title: string;
  content: string;
  price: number;
  region: string;
}

export const updateUsedBoard = (id: number, request: UpdateUsedBoardRequest) => {
  return axios.put(`/api-board/used-board/${id}`, request);
};

// 유저 게시글 삭제 (id로 삭제)
export const deleteUsedBoard = (id: number) => {
  return axios.delete(`/api-board/used-board/${id}`);
};

export interface CreateUsedBoardRequest {
  usedBoardDto: {
    userId: number;
    title: string;
    content: string;
    tags: string[];
    imageFile: string;
    price: number;
    region: string;
  };
  imageFile: string;
}

export const createUsedBoard = (request: CreateUsedBoardRequest) => {
  return axios.post("/api-board/used-board/create", request);
};

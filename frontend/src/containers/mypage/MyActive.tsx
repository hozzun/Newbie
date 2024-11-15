import { useState, useEffect } from "react";
import axiosInstance from "../../util/axiosInstance";
import MyActiveLike from "../../components/mypage/MyActiveLike";
import MyActiveComment from "../../components/mypage/MyActiveComment";

interface LikeData {
  type: "like";
  boardId: number;
  createdAt: string;
  title: string;
  onClick: () => void;
}

interface CommentData {
  type: "comment";
  boardId: number;
  content: string;
  createdAt: string;
  onClick: () => void;
}

type ActivityData = LikeData | CommentData;

const MyActive = () => {
  const [activities, setActivities] = useState<ActivityData[]>([]);

  const getActivity = async () => {
    // TODO: userId 수정
    const userId = 5;
    const params = { userId: userId };

    try {
      const response = await axiosInstance.get(`/api-board/user-activity/${userId}`, { params });
      const likesData: LikeData[] = response.data
        .filter((item: { type: string }) => item.type === "like")
        .map((like: Omit<LikeData, "type">) => ({
          ...like,
          type: "like",
        }));

      const commentsData: CommentData[] = response.data
        .filter((item: { type: string }) => item.type === "comment")
        .map((comment: Omit<CommentData, "type">) => ({
          ...comment,
          type: "comment",
        }));

      // createdAt 기준으로 내림차순 정렬
      const combinedData: ActivityData[] = [...likesData, ...commentsData].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setActivities(combinedData);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const deleteActivity = async () => {
    // TODO: userId 수정, activityId가 뭔데 ..
    const userId = 5;
    const activityId = 1;
    const params = { userId: userId, activityId: activityId };

    try {
      const response = await axiosInstance.delete(`/api-board/user-activity/${activityId}`, {
        params,
      });
      console.log(response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const deleteAct = () => {
    deleteActivity();
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <>
      {activities.length > 0 ? (
        activities.map(activity =>
          activity.type === "like" ? (
            <div key={activity.boardId} onClick={() => console.log("해당 좋아요 페이지로 이동")}>
              <MyActiveLike
                time={activity.createdAt}
                title={(activity as LikeData).title}
                onClick={deleteAct}
              />
            </div>
          ) : (
            <div key={activity.boardId} onClick={() => console.log("해당 댓글 페이지로 이동")}>
              <MyActiveComment
                time={activity.createdAt}
                comment={(activity as CommentData).content}
                onClick={deleteAct}
              />
            </div>
          ),
        )
      ) : (
        <p className="font-kbogothicmedium flex justify-center items-center text-gray-600">
          아직 활동한 기록이 없습니다.
        </p>
      )}
    </>
  );
};

export default MyActive;

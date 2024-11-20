import { useState, useEffect } from "react";
import axiosInstance from "../../util/axiosInstance";
import MyActiveLike from "../../components/mypage/MyActiveLike";
import MyActiveComment from "../../components/mypage/MyActiveComment";

interface LikeData {
  type: "like";
  boardId: number;
  activityId: number;
  createdAt: string;
  content: string;
  onClick: () => void;
}

interface CommentData {
  type: "comment";
  boardId: number;
  activityId: number;
  content: string;
  createdAt: string;
  onClick: () => void;
}

type ActivityData = LikeData | CommentData;

const MyActive = () => {
  const [activities, setActivities] = useState<ActivityData[]>([]);

  const getActivity = async () => {

    try {
      const response = await axiosInstance.get(`/api/v1/board/user-activity`);
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
      console.log(response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <>
      {activities.length > 0 ? (
        activities.map(activity =>
          activity.type === "like" ? (
            <div
              key={activity.boardId}
            >
              <MyActiveLike
                time={activity.createdAt.substring(0, 10)}
                content={(activity as LikeData).content}
                activityId={activity.activityId}
                boardId={activity.boardId}
              />
            </div>
          ) : (
            <div
              key={activity.boardId}
            >
              <MyActiveComment
                time={activity.createdAt.substring(0, 10)}
                comment={(activity as CommentData).content}
                activityId={activity.activityId}
                boardId={activity.boardId}
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

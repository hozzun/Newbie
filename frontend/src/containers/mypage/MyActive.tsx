import { useState, useEffect } from "react";
import axiosInstance from "../../util/axiosInstance";
import MyActiveLike from "../../components/mypage/MyActiveLike";
import MyActiveComment from "../../components/mypage/MyActiveComment";
import { useNavigate } from "react-router-dom";

interface LikeData {
  type: "like";
  boardId: number;
  activityId: number;
  createdAt: string;
  title: string;
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
  const nav = useNavigate();
  const [activities, setActivities] = useState<ActivityData[]>([]);

  const getActivity = async () => {

    try {
      const response = await axiosInstance.get(`/api-board/user-activity`);
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

  const deleteActivity = async (activityId: number) => {

    const params = { activityId: activityId };

    try {
      const response = await axiosInstance.delete(`/api-board/user-activity/${activityId}`, {
        params,
      });
      console.log(response.data);
    } catch (error) {
      console.error("에러 발생:", error);
      alert("삭제 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const deleteAct = async (activityId: number) => {
    await deleteActivity(activityId);
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
              onClick={() => nav(`/commuhome/freedetail/${activity.boardId}`)}
            >
              <MyActiveLike
                time={activity.createdAt}
                title={(activity as LikeData).title}
                onClick={() => deleteAct(activity.activityId)}
              />
            </div>
          ) : (
            <div
              key={activity.boardId}
              onClick={() => nav(`/commuhome/freedetail/${activity.boardId}`)}
            >
              <MyActiveComment
                time={activity.createdAt}
                comment={(activity as CommentData).content}
                onClick={() => deleteAct(activity.activityId)}
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

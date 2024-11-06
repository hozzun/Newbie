import ClubOverview from "./ClubOverview";
import ClubRecord from "./ClubRecord";

const ClubHome = () => {
  return (
    <div className="bg-club-ssg w-full max-w-[600px] min-w-[320px] mx-auto pt-4 pb-32">
      <ClubOverview />
      <div className="bg-white w-full rounded-t-lg pt-6 px-4 mt-6">
        <ClubRecord />
      </div>
    </div>
  );
};

export default ClubHome;

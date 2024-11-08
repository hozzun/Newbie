interface ProfileProps {
  img: string;
  name: string;
  email: string;
}

const Profile = (props: ProfileProps) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center m-7">
        <img src={props.img} alt="profile img" className="w-32 h-32 rounded-full" />
        <p className="font-kbogothicbold text-gray-600 m-3">{props.name}</p>
        <p className="font-kbogothicmedium text-gray-300 text-sm">{props.email}</p>
      </div>
    </>
  )
}

export default Profile

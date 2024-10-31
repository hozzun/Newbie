export interface Authority {
  img: React.FC<React.SVGProps<SVGSVGElement>>;
  imgColor: string;
  title: string;
  body: string;
}

type AuthorityCardItemProps = {
  authority: Authority;
};

const AuthorityCardItem = (props: AuthorityCardItemProps) => {
  const authorityImgClass = `w-4 h-4 my-1 me-3 ${props.authority.imgColor}`;

  return (
    <div className="flex flex-row mb-4">
      <props.authority.img className={authorityImgClass}></props.authority.img>
      <div className="flex flex-col items-start">
        <p className="text-base font-kbogothicmedium text-gray-700">{props.authority.title}</p>
        <p className="mt-1.5 text-xs font-kbogothiclight text-gray-700">{props.authority.body}</p>
      </div>
    </div>
  );
};

export default AuthorityCardItem;

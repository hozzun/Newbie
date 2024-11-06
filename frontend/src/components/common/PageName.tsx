interface PageNameProps {
  label: string;
}

const PageName = (props: PageNameProps) => {

  return (
    <>
      <div className="flex flex-start items-center w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">{props.label}</p>
      </div>
    </>
  )
}

export default PageName
interface ContainerProps {
  children?: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="w-full max-w-[600px] min-w-[320px] mx-auto p-4">{children}</div>;
};
export default Container;

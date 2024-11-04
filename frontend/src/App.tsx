import Login from "../src/pages/auth/Login";
import Redirect from "../src/pages/auth/Redirect";

function App() {
  return (
    <>
      <p className="text-green-900 font-kbogothicbold">Hello World</p>
      <Redirect />
      <Login />
    </>
  );
}

export default App;

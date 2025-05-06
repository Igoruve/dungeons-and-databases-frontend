import { Outlet } from "react-router-dom";
import NavBar from "../../components/Navbar/Navbar";

function Root() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default Root;

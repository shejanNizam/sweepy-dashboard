import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Main = () => {
  return (
    <div className="flex text-start  min-h-screen">
      <div role="navigation">
        <Sidebar />
      </div>
      <main className="flex-1 pl-[326px]">
        <div className="sticky top-0 w-full p-[24px] z-10 ">
          <Header />
        </div>
        <div className="p-[24px] pt-0.5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Main;

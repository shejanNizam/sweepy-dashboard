import { createElement, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineArrowRight } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/images/mail_logo_img.svg";
import { dashboardItems } from "../../constants/router.constants";
import { cn } from "../../lib/utils";
import { logout } from "../../redux/slices/authSlice";
import { routeLinkGenerators } from "../../utils/routeLinkGenerators";

const SubMenu = ({ children, isOpen, rootPath, location, openName, name }) => (
  <div
    className={cn("pl-8 pr-6 space-y-0.5 h-0 overflow-hidden", {
      "h-fit pt-1":
        name === openName?.name ||
        (location.pathname.includes(rootPath) && !openName.name),
    })}
  >
    {children?.map(({ subName, subPath, subIcon }, inx) => (
      <NavLink
        key={inx}
        to={subPath}
        className={({ isActive }) =>
          isActive
            ? "bg-button text-white w-full px-4 py-1 flex items-center justify-start gap-3 transition-all rounded-lg"
            : "text-black hover:text-white hover:bg-button w-full px-4 py-1 flex items-center justify-start gap-3 transition-all rounded-lg"
        }
      >
        <div>{createElement(subIcon, { size: "17" })}</div>
        <span>{subName}</span>
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openName, setOpenName] = useState({});

  const handleLogOut = () => {
    Swal.fire({
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "     Sure    ",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        logout();
        navigate("/auth");
      }
    });
  };

  return (
    <div className="fixed top-0 left-0 w-[326px] min-h-screen h-full p-6 pr-0">
      <div className="h-full flex flex-col justify-between bg-hash pt-[50px] border drop-shadow rounded-lg">
        {/* Logo */}
        <div className="">
          <img className="w-[70%] mx-auto" src={logo} alt="Logo" />
        </div>

        {/* Navigation Links */}
        <ul className="mt-10 max-h-[650px] overflow-y-auto space-y-1 xl:space-y-2 px-4 text-black">
          {routeLinkGenerators(dashboardItems).map(
            ({ name, icon, path, children, rootPath }, indx) =>
              children?.length ? (
                <li key={indx} className="overflow-hidden">
                  <button
                    aria-label="Toggle submenu"
                    onClick={() =>
                      setOpenName((c) => ({
                        name: c?.name === name ? null : name,
                      }))
                    }
                    className={cn(
                      "outline-none hover:text-white hover:bg-button w-full px-4 py-3 flex items-center justify-between gap-3 text-lg transition-all rounded-lg",
                      {
                        "bg-button text-white":
                          name === openName?.name ||
                          (location.pathname.includes(rootPath) &&
                            !openName.name),
                      }
                    )}
                  >
                    <div className="flex items-center justify-start gap-3">
                      <div>{createElement(icon, { size: "20" })}</div>
                      <span>{name}</span>
                    </div>
                    <MdOutlineArrowRight
                      className={cn("text-black", {
                        "rotate-90 text-black":
                          name === openName?.name ||
                          (location.pathname.includes(rootPath) &&
                            !openName.name),
                      })}
                      size={23}
                    />
                  </button>
                  <SubMenu
                    children={children}
                    isOpen={name === openName?.name}
                    rootPath={rootPath}
                    location={location}
                    openName={openName}
                    name={name}
                  />
                </li>
              ) : (
                <li key={indx}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gradient-to-r from-[#FFFFFF] to-[#EBEBEB] text-gray-700 w-full px-4 py-2 flex items-center !border-2 !border-gray-400 justify-start gap-3 text-lg transition-all rounded-lg"
                        : "hover:text-gray-700 text-lg !border-2 !border-hash hover:bg-gradient-to-r hover:from-[#FFFFFF] hover:to-[#EBEBEB] w-full px-4 py-2 flex items-center justify-start gap-3 transition-all rounded-lg"
                    }
                  >
                    <div>{createElement(icon, { size: "20" })}</div>
                    <span>{name}</span>
                  </NavLink>
                </li>
              )
          )}
        </ul>

        {/* Logout Button */}
        <div className="p-[24px]">
          <button
            onClick={handleLogOut}
            className="bg-[#65676d] text-white w-full px-10 py-4 flex justify-center items-center gap-2 rounded-lg text-xl"
          >
            <BiLogOut className="text-[#FF5252]" size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

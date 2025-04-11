import React from "react";
import { BiCategoryAlt, BiMessage } from "react-icons/bi";
import { CiSettings, CiUser } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { FaServicestack } from "react-icons/fa6";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineSecurityUpdateWarning,
} from "react-icons/md";
import { RiApps2AddLine, RiDashboardHorizontalFill } from "react-icons/ri";
import AddVenue from "../pages/Main/AddVenue/AddVenue";
import AllVenue from "../pages/Main/AllVenue/AllVenue";
import BeauticianDetails from "../pages/Main/Beautician/BeauticianDetails";
import Client from "../pages/Main/Client/Client";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import EarningHistory from "../pages/Main/EarningHistory/EarningHistory";
import Notifications from "../pages/Main/Notifications/Notifications";
import VenueRequest from "../pages/Main/VenueRequest/VenueRequest";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import MyProfile from "../pages/Profile/MyProfile";
import About from "../pages/Settings/About";
import EditAbout from "../pages/Settings/EditAbout";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import TermsConditions from "../pages/Settings/TermsConditions";
import { GrMoney } from "react-icons/gr";
import { PiUsersThree } from "react-icons/pi";
// import Support from "../pages/Support/Support";

export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardHorizontalFill,
    element: <DashboardHome />,
  },
  {
    path: "notifications",
    element: <Notifications />,
  },
  {
    name: "All Users",
    path: "client",
    icon: PiUsersThree,
    element: <Client />,
  },
  {
    name: "Earnings",
    path: "earnings",
    icon: GrMoney,
    element: <EarningHistory />,
  },
  {
    path: "/beautician/:profileId",
    element: <BeauticianDetails />,
  },
  // {
  //   name: "Earnings",
  //   rootPath: "earnings",
  //   icon: GrMoney,
  //   children: [
  //     {
  //       name: "All Earning",
  //       path: "earnings/all-earnings",
  //       icon: LuWallet,
  //       element: <Earnings />,
  //     },
  //     // {
  //     //   name: "Withdraw",
  //     //   path: "earnings/withdraw",
  //     //   icon: PiHandWithdrawBold,
  //     //   element: <Withdraw />,
  //     // },
  //   ],
  // },
  {
    name: "Venue Request",
    path: "venue",
    icon: BiMessage,
    element: <VenueRequest />,
  },
  {
    name: "All Venue",
    path: "all-venue",
    icon: BiCategoryAlt,
    element: <AllVenue />,
  },
  {
    name: "Add Venue",
    path: "add-venue",
    icon: RiApps2AddLine,
    element: <AddVenue />,
  },
  {
    name: "Settings",
    rootPath: "settings",
    icon: CiSettings,
    children: [
      {
        name: "Profile",
        path: "settings/profile",
        icon: CiUser,
        element: <MyProfile />,
      },
      {
        path: "settings/profile/edit",
        element: <EditMyProfile />,
      },
      {
        name: "About Us",
        icon: FaServicestack,
        path: "settings/about-us",
        element: <About />,
      },
      {
        path: "settings/about-us/edit",
        element: <EditAbout />,
      },
      {
        name: "Terms & Services",
        icon: FaServicestack,
        path: "settings/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "settings/terms-conditions/edit",
        element: <EditTermsConditions />,
      },
      {
        name: "Privacy Policy",
        icon: MdOutlineSecurityUpdateWarning,
        path: "settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "settings/privacy-policy/edit",
        element: <EditPrivacyPolicy />,
      },
    ],
  },
];

import React from "react";
import { CiCircleQuestion, CiSettings, CiUser } from "react-icons/ci";
import { FaRegLightbulb, FaServicestack, FaUsers } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import {
  MdOutlineSecurityUpdateWarning,
  MdOutlineVerified,
  MdSupportAgent,
} from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { RiAdvertisementLine, RiDashboardHorizontalFill } from "react-icons/ri";
import Advertisement from "../pages/Main/Advertisement/Advertisement";
import Assistant from "../pages/Main/Assistant/Assistant";
import AvailableSweep from "../pages/Main/AvailableSweep/AvailableSweep";
import SweepstakesDetails from "../pages/Main/AvailableSweep/SweepstakesDetails";
import Category from "../pages/Main/Category/Category";
import Client from "../pages/Main/Client/Client";
import CompleteSweep from "../pages/Main/CompleteSweep/CompleteSweep";
import SweepWinnerList from "../pages/Main/CompleteSweep/SweepWinnerList";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import EarningHistory from "../pages/Main/EarningHistory/EarningHistory";
import Notifications from "../pages/Main/Notifications/Notifications";
import Suggestion from "../pages/Main/Suggestion/Suggestion";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import MyProfile from "../pages/Profile/MyProfile";
import About from "../pages/Settings/About";
import EditAbout from "../pages/Settings/EditAbout";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import TermsConditions from "../pages/Settings/TermsConditions";
import { IoIosCard } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { TbPigMoney } from "react-icons/tb";
import CreateSweep from "../pages/Main/AvailableSweep/CreateSweep";
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
    path: "/create-sweep",
    element: <CreateSweep />,
  },
  {
    name: "Complete Sweep",
    path: "complete-sweep",
    icon: MdOutlineVerified,
    element: <CompleteSweep />,
  },
  {
    path: "complete-sweep/:id",
    element: <SweepWinnerList />,
  },
  {
    name: "Available Sweep",
    path: "available-sweep",
    icon: IoIosCard,
    element: <AvailableSweep />,
  },
  {
    path: "available-sweep/:id",
    element: <SweepstakesDetails />,
  },
  {
    name: "Category",
    path: "category",
    icon: BiCategoryAlt,
    element: <Category />,
  },
  {
    name: "Users",
    path: "client",
    icon: FaUsers,
    element: <Client />,
  },
  {
    name: "Advertisement",
    path: "advertisement",
    icon: RiAdvertisementLine,
    element: <Advertisement />,
  },
  {
    name: "Earnings",
    path: "earnings",
    icon: TbPigMoney,
    element: <EarningHistory />,
  },
  {
    name: "Suggestion",
    path: "suggestion",
    icon: FaRegLightbulb,
    element: <Suggestion />,
  },
  {
    name: "Assistant",
    path: "assistant",
    icon: MdSupportAgent,
    element: <Assistant />,
  },
  // {
  //   path: "/beautician/:profileId",
  //   element: <BeauticianDetails />,
  // },
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
  // {
  //   name: "Venue Request",
  //   path: "venue",
  //   icon: BiMessage,
  //   element: <VenueRequest />,
  // },
  // {
  //   name: "All Venue",
  //   path: "all-venue",
  //   icon: BiCategoryAlt,
  //   element: <AllVenue />,
  // },
  // {
  //   name: "Add Venue",
  //   path: "add-venue",
  //   icon: RiApps2AddLine,
  //   element: <AddVenue />,
  // },
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
        icon: CiCircleQuestion,
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

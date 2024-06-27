import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DesktopLayout from "./desktop/DesktopLayout";
import DesktopReferee from "./desktop/desktopViews/DesktopReferee";
import DesktopHome from "./desktop/desktopViews/DesktopHome";
import DesktopSchedule from "./desktop/desktopViews/DesktopSchedule";
import DesktopEvents from "./desktop/desktopViews/DesktopEvents";
import DesktopTeams from "./desktop/desktopViews/DesktopTeams";
import DesktopSignup from "./desktop/DesktopSignup";
import DesktopLogin from "./desktop/DesktopLogin";
import MobileHome from "./mobile/mobileViews/MobileHome";
import MobileReferee from "./mobile/mobileViews/MobileReferee";
import MobileSchedule from "./mobile/mobileViews/MobileSchedule";
import MobileEvents from "./mobile/mobileViews/MobileEvents";
import MobileTeams from "./mobile/mobileViews/MobileTeams";
import MobileLayout from "./mobile/MobileLayout";
import MobileSignUp from "./mobile/MobileSignUp";
import MobileLogin from "./mobile/MobileLogin";

// 정규식을 사용하여 모바일 디바이스를 감지하는 함수
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const App = () => {
  const isMobile = isMobileDevice();
  const DesktopRouter = createBrowserRouter([
    {
      path: "/",
      element: <DesktopLayout />,
      children: [
        { path: "", element: <DesktopHome /> },
        { path: "referee", element: <DesktopReferee /> },
        { path: "schedule", element: <DesktopSchedule /> },
        { path: "events", element: <DesktopEvents /> },
        { path: "teams", element: <DesktopTeams /> },
      ],
    },
    { path: "/login", element: <DesktopLogin /> },
    { path: "/signup", element: <DesktopSignup /> },
  ]);

  const MobileRouter = createBrowserRouter([
    {
      path: "/",
      element: <MobileLayout />,
      children: [
        { path: "", element: <MobileHome /> },
        { path: "/referee", element: <MobileReferee /> },
        { path: "/schedule", element: <MobileSchedule /> },
        { path: "/events", element: <MobileEvents /> },
        { path: "/teams", element: <MobileTeams /> },
      ],
    },
    { path: "/login", element: <MobileLogin /> },
    { path: "/signup", element: <MobileSignUp /> },
  ]);

  return (
    <div>
      {isMobile ? (
        <RouterProvider router={MobileRouter} />
      ) : (
        <RouterProvider router={DesktopRouter} />
      )}
    </div>
  );
};

export default App;

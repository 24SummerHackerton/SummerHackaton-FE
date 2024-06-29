import React from "react";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DesktopLayout from "./desktop/DesktopLayout";
import DesktopReferee from "./desktop/desktopViews/DesktopReferee";
import DesktopHome from "./desktop/desktopViews/DesktopHome";
import DesktopSchedule from "./desktop/desktopViews/DesktopSchedule";
import DesktopCreate from "./desktop/desktopViews/DesktopCreate";
import DesktopSignup from "./desktop/DesktopSignup";
import DesktopLogin from "./desktop/DesktopLogin";
import DesktopManage from "./desktop/desktopViews/DesktopManage";
import DesktopResults from "./desktop/desktopViews/DesktopResults";
import DesktopTournament from "./desktop/desktopViews/DesktopTournament";

// 정규식을 사용하여 모바일 디바이스를 감지하는 함수

const App = () => {
  const DesktopRouter = createBrowserRouter([
    {
      path: "/",
      element: <DesktopLayout />,
      children: [
        { path: "", element: <DesktopHome /> },
        { path: "referee", element: <DesktopReferee /> },
        { path: "schedule", element: <DesktopSchedule /> },
        { path: "create", element: <DesktopCreate /> },
        { path: "results", element: <DesktopResults /> },
        { path: "manage", element: <DesktopManage /> },
        { path: "tournament", element: <DesktopTournament /> },
      ],
    },
    { path: "/login", element: <DesktopLogin /> },
    { path: "/signup", element: <DesktopSignup /> },
  ]);

  return (
    <div>
      <RouterProvider router={DesktopRouter} />
    </div>
  );
};

export default App;

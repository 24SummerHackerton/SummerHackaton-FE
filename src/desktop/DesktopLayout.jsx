import { Outlet } from "react-router-dom";

export default function DesktopLayout() {
  return (
    <div>
      <div>CHEPLE</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

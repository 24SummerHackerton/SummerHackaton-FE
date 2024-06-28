import { Outlet } from "react-router-dom";

export default function DesktopLayout() {
  return (
    <div>
      <div className="bebas">CHEPLE</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

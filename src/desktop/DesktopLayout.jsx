import { Outlet } from "react-router-dom";

export default function DesktopLayout() {
  return (
    <div>
      <div>Desktop Navigation</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

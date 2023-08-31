import { Outlet } from "react-router-dom";
import { Logo } from "../Logo";

export const Layout = () => {
  return (
    <div className="mx-6 my-4">
      <Logo />
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

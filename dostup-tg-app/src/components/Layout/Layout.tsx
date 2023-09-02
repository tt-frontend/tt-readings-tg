import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="mx-6 my-4">
      <Outlet />
    </div>
  );
};

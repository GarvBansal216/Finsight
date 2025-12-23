import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      {/* Navbar is now in App.jsx, so we don't need it here to avoid duplication */}
      <Outlet /> 
    </>
  );
};

export default MainLayout;

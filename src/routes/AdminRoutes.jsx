import { Spin } from "antd";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state.auth);
  // console.log(user);
  if (isLoading) {
    return (
      <div
        className={`h-screen w-full flex flex-col justify-center items-center`}
      >
        {/* <TailSpin
          visible={true}
          height="70"
          width="70"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        /> */}
        <Spin size="large" className="flex justify-center items-center" />
        <p className="mt-5 font-mono text-gray-500 text-center">
          Please Wait <br /> ....
        </p>
      </div>
    );
  }
  if (user?.role === "admin") {
    return children;
  }
  //   return <Navigate to="/auth" state={{ from: location }} replace />;
  // };
  return <Navigate state={location.pathname} to="/auth" />;
};
AdminRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoutes;

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const user = useSelector((state) => state.users);

  if (!user.auth) {
    return false;
  }
  return true;
};

export default PrivateRoute;

import { Navigate } from "react-router-dom";

const Protected = ({ isLoggedIn, children }) => {
  console.log(isLoggedIn);
  if (!isLoggedIn && typeof isLoggedIn !== "undefined") {
    return <Navigate to='/' replace />;
  }
  return children;
};
export default Protected;

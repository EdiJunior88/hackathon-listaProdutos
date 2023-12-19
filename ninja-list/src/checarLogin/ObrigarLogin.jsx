import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export const ObrigarLogin = ({ children }) => {
  if (localStorage.getItem("criptografia") === null) {
    return <Navigate to='/' />;
  }
  return children;
};

ObrigarLogin.propTypes = {
  children: PropTypes.node.isRequired,
};

import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export const ChecarLogin = ({ children }) => {
  if (localStorage.getItem("criptografia") !== null) {
    return <Navigate to='/lista' />;
  }
  return children;
};

ChecarLogin.propTypes = {
  children: PropTypes.node.isRequired,
};

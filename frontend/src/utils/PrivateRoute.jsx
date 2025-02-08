// frontend/src/utils/PrivateRoute.jsx

// import { Route, Redirect } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const PrivateRoute = ([ childern, ...rest ]) => {
//     let {user} = useContext(AuthContext);
//     return (
//         <Route {...rest}>{!user ? <Redirect to="/login" /> : childern} </Route>
//     );
// };

// export default PrivateRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext"; // Default import

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
 
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
 
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
 
  return children;
}
 
export default ProtectedRoute;


//check add to cart refresh huda home ma janxa, it should be in cart itself
//product page ma : add add to cart button
//bg-white-600 esto ek choti constant define then reuse than doing again and again
//for cart: use api from fakeapi
//login credentials: do like ride sharing, testing credentials
//navbar integrate properly: left logo, more right on right side features
//add footer properly
//make responsive sleek UI
 
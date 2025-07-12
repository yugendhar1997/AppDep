import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopNavigation from "./TopNavigation";

function ProtectiveRoute() {
  let navigate = useNavigate();
  let userDetails = useSelector((store) => {
    return store.userDetails;
  });

  useEffect(() => {
    if (userDetails && userDetails.email) {
    } else {
      navigate("/");
    }
  }, []);

  return <div></div>;
}

export default ProtectiveRoute;

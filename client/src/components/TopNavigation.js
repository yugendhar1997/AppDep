import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function TopNavigation() {
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

  return (
    <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/messages">Messaages</Link>
        <Link to="/leaves">Leaves</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/">Signout</Link>
      </nav>
    </div>
  );
}

export default TopNavigation;

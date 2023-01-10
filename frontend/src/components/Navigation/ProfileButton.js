import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout()).then(() => history.push("/"));
  };

  return (
    <div className="NavBarRight-MenuHost">
      {user && (
        <NavLink className="HostButton" to="/spots/new">
          Become a Host
        </NavLink>
      )}
      <button className="DropDownMenuIcon" onClick={openMenu}>
        <i className="fas fa-bars" /> <i className="fas fa-user-circle" />
      </button>

      {showMenu && (
        <div className="profile-dropdown">
          <div className="top">Welcome, {user.username}!</div>
          <div className="top">Profile: {user.email}</div>
          <div className="NaviBarShowing">
            {user && (
              <div className="UserBarNavi">
                <div className="top"><Link to="/currentUser/spots" id="my-spots">
                  My Properties
                </Link>
                </div>
                <div className="top">
                <Link to="/currentUser/bookings" id="my-bookings">
                  My Bookings
                  </Link>
                </div>
                <div className="top">
                <Link to="/spots/currentUser/reviews" id="my-reviews">
                  My Reviews
                  </Link>
                  </div>
                <NavLink className="Logout" to="/" onClick={logout}>
                  Log out
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;

import React, { useState, useEffect } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
// import SignupFormPage from '../SignupFormPage';
// import LoginFormPage from '../LoginFormModal';

import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormPage";

import "./Navigation.css";
import { getSpotsThunk } from "../../store/spots";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();


  useEffect(() => {
    const currLocation = location.pathname
    if(!currLocation.startsWith(`/searched`)) setSearchInput("")
  }, [location])

  // handle search history
  const handleSearch = async () => {
    history.push(`/searched?input=${searchInput}`);
  };

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getSpotsThunk());
  // }, [dispatch]);

  // const [loginForm, setLoginForm] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <>
      <nav>
        <div className="NavigationBar">
          <div className="LeftNavi">
            <NavLink className="SiteLogo-NavLeft" exact to="/">
              <img
                className="Logo"
                src="https://i.pinimg.com/originals/20/93/85/209385b181979d46679d5584a31d0b25.jpg"
                alt="LairBnb Logo"
              />
              <div className="LairBnbText">LairBnb</div>
            </NavLink>
            <div className="header-search-container">
              <div className="search-input-container">
                <input
                  className="search-input"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by city, name..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
              </div>
              <button className="magnify" onClick={() => handleSearch()}>
                <i></i>
              </button>
            </div>

            {isLoaded}
          </div>
          <div className="getting-on-siblings">{sessionLinks}</div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;

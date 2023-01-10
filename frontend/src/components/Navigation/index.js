import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
// import SignupFormPage from '../SignupFormPage';
// import LoginFormPage from '../LoginFormModal';

import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormPage";

import "./Navigation.css";
// import SearchBarComponent from "../SearchComponent";
import { getSpotsThunk } from "../../store/spots";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSearch = async () => {
    history.push(`/spots/search?input=${searchInput}`);
  };
  // console.log("AAAAAAAAAA\n\n\n\n\n\n\nGet all spots running in navbar");

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

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
              <button onClick={() => handleSearch()}>
                <i></i>
              </button>
            </div>
            {/* <form onSubmit={handleSearch}>
              <div className="nav-item">
                <input
                  className="search-input"
                  type="text"
                  name="search"
                  placeholder="Search by name, category, address..."
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="search-button"
                  type="submit"
                  disabled={isSubmitted}
                >
                  <img className="search-image" src={searchIcon}></img>
                </button>
              </div>
            </form> */}
            {/* <div className="searching-for">
              <SearchBarComponent />
            </div> */}

            {isLoaded}
          </div>
          <div className="getting-on-siblings">{sessionLinks}</div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;

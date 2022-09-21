import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import SignupFormPage from '../SignupFormPage';
// import LoginFormPage from '../LoginFormModal';


import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage';

import './Navigation.css';

function Navigation({isLoaded}){
  const sessionUser = useSelector(state => state.session.user);

  const [loginForm, setLoginForm] = useState(false);


    let sessionLinks;
    if(sessionUser){
      sessionLinks = (
       <ProfileButton user={sessionUser} />
      )
    } else {
      sessionLinks = (
        <>
          {/* <button><SignupFormPage />
          </button> */}

          <LoginFormModal />
          <SignupFormModal/>
      </>
       )
    }

  return (
    <>
      <nav>
      <div className='NavigationBar'>

        <div className='LeftNavi'>
          <NavLink className='SiteLogo-NavLeft' exact to="/">
              <img className="Logo" src='https://i.pinimg.com/originals/20/93/85/209385b181979d46679d5584a31d0b25.jpg' alt='LairBnb Logo' />
              </NavLink>
          <div className='LairBnbText'>LairBnb</div>
            {isLoaded}

        </div>

             {sessionLinks}

      </div>
      </nav>
    </>
  );
}

export default Navigation;

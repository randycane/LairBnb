import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import SignupFormPage from '../SignupFormPage';
// import LoginFormPage from '../LoginFormModal';

import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage';



function Navigation({isLoaded}){
  const sessionUser = useSelector(state => state.session.user);


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
          <img className="Logo" src='https://styles.redditmedia.com/t5_icx0v/styles/image_widget_8hcjsurlnrx01.jpg?format=pjpg&s=cf0261f0c5e2810adb1d7dde7277792c7c130094' alt='LairBnb Logo' />
          <div className='LairBnbText'>LairBnb</div>
            </NavLink>
            {isLoaded && sessionLinks}

        </div>

             {/* {sessionLinks} */}

      </div>
      </nav>
    </>
  );
}

export default Navigation;

import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
// import LoginFormModal from "../LoginForm";
// import SignupFormModal from "../SignupForm";


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

  document.addEventListener('click', closeMenu)

  return () => document.removeEventListener("click", closeMenu);
}, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
      .then(() => history.push('/'));
};



// old css stuff:
//   return (

//     <div className="NavBarRight-MenuHost">
//       { user && <NavLink className='HostButton' to='/'>Become a Host</NavLink> }
//         <button className="DropDownMenuIcon" onClick={openMenu}>
//           <i className="fas fa-bars"/> <i className="fas fa-user-circle"/>
//           </button>

//       {showMenu && (
//         <div className="DropDown">
//         <div className="NaviBarShowing">
//           { user && (
//             <div className="UserBarNavi" >
//             <NavLink  className="OrderNaviLinks" to='/' onClick={logout}>Log out</NavLink>
//             </div>
//           )}
//         </div>
//         </div>
//       )}
//     </div>
//   );
// }

return (
  <>
    <button onClick={openMenu}>
      <i className="fas fa-user-circle" />
    </button>
    {showMenu && (
      <ul className="profile-dropdown">
        <li>{user.username}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    )}
  </>
);
}


export default ProfileButton;
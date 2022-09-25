import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
// import LoginFormModal from ".";

function DemoUserComponent({ showModal }) {
    const dispatch = useDispatch();

    const demoLogin = (e) => {
        e.preventDefault();

        const email = "shinichiro@user.io";
        const password = "password";

        return dispatch(sessionActions.login({ email, password })).then(() => {
            showModal(false);
        })
    }
    return (
        <button className="demo-user" onClick={demoLogin}>
            Demo User
        </button>
    )
}

export default DemoUserComponent;

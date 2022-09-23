import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage/SignupModal";
import LoginFormPage from "./components/LoginFormModal"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/Spots";
import CreateNewSpotComponent from "./components/CreateSpots";
import EditSpotComponent from "./components/Spots/EditSpotComponent";
import GetSpotById from "./components/Spots/GetSpotById";
import OwnSpotsComponent from "./components/Spots/OwnSpots";
import ReadReviewsComponent from "./components/Reviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path = '/'>
            <SpotsBrowser/>
          </Route>
          <Route exact path = '/spots/current'>
            <OwnSpotsComponent/>
            </Route>
            <Route path='/spots/new'>
              <CreateNewSpotComponent/>
          </Route>
          <Route exact path = '/spots/:spotId'>
            <GetSpotById/>
            </Route>
          <Route exact path = '/spots/:spotId/update'>
            <EditSpotComponent/>
          </Route>
          <Route exact path = '/reviews/current'>
            <ReadReviewsComponent/>
            </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

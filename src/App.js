import { useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login/index";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/userSlice";
import Profile from "./components/Profile";

function App() {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  //if the user already signed in, save the account
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            userEmail: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    //clean up
    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        )}
      </Router>
    </>
  );
}

export default App;

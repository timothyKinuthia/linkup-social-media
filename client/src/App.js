import { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Notify from "./components/notify/Notify";
import PageRender from "./customRouter/PageRender";
import PrivateRoute from "./customRouter/PrivateRoute";
import Login from "./screens/login";
import Register from "./screens/register";
import Home from "./screens/home";
import { refreshToken } from "./store/actions/authActions";
import { getPosts } from "./store/actions/postActions";
import { getSuggestions } from "./store/actions/suggestionsAction";
import { getNotifications } from "./store/actions/notificationActions";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  const { auth, status } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifications(auth.token));
    }
  }, [auth.token, dispatch]);


  return (
    <div>
      <BrowserRouter>
        <Notify />
        {auth.token && <Header />}
        {status && <StatusModal />}
        <Switch>
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/:page" component={PageRender} />
          <PrivateRoute exact path="/:page/:id" component={PageRender} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { Route, useHistory, Switch } from "react-router-dom";

const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const Home = React.lazy(() => import("./containers/Dashboard/Dashboard"));

export default function Router(props) {
  const rout = useHistory();
  const [auth, setAuth] = useState(undefined);
  const handleAuthChange = (data) => {
    if (data) {
      setAuth(data);
      rout.push("/dashboard/send");
    }
  };
  const internalRoutes = () => {
    return (
      <React.Fragment>
        <Route path="/dashboard" render={() => <Home auth={auth} />} />
      </React.Fragment>
    );
  };
  console.log(setAuth);
  return (
    <React.Suspense fallback={<h1>Loading..</h1>}>
      <Switch>
        
        {(auth && auth.email != "") && internalRoutes()}
        <Route
          exact
          path="/"
          render={() => <Auth setAuth={handleAuthChange} auth={auth} />}
        />  
        <Route path="*" component={()=><h1>404</h1>}/>
      </Switch>
    </React.Suspense>
  );
}

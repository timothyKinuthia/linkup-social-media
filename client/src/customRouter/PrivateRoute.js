import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    
    return <Route {...rest} render={(routeProps) => localStorage.getItem("firstLogin") ? <Component {...routeProps} /> : <Redirect to='/'/>} />
}

export default PrivateRoute

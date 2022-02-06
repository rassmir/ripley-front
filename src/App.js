import React, {Fragment} from 'react'
import history from './routes/history';
import {Route, Router} from "react-router-dom";
import routes from "./routes/routes";
import Sidebar from "./layouts/Sidebar";

const App = () => {
    return (
        <Router history={history}>
            <Fragment>
                {routes.map((route, index) => {
                    return (
                        <RouteWrapper
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            layout={Sidebar}
                            component={route.component}/>
                    )
                })}
            </Fragment>
        </Router>
    )
}

const RouteWrapper = ({component: Component, layout: Layout, ...rest}) => {
    return (
        <Fragment>
            <Route {...rest} render={(props) =>
                <Layout {...props}>
                    <Component {...props} />
                </Layout>
            } />
        </Fragment>
    )
}
export default App;
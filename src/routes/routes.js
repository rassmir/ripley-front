import Dashboard from "../containers/Dashboard";
import Client from "../containers/Client";

const App = [
    {
        path: '/',
        exact: true,
        component: Dashboard
    },
    {
        path: '/clientes',
        exact: true,
        component: Client
    }
]
export default App;
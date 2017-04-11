import Login from './pages/login/login';
import CreateAccount from './pages/login/create-account';
import App from './pages/app';
import Links from './pages/links/links';
import List from './components/list';
import Lists from './pages/lists/lists';

export default {
    login: {
        component: Login
    },
    register: {
        component: CreateAccount
    },
    main: {
        component: App,
        children: {
            links: {
                component: Links
            },
            lists: {
                component: Lists
            }
        }
    }
};

import Home from './views/home'
import Groups from './views/groups'
import User from './views/user'
import SignOn from './components/signOn'

export const ROUTES = [
    { path: '/home', component: Home },
    { path: '/groups', component: Groups },
    { path: '/user/:userId', component: User },
    { path: '/', component: SignOn }
]

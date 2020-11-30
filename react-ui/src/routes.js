import Home from './views/home'
import Groups from './views/groups'
import SignOn from './components/signOn'

export const ROUTES = [
    { path: '/home', component: Home },
    { path: '/groups', component: Groups },
    { path: '/', component: SignOn }
]

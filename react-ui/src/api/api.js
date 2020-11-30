import axios from 'axios'

export class Api {

    url = 'http://localhost:3306/api'

    config = {}

    getUsers(params) {
        return new Promise((resolve, reject) => {
            if (params) {
                let config = this.config
                config.params = params
            }
            axios.get(`${this.url}/getallusers`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    authenticate(email, password) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/login`, { params: {email: email, password: password}})
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

}
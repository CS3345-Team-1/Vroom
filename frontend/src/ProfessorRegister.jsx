import React from 'react';


export class ProfessorRegister extends React.Component{
    state = {
        userName: '',
        first: '',
        last: '',
        password: '',
        authenticated: null,
        registered: false,
    }

    /*register(confirm){
        if(this.state.password === confirm){
            registered: true
            this.ourRepo.addUser(
                this.state.userName, 
                this.state.first, 
                this.state.last,
                this.state.password)
                .then(id => {new User(id, userName, first, last, password)})
        }
    }*/

    render(){
        return <>          
        <form className = "mainForm">

        <div className="nameEntry">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="newName"
                        id="newName"
                        className="form-control"
                        value={this.state.firstName}
                        onChange={event => this.setState({ firstName: event.target.value })} />
                </div>
                <br/>
                <div className="nameEntry">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="newName"
                        id="newName"
                        className="form-control"
                        value={this.state.lastName}
                        onChange={event => this.setState({ lastName: event.target.value })} />
                </div>
                <br/>
           
                <div className="nameEntry">
                    <label>UserName</label>
                    <input
                        type="text"
                        name="newName"
                        id="newName"
                        className="form-control"
                        value={this.state.userName}
                        onChange={event => this.setState({ userName: event.target.value })} />
                </div>

                <br/>
                <div className="passwordEntry">
                    <label>Password</label>
                    <input
                        type="text"
                        name="newPassword"
                        id="newPassword"
                        className="form-control"
                        value={this.state.password}
                        onChange={event => this.setState({ password: event.target.value })} />
                </div>

                <div className="login">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={ () => this.register() }>
                        Register
                        </button>
                        {this.state.registered && <Redirect to= {'/dashboard/' + this.state.userName}/>}
                </div>
            
            </form>
            
        </>
    }
}
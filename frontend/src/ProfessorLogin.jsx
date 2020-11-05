import React from 'react';


export class ProfessorLogin extends React.Component{
    state = {
        userName: '',
        password: '',
    }

    render(){
        return <>          
        <form className = "mainForm">
           
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
                        onClick={ () => this.onAddClick() }>
                        Login
                        </button>
                </div>
            
            </form>
            
        </>
    }
}
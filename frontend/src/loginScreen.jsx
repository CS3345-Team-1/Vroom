import React from 'react'
import {StudentLogin} from './StudentLogin';
import {ProfessorLogin} from './ProfessorLogin';
import {StudentRegister} from './StudentRegister';
import {ProfessorRegister} from './ProfessorRegister';
import './App.css'

export class LoginScreen extends React.Component{
    

    render(){
        return <> 
        <div className = "welcome">
          <h1>Welcome to Vroom</h1>
        </div>
      

      <div class="accordion" id="accordionExample">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <button class="btn btn-link btn-block collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Students
            </button>
          </h2>
        </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
      <div className = "bg">
        <p className = "bg">
        
        <a class="btn btn-primary" 
          data-toggle="collapse" 
          href="#multiCollapseExample1" 
          role="button" 
          aria-expanded="false" 
          aria-controls="multiCollapseExample1">Student Login</a>
        <button class="btn btn-success" 
          type="button" 
          data-toggle="collapse" 
          data-target="#multiCollapseExample2" 
          aria-expanded="false" 
          aria-controls="multiCollapseExample2">Student Register</button>
        
      </p>
      
      
      
      <div class="row">
        <div class="col">
          <div class="collapse multi-collapse" id="multiCollapseExample1">
          
            <div class="card card-body">
              <StudentLogin/>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="collapse multi-collapse" id="multiCollapseExample2">
            <div class="card card-body">
              <StudentRegister/>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>


  <div class="card">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button class="btn btn-link btn-block collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Professors
        </button>
      </h2>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">
      <p className = "bg">
        <a class="btn btn-primary" 
          data-toggle="collapse" 
          href="#multiCollapseExample3" 
          role="button" 
          aria-expanded="false" 
          aria-controls="multiCollapseExample3">Professor Login</a>
        <button class="btn btn-success" 
          type="button" 
          data-toggle="collapse" 
          data-target="#multiCollapseExample4" 
          aria-expanded="false" 
          aria-controls="multiCollapseExample4">Professor Register</button>
      
      </p>
      <div class="row">
        <div class="col">
          <div class="collapse multi-collapse" id="multiCollapseExample3">
            <div class="card card-body">
              <ProfessorLogin/>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="collapse multi-collapse" id="multiCollapseExample4">
            <div class="card card-body">
              <ProfessorRegister/>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
      </div>
      </div>
      </>
    }
}
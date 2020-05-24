import React, { Component } from 'react'
import {PostData} from './services/PostData';
import {Redirect} from 'react-router-dom';

export class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            redirect: false
        }
        this.login= this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    
    login(){
        if(this.state.email && this.state.password){
            PostData('auth', this.state).then((result)=>{
                let responseJSON = result;
                //console.log(responseJSON);
                if(responseJSON.token){
                    sessionStorage.setItem('token', responseJSON);
                    this.setState({redirect: true});
                    
                }else{
                    console.log("Login Error");
                }
            });

        }
        
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
        //console.log(this.state);

    }
    
    render(){

        if(this.state.redirect){
            return(<Redirect to={'/items'}/>)
        }

        if(sessionStorage.getItem("token")){
            return(<Redirect to={'/items'}/>)
        }

        return(
    <div className="row small-up-2 medium-up-3 large-up-4">
    <div className="column">
        <h2>Login Page</h2>
        <input type="text" name="email" placeholder="email" onChange={this.onChange}/>
        <br></br>
        <input type="text" name="password" placeholder="password" onChange={this.onChange}/>
        <input type="submit" value="Login" className="button" onClick={this.login}/>
        
        </div>    
     </div>  
        );
    }
}
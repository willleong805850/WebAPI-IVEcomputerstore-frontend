import React, { Component } from 'react';
import {PostData} from './services/PostData';
import {Redirect} from 'react-router-dom';

export class Register extends Component{

    constructor(props){
        super(props);
        this.state={
            "email": '',
            "password": '',
            //redirectToReferrer: false,
            redirect: false
            
        }
        this.signup= this.signup.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount(){
        if(sessionStorage.getItem('token')){
            console.log("Call user Feed");
        }else{
            this.setState({redirect: true});
        }
        
    }

    signup(){
        if(this.state.email && this.state.password){
            PostData('register', this.state).then((result)=>{
                let responseJSON = result;
                console.log(responseJSON);
                if(responseJSON){
                    console.log("Register Successfully");
                    this.setState({redirectToReferrer: true});
                    
                }else{
                    console.log("Register Error");
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
        return(<Redirect to={'/login'}/>)
    }

    //(this.state.redirectToReferrer || sessionStorage.getItem('token')){
    //    return(<Redirect to={'/items'}/>)
    //}

    

    return(
        <div className="row small-up-2 medium-up-3 large-up-4">
        <div className="column">
            <h2>Registeration Page</h2>
            <input type="text" name="email" placeholder="email" onChange={this.onChange}/>
            <br></br>
            <input type="text" name="password" placeholder="password" onChange={this.onChange}/>
            <input type="submit" value="Register" className="button" onClick={this.signup}/>
            <a href="/login">Login</a>
            </div>    
         </div>  
            );
        }
    }

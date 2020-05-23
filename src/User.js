import React, {Component} from 'react';
import axios from 'axios';
import{Table,Button,Modal, ModalHeader, ModalBody, ModalFooter, Label, Input,FormGroup} from 'reactstrap';
import {Redirect} from 'react-router-dom';



export class User extends Component{
    state={
        users: [],
        newUserData:{
            email:"",
            password:""
        },
        editUserData:{
            _id:"",
            email:"",
            password:""
        },
        newUserModal: false,
        editUserModal: false,
        redirect: false,
        
    }
    constructor(){
        super();
        this.logout = this.logout.bind(this)
    }
    
    componentWillMount(){
        if(sessionStorage.getItem('token')){
            console.log("Call user Feed");
        }else{
            this.setState({redirect: true});
        }
        this._refreshList();
       
    }
    toggleNewItem() {
        this.setState({
            newUserModal: ! this.state.newUserModal
        })
    }
    toggleeditItem(){
        this.setState({
            editUserModal: ! this.state.editUserModal
        })
    }
    addUser(){
        axios.post('https://cors-anywhere.herokuapp.com/https://polar-citadel-36392.herokuapp.com/register', this.state.newUserData).then((response)=>{
            let {users} = this.state;

            users.push(response.data);
            
            this._refreshList();

            this.setState({users, newUserModal: false, newUserData:{
                email:"",
                password:""
            
            }})
            this._refreshList();
            ;
        })
    }
    updateUser(){
        let {email, password} = this.state.editUserData;
        axios.put('https://cors-anywhere.herokuapp.com/https://polar-citadel-36392.herokuapp.com/user/'+ this.state.editUserData._id, {
            email, password
        }).then((response)=>{
            this._refreshList();

            this.setState({
                editUserModal:false, editUserData: {email:"",
                password:""}
            })
        });

    }
    editUserData(_id,email,password){
        this.setState({
            editUserData:{_id, email, password}, editUserModal: ! this.state.editUserModal
        })
        this._refreshList();
        ;  
    }
    _refreshList(){
        axios.get('https://cors-anywhere.herokuapp.com/https://polar-citadel-36392.herokuapp.com/user').then((response) =>{
            this.setState({
                users: response.data
            })
        });   
    }
    deleteItem(_id){
        axios.delete('https://cors-anywhere.herokuapp.com/https://polar-citadel-36392.herokuapp.com/user/' + _id).then((response)=>{
            this._refreshList();
        })
    }

    logout(){
        sessionStorage.setItem("token", '');
        sessionStorage.clear();
        this.setState({redirect: true});
        
      }
    
    
    render(){
        let users = this.state.users.map((users)=>{
            return(
                <tr key={users._id}>
                          <td>{users._id}</td>
                          <td>{users.email}</td>
                          <td>{users.password}</td>
                          <td>
                              <Button color="success" size="sm" className="mr-2" onClick={this.editUserData.bind(this, users._id, users.email, users.password)}>Edit</Button>
                              <Button color="danger" size="sm" onClick={this.deleteItem.bind(this, users._id)}>Delete</Button>
                          </td>
                          </tr>

            )
        });

        if(this.state.redirect){
            return(<Redirect to={'/login'}/>)
        }
        
        return (
          <div className="App container">
              <button type='button' className="button" onClick={this.logout}>Logout</button>  
              <a href="/Register">Register a new staff</a>
              <h1>Admin account</h1>
                    <Button className="my-3" color="primary" onClick={this.toggleNewItem.bind(this)}>Add User</Button>
                    <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewItem.bind(this)}>
                    <ModalHeader toggle={this.toggleNewItem.bind(this)}>Add a new staff</ModalHeader>
                    <ModalBody>
                    <FormGroup>
                    <Label for="email">Email</Label>
                    <Input  id="email" value={this.state.newUserData.email} onChange={(e) => {
                        let {newUserData} = this.state;
                        newUserData.email = e.target.value;
                        this.setState({newUserData})
                    }} placeholder="Enter the stuff username"/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="password">password</Label>
                    <Input  id="password" value={this.state.newUserData.password} onChange={(e) => {
                        let {newUserData} = this.state;
                        newUserData.password = e.target.value;
                        this.setState({newUserData})

                    }}  placeholder="Enter the admin user password"/>
                    </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.addUser.bind(this)}>Add new user</Button>{' '}
                    <Button color="secondary" onClick={this.toggleNewItem.bind(this)}>Cancel</Button>
                    </ModalFooter>
                    </Modal>


                    <Modal isOpen={this.state.editUserModal} toggle={this.toggleeditItem.bind(this)}>
                    <ModalHeader toggle={this.toggleeditItem.bind(this)}>Edit user</ModalHeader>
                    <ModalBody>
                    <FormGroup>
                    <Label for="email">Email</Label>
                    <Input  id="email" value={this.state.editUserData.email} onChange={(e) => {
                        let {editUserData} = this.state;
                        editUserData.email = e.target.value;
                        this.setState({editUserData})
                    }} placeholder="Enter the user name"/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="password">password</Label>
                    <Input  id="password" value={this.state.editUserData.password} onChange={(e) => {
                        let {editUserData} = this.state;
                        editUserData.password = e.target.value;
                        this.setState({editUserData})

                    }}  placeholder="Enter the user specification"/>
                    </FormGroup>
 
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.updateUser.bind(this)}>Update User</Button>{' '}
                    <Button color="secondary" onClick={this.toggleeditItem.bind(this)}>Cancel</Button>
                    </ModalFooter>
                    </Modal>
              <Table>
                  <thead>
                      <tr>
                          <th>_id</th>
                          <th>email</th>
                          <th>password</th>

                      </tr>
                  </thead>
                  <tbody>
                      {users}
                  </tbody>
              </Table>
              
          </div>  
        )
    }
}
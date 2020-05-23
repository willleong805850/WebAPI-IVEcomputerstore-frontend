import React, {Component} from 'react';
import axios from 'axios';
import{Table,Button,Modal, ModalHeader, ModalBody, ModalFooter, Label, Input,FormGroup} from 'reactstrap';
import {Redirect} from 'react-router-dom';



export class Admin extends Component{
    state={
        items: [],
        newItemData:{
            name:"",
            specs:"",
            price:"",
            category:""
        },
        editItemData:{
            _id:"",
            name:"",
            specs:"",
            price:"",
            category:""
            
        },
        newItemModal: false,
        editItemModal: false,
        redirect: false,
        
    }
    constructor(){
        super();
        this.logout = this.logout.bind(this)
    }
    
    componentWillMount(){
        if(sessionStorage.getItem('token')){
            console.log("Call item Feed");
        }else{
            this.setState({redirect: true});
        }
        this._refreshList();
       
    }
    toggleNewItem() {
        this.setState({
            newItemModal: ! this.state.newItemModal
        })
    }
    toggleeditItem(){
        this.setState({
            editItemModal: ! this.state.editItemModal
        })
    }
    addItem(){
        axios.post('https://cors-anywhere.herokuapp.com/https://polar-citadel-36392.herokuapp.com/items', this.state.newItemData).then((response)=>{
            let {items: items} = this.state;

            items.push(response.data);
            
            this._refreshList();

            this.setState({items: items, newItemModal: false, newItemData:{
                name:"",
                specs:"",
                category:"",
                price: ""
            
            }})
            this._refreshList();
            ;
        })
    }
    updateItem(){
        let {name, specs,  price, category} = this.state.editItemData;
        axios.put('https://cors-anywhere.herokuapp.com/https://polar-citadel-36392.herokuapp.com/items/'+ this.state.editItemData._id, {
            name, specs,  price, category
        }).then((response)=>{
            this._refreshList();

            this.setState({
                editItemModal:false, editItemData: {name:"",
                specs:"", category:"", price:""}
            })
        });

    }
    editItemData(_id,name, specs,  price, category){
        this.setState({
            editItemData:{_id, name, specs,  price, category}, editItemModal: ! this.state.editItemModal
        })
        this._refreshList();
        ;  
    }
    _refreshList(){
        axios.get('https://cors-anywhere.herokuapp.com/https://polar-citadel-36392.herokuapp.com/items').then((response) =>{
            this.setState({
                items: response.data
            })
        });   
    }
    deleteItem(_id){
        axios.delete('https://cors-anywhere.herokuapp.com/https://polar-citadel-36392.herokuapp.com/items/' + _id).then((response)=>{
            this._refreshList();
        })
    }

    logout(){
        sessionStorage.setItem("token", '');
        sessionStorage.clear();
        this.setState({redirect: true});
        
      }
    
    
    render(){
        let items = this.state.items.map((items)=>{
            return(
                <tr key={items._id}>
                          <td>{items._id}</td>
                          <td>{items.name}</td>
                          <td>{items.specs}</td>
                          <td>{items.price}</td>
                          <td>{items.category}</td>
                          <td>
                              <Button color="success" size="sm" className="mr-2" onClick={this.editItemData.bind(this, items._id, items.name, items.specs, items.price, items.category)}>Edit</Button>
                              <Button color="danger" size="sm" onClick={this.deleteItem.bind(this, items._id)}>Delete</Button>
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
              <a href="/Register">Add a new staff</a>
              <h1>Product List</h1>
                    <Button className="my-3" color="primary" onClick={this.toggleNewItem.bind(this)}>Add Item</Button>
                    <Modal isOpen={this.state.newItemModal} toggle={this.toggleNewItem.bind(this)}>
                    <ModalHeader toggle={this.toggleNewItem.bind(this)}>Add a new item</ModalHeader>
                    <ModalBody>
                    <FormGroup>
                    <Label for="name">Name</Label>
                    <Input  id="name" value={this.state.newItemData.name} onChange={(e) => {
                        let {newItemData} = this.state;
                        newItemData.name = e.target.value;
                        this.setState({newItemData})
                    }} placeholder="Enter the name of the product"/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="specs">Specs</Label>
                    <Input  id="specs" value={this.state.newItemData.specs} onChange={(e) => {
                        let {newItemData} = this.state;
                        newItemData.specs = e.target.value;
                        this.setState({newItemData})
                    }}  placeholder="Enter the specification of the product"/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="price">Price</Label>
                    <Input  id="price" value={this.state.newItemData.price} onChange={(e) => {
                        let {newItemData} = this.state;
                        newItemData.price = e.target.value;
                        this.setState({newItemData})
                    }}  placeholder="Enter the price of the Product (HKD)"/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="category">Category</Label>
                    <Input  id="category" value={this.state.newItemData.category} onChange={(e) => {
                        let {newItemData} = this.state;
                        newItemData.category = e.target.value;
                        this.setState({newItemData})
                    }}  placeholder="Enter the category of the product"/>
                    </FormGroup>
                    
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.addItem.bind(this)}>Add new item</Button>{' '}
                    <Button color="secondary" onClick={this.toggleNewItem.bind(this)}>Cancel</Button>
                    </ModalFooter>
                    </Modal>


                    <Modal isOpen={this.state.editItemModal} toggle={this.toggleeditItem.bind(this)}>
                    <ModalHeader toggle={this.toggleeditItem.bind(this)}>Edit item</ModalHeader>
                    <ModalBody>
                    <FormGroup>
                    <Label for="name">Name</Label>
                    <Input  id="name" value={this.state.editItemData.name} onChange={(e) => {
                        let {editItemData} = this.state;
                        editItemData.name = e.target.value;
                        this.setState({editItemData})
                    }} placeholder="Enter the item name"/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="specs">Specs</Label>
                    <Input  id="specs" value={this.state.editItemData.specs} onChange={(e) => {
                        let {editItemData} = this.state;
                        editItemData.specs = e.target.value;
                        this.setState({editItemData})
                    }} placeholder="Enter the product specs"/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="price">Price</Label>
                    <Input  id="price" value={this.state.editItemData.price} onChange={(e) => {
                        let {editItemData} = this.state;
                        editItemData.price = e.target.value;
                        this.setState({editItemData})
                    }} placeholder="Enter the product price"/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="category">Category</Label>
                    <Input  id="category" value={this.state.editItemData.category} onChange={(e) => {
                        let {editItemData} = this.state;
                        editItemData.category = e.target.value;
                        this.setState({editItemData})
                    }} placeholder="Enter the product category"/>
                    </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.updateItem.bind(this)}>Update Item</Button>{' '}
                    <Button color="secondary" onClick={this.toggleeditItem.bind(this)}>Cancel</Button>
                    </ModalFooter>
                    </Modal>
              <Table>
                  <thead>
                      <tr>
                          <th>_id</th>
                          <th>name</th>
                          <th>specs</th>
                          <th>price</th>
                          <th>category</th>

                      </tr>
                  </thead>
                  <tbody>
                      {items}
                  </tbody>
              </Table>

          </div>  
        )
    }
}
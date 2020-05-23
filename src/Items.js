import React, { Component } from 'react';
import {Card} from 'react-bootstrap';

export default class Items extends Component{
  constructor(){
    super();
    this.state={
      data:[]
    }

  }

  componentDidMount()
  {
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    const url= "https://polar-citadel-36392.herokuapp.com/items"
    fetch(proxyurl+ url).then((response)=>response.json()).then((findresponse) =>{
      //console.log(findresponse)
      this.setState({
        data: findresponse
      })
    })
  }

  render() {
    return(
      <div>
        {
          this.state.data.map((dynamicData, key) =>
          <div className={"row"} key={key}>
            <Card className="text-center">
            <Card style={{ width: '70rem' }}>
            <Card.Body>
            <Card.Title>{dynamicData.name}</Card.Title>
            <Card.Text>
            {"Specification: " + dynamicData.specs}
            </Card.Text>
            <Card.Text>
            {"Category: " + dynamicData.category}
            </Card.Text>
            <Card.Text>
            {"$" + dynamicData.price}
            </Card.Text>
            </Card.Body>      
            </Card>
            </Card>
          </div> 
          ) 
        }         
    </div>
    )
}
}
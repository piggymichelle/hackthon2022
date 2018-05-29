import React, { Component } from 'react';

class Myform extends React.Component{
    constructor(props){
        super(props);
        this.state={mystate:{}}
    }
    handleChangle = e => {
        let {mystate} = this.state;
        mystate[e.target.name] = e.target.value;
        this.setState({mystate})
    }
    handleClick = e => {
        console.log('click');
        this.props.Getinput()
    }
    render(){
        return(
            <div>
                <input name='age' onChange = {e => {this.handleChangle(e)}}></input>
                <br />
                <input name='income' onChange = {e => {this.handleChangle(e)}}></input>
                <br />
                <button onClick={this.handleClick}>Submit</button>
            </div>
        )
    }
}
export default Myform;
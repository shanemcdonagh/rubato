// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import ListenList from './listenlist';


// Class Plants - Extends Component class
class ListenLists extends Component {

    // Method - Visual content of the component
    render() {
        return (
            <div>
                {this.props.lists.map((list) => {
                    return <ListenList list={list} key={list.id} updateListLength={this.props.updateListLength} listLength={this.props.lists.length}/>;
                })}
            </div>   
        );
    }
}

export default ListenLists;
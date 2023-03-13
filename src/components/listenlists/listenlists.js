// Imports (React, Component and Local Components)
import React, { Component } from 'react';
import ListenList from './listenlist';


// Class Plants - Extends Component class
class ListenLists extends Component {

    // Method - Visual content of the component
    render() {
        return (
            <div className='content'>
                    {this.props.lists.map((list) => {
                        return <ListenList list={list} key={list.id}></ListenList>;
                    })}
            </div>   
        );
    }
}

export default ListenLists;
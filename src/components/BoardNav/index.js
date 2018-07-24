import React, { Component } from 'react'
import './style.css'

export default class BoardNav extends Component {

    render() {
        const boardNavList = this.props.boards.map((item, index) => 
            <li 
                key={item.id} 
                className={this.props.active === index ? 'active' : ''}
                onClick={this.props.onChangeActive.bind(this, index)}
            >{item.title}</li> 
        )
        return (
            <ul className="boardNav">
                {boardNavList}
                <li><i className="material-icons">add</i></li>
            </ul>
        )
    }

}
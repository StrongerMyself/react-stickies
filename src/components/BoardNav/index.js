import React, { Component } from 'react'
import './style.css'

export default class BoardNav extends Component {

    state = {
        boards: this.props.boards,
        editItemIndex: null
    }

    render() {
        const boardNavList = this.state.boards.map((item, index) => 
            <li key={item.id} className={`boardNav__item ${this.props.active === index ? 'active' : ''}`}>
                <input
                    className={`boardNav__input ${this.state.editItemIndex === index ? 'active' : ''}`}
                    type="text"
                    value={this.state.boards[index].title}
                    placeholder="Enter the title..."
                    onChange={(e) => this.onInput(e, index)}
                    onKeyDown={this.onKeyDown}
                    onBlur={this.onBlur}
                />
                <div className="boardNav__buffer" onDoubleClick={(e) => this.onDoubleClick(e, index)}>{this.state.boards[index].title}</div>
                <i className="material-icons">close</i>
            </li>
        )
        return (
            <ul className="boardNav">
                {boardNavList}
                <li><i className="material-icons">add</i></li>
            </ul>
        )
    }

    onDoubleClick = (e, index) => {
        let input = e.target.parentNode.getElementsByClassName('boardNav__input')[0]
        this.setState({ 
            editItemIndex: index 
        }, () => {
            input.select()
        })
    }

    onBlur = () => {
        this.setState({ editItemIndex: null })
    }
    
    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur()
        }
    }

    onInput = (e, index) => {
        let s = Object.assign([], this.state.boards)
        s[index].title = e.target.value.replace(/ {1,}/g, " ")
        this.setState({ boards: s })
    }

}
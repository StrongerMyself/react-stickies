import React, { Component } from 'react'
import './style.css'

export default class BoardNav extends Component {

    state = {
        boards: this.props.boards,
        editItemIndex: null
    }

    render() {
        const boardNavList = this.state.boards.map((item, index) => 
            <li 
                key={item.id} 
                className={`boardNav__item ${this.props.active === index ? 'active' : ''}`}
                onClick={() => { this.props.onChangeActive(index) }}
            >
                <input
                    className={`boardNav__input ${this.state.editItemIndex === index ? 'active' : ''}`}
                    type="text"
                    value={this.state.boards[index].title}
                    placeholder="Enter the title..."
                    onChange={(e) => this.onInput(e, index)}
                    onKeyDown={(e) => this.onKeyDown(e, index)}
                    onBlur={() => this.onBlur(index)}
                />
                <div 
                    className="boardNav__buffer" 
                    onDoubleClick={(e) => this.onDoubleClick(e, index)}
                >{this.state.boards[index].title}</div>
                <i className="material-icons" onClick={() => this.props.onRemove(item.id)}>close</i>
            </li>
        )
        return (
            <ul className="boardNav">
                {boardNavList}
                <li><i className="material-icons" onClick={this.props.onAdd}>add</i></li>
            </ul>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ boards: nextProps.boards })
    }

    onDoubleClick = (e, index) => {
        // let input = e.target.parentNode.getElementsByClassName('boardNav__input')[0]
        let input = e.target.previousSibling
        this.setState({ 
            editItemIndex: index 
        }, () => {
            input.select()
        })
    }

    onBlur = (index) => {
        this.setState({ 
            editItemIndex: null
        }, () => {
            this.props.onSave(this.state.boards[index].id, { title : this.state.boards[index].title })
        })
    }
    
    onKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            this.onBlur(index)
            // e.target.blur()
        }
    }

    onInput = (e, index) => {
        let s = Object.assign([], this.state.boards)
        s[index].title = e.target.value.replace(/ {1,}/g, " ")
        this.setState({ boards: s })
    }

}
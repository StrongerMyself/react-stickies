import React, { Component } from 'react'
import Board from './Board'
import BoardNav from './BoardNav'

import Store from '../core/Store';

export default class App extends Component {

    constructor(props) {
        super(props)
        this.Store = new Store()
        this.state = {
            data: this.Store.getData(),
            activeBoardIndex: 0
        }
    }

    render() {
        return (
            <div>
                <Board data={this.state.data.boards[this.state.activeBoardIndex]} />
                <BoardNav 
                    boards={this.state.data.boards} 
                    active={this.state.activeBoardIndex} 
                    onChangeActive={this.onBoardChangeActive} 
                    onAdd={this.onBoardAdd} 
                    onRemove={this.onBoardRemove} 
                    onSave={this.onBoardSave} 
                />
            </div>
        )
    }

    onBoardChangeActive = (index) => {
        this.setState({ activeBoardIndex: index, data: this.Store.getData()})
    }

    onBoardAdd = () => {
        // if (this.state.data.boards[this.state.data.boards.length - 1].title.length > 0) {
            this.setState({ data: this.Store.onAddBoard(), activeBoardIndex: this.state.data.boards.length })
        // }
    }

    onBoardRemove = (id) => {
        this.setState({ data: this.Store.onRemoveBoard(id), activeBoardIndex: 0 })
    }

    onBoardSave = (id, obj) => {
        this.setState({ data: this.Store.onSaveBoard(id, obj) })
    }

}
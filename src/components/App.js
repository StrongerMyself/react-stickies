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
                    onChangeActive={this.onChangeActiveBoard} 
                    active={this.state.activeBoardIndex} 
                />
            </div>
        )
    }

    onChangeActiveBoard = (index) => {
        this.setState({ activeBoardIndex: index, data: this.Store.getData()})
    }

}
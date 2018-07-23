import React, { Component } from 'react'
import Board from './Board'
import BoardNav from './BoardNav'

import data from '../data'

export default class App extends Component {
    
    state = {
        data: data,
        activeBoardIndex: 0,
    }

    render() {
        return  (
            <div>
                <Board stikers={this.state.data[this.state.activeBoardIndex].stikers} />
                <BoardNav boards={this.state.data} onChangeBoard={this.onChangeBoard} active={this.state.activeBoardIndex} />
            </div>
        )
    }

    onChangeBoard = (index) => {
        this.setState({ activeBoardIndex: index })
    }

}
import React, { Component } from 'react'
import Board from './Board'
import BoardNav from './BoardNav'

import data from '../data'

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: data,
            activeBoardIndex: 0,
            activeBoardStikers: []
        }

        this.state.activeBoardStikers = this.state.data[this.state.activeBoardIndex].stikers
    }


    render() {
        console.log(this.state.activeBoardIndex)
        // console.log(this.state.activeBoardStikers)
        return  (
            <div>
                <Board stikers={this.state.activeBoardStikers} />
                <BoardNav boards={this.state.data} onChangeBoard={this.onChangeBoard} active={this.state.activeBoardIndex} />
            </div>
        )
    }

    onChangeBoard = (index) => {
        this.setState({ 
            activeBoardIndex: index,  
            activeBoardStikers: this.state.data[index].stikers
        })
    }

}
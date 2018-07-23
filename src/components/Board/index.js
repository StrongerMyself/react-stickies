import React, { Component } from 'react'
import Stiker from '../Sticker'
import './style.css'

export default class Board extends Component {

    state = {
        stikers: this.props.stikers
    }

    render() {
        let stikersList = this.state.stikers.map((item, index) =>
            <Stiker 
                key={item.id}
                top={index * 240 + 10} 
                left={10} 
                zIndex={this.state.stikers.length - index}
                text={item.text}
                onActive={this.onStikerActive.bind(this, item.id)}
            />
        )
        return (
            <div>
                {stikersList}
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ stikers: nextProps.stikers })
    }
    
    onStikerActive = (id) => {
        let s = Object.assign([], this.state.stikers)
        let index = s.findIndex(el => el.id === id)
        s.push(s.splice(index, 1)[0])
        this.setState({ stikers: s })
    }

}
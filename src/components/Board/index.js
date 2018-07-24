import React, { Component } from 'react'
import Stiker from '../Sticker'
import './style.css'

import Store from '../../core/Store'

export default class Board extends Component {

    constructor(props) {
        super(props)
        this.Store = new Store()
        this.state = {
            stikers: props.data.stikers
        }
    }


    render() {
        let stikersList = this.state.stikers.map((item, index) =>
            <Stiker 
                key={item.id}  
                              
                id={item.id}
                top={item.top || index * 240 + 10} 
                left={item.left || 10} 
                text={item.text}
                
                onMoveStart={this.onStickerMoveStart.bind(this, item.id)}
                onMoveEnd={this.onStickerMoveEnd}
                onChangeText={this.onStickerChangeText}
            />
        )
        return (
            <div className="board" onClick={this.onStickerAdd}>
                {stikersList}
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ stikers: nextProps.data.stikers })
    }
    
    onStickerMoveStart = (id) => {
        let s = Object.assign([], this.state.stikers)
        let index = s.findIndex(el => el.id === id)
        s.push(s.splice(index, 1)[0])
        this.setState({ stikers: s })
    }
    
    onStickerMoveEnd = (data) => {
        let s = Object.assign([], this.state.stikers)
        s[s.length - 1].top = data.top 
        s[s.length - 1].left = data.left 
        s[s.length - 1].text = data.text 
        this.setState({ 
            stikers: s 
        }, () => {
            this.Store.onSaveStickers(this.props.data.id, s)
        })
    }
    
    onStickerChangeText = (id, data) => {
        let s = Object.assign([], this.state.stikers)
        let index = s.findIndex(el => el.id === id)
        s[index].top = data.top
        s[index].left = data.left
        s[index].text = data.text 
        this.setState({
            stikers: s
        }, () => {
            this.Store.onSaveSticker(id, this.props.data.id, data)
        })
    }

    onStickerAdd = (e) => {
        if (!e.target.classList.contains('board')) return
        this.setState({ 
            stikers: this.Store.onAddSticker(
                this.props.data.id,
                {
                    id: null,
                    text: '',
                    top: e.pageY - 15,
                    left: e.pageX - 15,
                }
            )
        })
    }


}
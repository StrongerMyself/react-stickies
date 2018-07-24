import React, { Component } from 'react'
import Sticker from '../Sticker'
import './style.css'

import Store from '../../core/Store'

export default class Board extends Component {

    constructor(props) {
        super(props)
        this.Store = new Store()
        this.state = {
            stickers: props.data.stickers
        }
    }


    render() {
        let stickersList = this.state.stickers.map((item, index) =>
            <Sticker 
                key={item.id}  
                              
                id={item.id}
                top={item.top || index * 240 + 10} 
                left={item.left || 10} 
                text={item.text}
                
                onMoveStart={this.onStickerMoveStart.bind(this, item.id)}
                onMoveEnd={this.onStickerMoveEnd}
                onChangeText={this.onStickerChangeText}
                onRemove={this.onStickerRemove}
            />
        )
        return (
            <div className="board" onClick={this.onStickerAdd}>
                {stickersList}
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ stickers: nextProps.data.stickers })
    }
    
    onStickerMoveStart = (id) => {
        let s = Object.assign([], this.state.stickers)
        let index = s.findIndex(el => el.id === id)
        s.push(s.splice(index, 1)[0])
        this.setState({ stickers: s })
    }
    
    onStickerMoveEnd = (data) => {
        let s = Object.assign([], this.state.stickers)
        s[s.length - 1].top = data.top 
        s[s.length - 1].left = data.left 
        s[s.length - 1].text = data.text 
        this.setState({ 
            stickers: s 
        }, () => {
            this.Store.onSaveStickers(this.props.data.id, s)
        })
    }
    
    onStickerChangeText = (id, data) => {
        let s = Object.assign([], this.state.stickers)
        let index = s.findIndex(el => el.id === id)
        s[index].top = data.top
        s[index].left = data.left
        s[index].text = data.text 
        this.setState({
            stickers: s
        }, () => {
            this.Store.onSaveSticker(id, this.props.data.id, data)
        })
    }

    onStickerAdd = (e) => {
        if (!e.target.classList.contains('board')) return
        this.setState({ 
            stickers: this.Store.onAddSticker(
                this.props.data.id,
                {
                    id: null,
                    text: '',
                    top: e.pageY - 15,
                    left: e.pageX - 125,
                }
            )
        })
    }

    onStickerRemove = (stickerId) => this.setState({ stickers: this.Store.onRemoveSticker(this.props.data.id, stickerId) })


}
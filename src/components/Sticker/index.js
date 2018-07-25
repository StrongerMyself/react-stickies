import React, { Component } from 'react'
import './style.css'

export default class Sticker extends Component  {

    state = {
        inMove: false,
        top:  this.props.top,
        left: this.props.left,
        text: this.props.text,
        themeId: this.props.themeId,
        navOpen: false
    }

        
    render() {
        let theme = this.props.themes.find(el => +el.id === +this.state.themeId)

        let classStr = `sticker ${this.state.inMove ? 'sticker--inMove' : ''}`
        let styleObj = { 
            'top': this.state.top + 'px', 
            'left': this.state.left + 'px'
        }

        const colorList = this.props.themes.map((item, index) => 
            <li 
                key={item.id}
                style={{ backgroundColor: item.colors.thumb }} 
                className={this.state.themeId === item.id ? 'active' : ''} 
                onClick={() => this.onSelecColor(item.id)}
            ></li>
        )

        return (
            <div className={classStr} style={styleObj}>
                <div 
                    style={{ backgroundColor: theme.colors.head, color: theme.colors.icon }} 
                    className="sticker__head" 
                    onMouseDown={this.onDown}
                >
                    <i className="material-icons sticker__menuBtn" onClick={this.onToggleMenu}>more_horiz</i>
                    <i className="material-icons sticker__crossBtn" onClick={this.onRemove}>close</i>
                </div>
                <div className={`sticker__nav ${this.state.navOpen ? 'active': ''}`}>
                    <ul className="sticker__color">{colorList}</ul>
                </div>
                <div className="sticker__body" style={{ backgroundColor: theme.colors.body, color: theme.colors.text }}>
                    <textarea
                        value={this.state.text} 
                        onChange={this.onTextareaChange}
                        onFocus={this.onTextareaFocus}
                        onBlur={this.onTextareaBlur}
                        placeholder="Write something ..."
                    ></textarea>
                </div>
            </div>
        )
    }
    
    componentWillReceiveProps(nextProps) {
        // if (this.props.text !== nextProps.text) {
            this.setState({
                top: nextProps.top,
                left: nextProps.left,
                text: nextProps.text,
                themeId: nextProps.themeId,
                navOpen: false
            })
        // }
    }

    onTextareaFocus = (e) => {
        this.props.onMoveStart()
        this.setState({ inMove: true })
    }

    onTextareaBlur = (e) => {
        this.setState({ 
            inMove: false 
        }, () => {
            this.props.onMoveEnd({
                top:  this.state.top,
                left: this.state.left,
                text: this.state.text,
                themeId: this.state.themeId
            })
        })
    }
    
    onTextareaChange = (e) => {
        this.setState({ 
            text: e.target.value
        }, () => {
            this.props.onChangeText(
                this.props.id, 
                {
                    top: this.state.top,
                    left: this.state.left,
                    text: this.state.text,
                    themeId: this.state.themeId
                }
            )
        })
    } 
    
    onDown = (e) => {
        let parent = e.target.parentNode
        if (!parent.classList.contains('sticker')) return

        this.props.onMoveStart()
        this.setState({ inMove: true })
        
        let offsetTop  = e.screenY - parent.offsetTop 
        let offsetLeft = e.screenX - parent.offsetLeft 
        
        let _this = this
        function onMove(e) {
            _this.setState({
                top:  e.screenY - offsetTop,
                left: e.screenX - offsetLeft 
            })
        }
        
        onMove(e)
        document.onmousemove = (e) => onMove(e)
        
        e.target.onmouseup = () => {
            document.onmousemove = null
            _this.setState({ 
                inMove: false
            }, () => {
                _this.props.onMoveEnd({ 
                    top: _this.state.top, 
                    left: _this.state.left,
                    text: _this.state.text,
                    themeId: _this.state.themeId
                })
            })
        }
    }

    onRemove = (e) => {
        if (!e.target.classList.contains('sticker__crossBtn')) return
        this.props.onRemove(this.props.id)
    }

    onToggleMenu = (e) => {
        let n = !this.state.navOpen
        this.setState({ navOpen: n })
        // let nav = e.target.parentNode.parentNode.getElementsByClassName('sticker__nav')[0]
        // nav.classList.contains('active') ? nav.classList.remove('active') : nav.classList.add('active')
    }

    onSelecColor = (themeId) => {
        this.setState({ 
            themeId 
        }, () => {
            this.props.onSelectColor(
                this.props.id,
                {
                    top: this.state.top,
                    left: this.state.left,
                    text: this.state.text,
                    themeId
                }
            )
        })
    }

}
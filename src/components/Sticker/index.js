import React, { Component } from 'react'
import './style.css'

export default class Sticker extends Component  {

    state = {
        inMove: false,
        top:  this.props.top,
        left: this.props.left,
        text: this.props.text
    }

        
    render() {
        let classStr = `sticker ${this.state.inMove ? 'sticker--inMove' : ''}`
        let styleObj = { 
            'top': this.state.top + 'px', 
            'left': this.state.left + 'px'
        }
        return (
            <div className={classStr} style={styleObj}>
                <div className="sticker__head" onMouseDown={this.onDown}>
                    <div className="sticker__cross material-icons" onClick={this.onRemove}>close</div>
                </div>
                <div className="sticker__body">
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
        if (this.props.text !== nextProps.text) {
            this.setState({
                top: nextProps.top,
                left: nextProps.left,
                text: nextProps.text,
            })
        }
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
                text: this.state.text
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
                    text: this.state.text
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
            console.log(e.clientY, e.pageY, e.screenY)
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
                    text: _this.state.text
                })
            })
        }
    }

    onRemove = (e) => {
        if (!e.target.classList.contains('sticker__cross')) return
        this.props.onRemove(this.props.id)
    }

}
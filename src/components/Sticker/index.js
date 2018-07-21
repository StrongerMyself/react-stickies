import React, { Component } from 'react'
import './style.css'

export default class Stiker extends Component  {

    state = {
        inMove: false,
        top: this.props.top,
        left: this.props.left,
        text: this.props.text,
        onActive: this.props.onActive
    }
        
    render() {
        let classStr = `stiker ${this.state.inMove ? 'stiker--inMove' : ''}`
        let styleObj = { 
            'top': this.state.top, 
            'left': this.state.left
        }
        return (
            <div className={classStr} style={styleObj}>
                <div className="stiker__head" onMouseDown={this.onDown}>
                    <div className="stiker__cross material-icons">close</div>
                </div>
                <div className="stiker__body">
                    <textarea value={this.state.text} onChange={this.onTextareaChange}></textarea>
                </div>
            </div>
        )
    }
    
    onTextareaChange = (e) => {
        this.setState({ text: e.target.value });
    } 
    
    onDown = (e) => {
        let parent = e.target.parentNode
        if (!parent.classList.contains('stiker')) return

        this.state.onActive()
        
        this.setState({ inMove: true })
        
        let offsetTop = e.pageY - parent.offsetTop 
        let offsetLeft = e.pageX - parent.offsetLeft 
        
        let _this = this
        function onMove(e) {
            _this.setState({
                top: e.pageY - offsetTop + 'px',
                left: e.pageX - offsetLeft + 'px'
            })
        }
        
        onMove(e)
        
        document.onmousemove = function (e) {
            onMove(e)
        }
        
        e.target.onmouseup = function () {
            document.onmousemove = null
            _this.setState({ inMove: false })
        }
    }

}
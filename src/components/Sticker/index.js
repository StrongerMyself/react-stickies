import React, { Component } from 'react'
import './style.css'

export default class Stiker extends Component  {

    state = {
        inMove: false,
        top: this.props.top,
        left: this.props.left
    }
        
    render() {
        let stikerClassStr = `stiker ${this.state.inMove ? 'stiker--inMove' : ''}`
        return (
            <div className={stikerClassStr} style={{ 'top': this.state.top, 'left': this.state.left }}>
                <div className="stiker__head" onMouseDown={this.onDown} >
                    <div className="stiker__cross material-icons">close</div>
                </div>
                <div className="stiker__body">
                    <textarea></textarea>
                </div>
            </div>
        )
    }

    onDown = (e) => {
        let parent = e.target.parentNode
        if (!parent.classList.contains('stiker')) return
        
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
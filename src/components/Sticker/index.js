import React, { Component } from 'react'
import './style.css'

export default class Stiker extends Component  {

    state = {
        inMove: false,
        top:  this.props.top,
        left: this.props.left,
        text: this.props.text
    }

        
    render() {
        let classStr = `stiker ${this.state.inMove ? 'stiker--inMove' : ''}`
        let styleObj = { 
            'top': this.state.top + 'px', 
            'left': this.state.left + 'px'
        }
        return (
            <div className={classStr} style={styleObj}>
                <div className="stiker__head" onMouseDown={this.onDown}>
                    <div className="stiker__cross material-icons">close</div>
                </div>
                <div className="stiker__body">
                    <textarea 
                        value={this.state.text} 
                        onChange={this.onTextareaChange}
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
        if (!parent.classList.contains('stiker')) return

        this.props.onMoveStart()
        this.setState({ inMove: true })
        
        let offsetTop  = e.pageY - parent.offsetTop 
        let offsetLeft = e.pageX - parent.offsetLeft 
        
        let _this = this
        function onMove(e) {
            _this.setState({
                top:  e.pageY - offsetTop,
                left: e.pageX - offsetLeft 
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

}
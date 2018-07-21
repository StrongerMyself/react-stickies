import React, { Component } from 'react'
import './style.css'

export default class Stiker extends Component  {
    render() {
        return (
            <div className="stiker">
                <div className="stiker__head">
                    <div className="stiker__cross material-icons">close</div>
                </div>
                <div className="stiker__body">
                    <textarea></textarea>
                </div>
            </div>
        )
    }
}
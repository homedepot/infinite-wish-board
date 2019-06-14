import React, { Component } from 'react'
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons'

export default class ImgPlaceholder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="icon-container">
                <FontAwesomeIcon className="camera-icon" icon={faCamera} />
                <a href="#">Add Image</a>
            </div>
        )
    }
}

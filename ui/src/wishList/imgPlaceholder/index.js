import React, { Component } from 'react'
import './styles.scss';
import noImage from '../../assets/images/no-image.png';

export default class ImgPlaceholder extends Component {

    render() {
        return (
            <div className="icon-container">
                <img src={noImage} alt="noimage"></img>
                <a href="/review">Add Image</a>
            </div>
        )
    }
}

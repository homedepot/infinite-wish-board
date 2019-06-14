import React, { Component } from 'react'
import './styles.scss';
import chevronRight from '../../assets/Chevron_Forward.png';
import kidImg from '../../assets/icn_To_Be_Astronaut_130x130.png'
import sponsorImg from '../../assets/icn_To_Be_Astronaut_130x130.png'
import ImgPlaceholder from '../imgPlaceholder';

export default class Wish extends Component {
    render() {
        return (
            <div className="wish">
                <div className="date">
                </div>
                {false ? <img src={kidImg} alt="child" /> :<ImgPlaceholder text="Add Image" />}
                
                <div>
                    <p>
                        <strong>Maggie</strong> - Age 6 from Smyrna
                    </p>
                    <span className="summary">
                        Maggie wishes to go to Disney land
                    </span>
                </div>
                {false ? <img src={sponsorImg} alt="Sponsor" className="sponsor" /> : <a href="/review">Add Sponsor</a>}
                <img src={chevronRight} alt="click to view wish details" className="chevron"/>
            </div>
        )
    }
}

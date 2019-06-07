import React, {Component} from 'react';
import logo from '../landing/logo.svg';
import './Landing.css'

export default class Landing extends Component{
    render() {
        return(
            <div className="Landing">
                <header className="Landing-header">
                    <img src={logo} className="Landing-logo" alt="logo" />
                    <p>
                        Edit <code>src/landing/Landing.js</code> and save to reload.
                    </p>
                    <a
                        className="Landing-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>

        )
    }
}
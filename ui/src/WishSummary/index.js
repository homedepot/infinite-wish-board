import React, { Component } from 'react';
import Wish from './wish';
import WishHeader from './wishHeader';
import WishFilter from './wishFilter';
import './styles.scss'

export default class WishSummary extends Component {

    render() {
        return (
            <div className="wishSummary">
                <WishHeader />
                <WishFilter />
                <Wish />
                <Wish />
                <Wish />
            </div>
        )
    }
}

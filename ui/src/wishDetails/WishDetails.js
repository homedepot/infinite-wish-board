import React, { Component } from 'react';

export default class WishDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      id: 0
    }
  }

  componentDidMount() {

  }


  render() {
    return (
      <div className='wishDetails containerVertical'>
        <div className='childDetails'>
          <p>Name</p>
          <p>Age</p>
          <p>Hometown</p>
        </div>
      </div>
    )

  }


}

import React, { Component } from 'react';

let key= 0;

class Message extends Component {
  /*
  Wraps leaf nodes in the math AST
  */
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    console.log(this.props)
    if(!this.props.renderFlag)
      this.props.renderedFlag()
  }

  componentDidMount() {
    console.log(this.props)
    if(!this.props.renderFlag)
      this.props.renderedFlag()
  }

  render() {
    console.log(this.props)
    return (
    <div>
      Processing took {Math.round(this.props.testResults)} milliseconds and resulted in {this.props.error_ct} errors (rendering the math below took longer)
    </div>
    )
  }
}

export default Message;


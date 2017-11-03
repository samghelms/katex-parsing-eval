import React, { Component } from 'react';

const dfs = tree => {
  if (!tree.children || tree.children.length < 1 ) {
    const test = tree.value !== "" && tree.value !== undefined
    return test ? tree.value : "NO_VALUE"
  } else {

    let children = []
    for (var i = 0; i < tree.children.length; i++) {
      let ch = tree.children[i]
      let val = dfs(ch)
      if(val !== "NO_VALUE") {
        children.push(val)
      }
    }
    if (children.length === 1 && children[0].length) {
      return children[0]
    }
    if (children.length > 0) {
      return children
    } else {
      return "NO_VALUE"
    }

  }
}

class Tree extends Component {
  /*
  Wraps leaf nodes in the math AST
  */
  constructor(props) {
    super(props)
    this.state = {expanded: -1}
    this.clickHandler=this.clickHandler.bind(this)
  }

  componentDidMount() {

  }

  clickHandler(e) {
    this.setState({expanded: this.state.expanded*=-1})
  }

  render() {
    const display = dfs(this.props.formula)
    const text = this.state.expanded < 0?"show":"hide"
    return (
    <div>
      <button onClick={this.clickHandler}> Click to {text} tree </button>
      {this.state.expanded > 0 ?<pre>{JSON.stringify(display, null, 2)}</pre>: null}
    </div>
    )
  }
}

export default Tree;


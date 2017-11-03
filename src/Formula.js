import React, { Component } from 'react';

const Formulas = ({data, parentKey}) => {
  if(data.length > 0) {
    return data.map((el, i)=> {
                                const key = parentKey+i.toString()
                                return (<Formula id={key} key={key} el={el}/>)
                              }
                    )
  }
  return null
}

class Formula extends Component {
  /*
  Wraps leaf nodes in the math AST
  */
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    const {classes, children, style, value} = this.props.el
    const {id } = this.props
    const classString = classes ? classes.join(" ") : null
    if(value) {
      return (
        <span className={classString} style={style} >{value}</span>
      );
    } else {
      return <span className={classString} style={style} ><Formulas parentKey={id} data={children}/> </span>
    }
    
  }
}

export default Formula;


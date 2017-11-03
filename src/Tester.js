import React, { Component } from 'react';
import {getParse, parseString} from './parser'
import Formula from './Formula'
import ReactJson from 'react-json-view'
import Tree from './Tree'
import eqs from './data/all_equations.json'

const FinishedEl = ({formulas}) => {

	if (formulas.length > 0) {
		return formulas.map( (el, i)=> (
								<div>
									<div className={"katex"} style={{display: "block"}}><Formula key={i} id={i} el={el}/><Tree formula={el}/></div> 
							    </div>
						    	)
							)
						    
	}
	else {
		return <div> none yet </div>
	}
}

class Tester extends Component {
	constructor(props) {
	    super(props)
	    this.state = { formulas: [] }
	    this.test = this.test.bind(this)
    }

    gotFormulas(formulas) {
    	this.setState({formulas: formulas })
    }

    test(e) {
    	var i = 0;
    	var t0 = performance.now();
    	var formulas = []
    	while (i < e.target.id) {
    		formulas.push(getParse("\\sigma_{\\rm mNWA} = \\int_{M-\\Delta}^{M+\\Delta}dm_{{\\gamma\\gamma}} \\bigg[ \\frac{d\\sigma_{\\rm sig}}{dm_{{\\gamma\\gamma}}}  \\bigg]_{\\rm peak}, \\quad \\hbox{for a broad resonance}"))
    		i++
    	}
		var t1 = performance.now();
		console.log(i+" parses took " + (t1 - t0) + " milliseconds.")
		this.gotFormulas(formulas)
    }

  render() {
  	const formulas = this.state.formulas.map(el=> el.children[1])
    return (
      <div className="App">
        <button id = {10} onClick={this.test}> 10 formulas </button>
        <button id = {100} onClick={this.test}> 100 formulas </button>
        <button id = {1000} onClick={this.test}> 1000 formulas </button>
        <button id = {10000} onClick={this.test}> 10000 formulas </button>
        <button id = {100000} onClick={this.test}> 100000 formulas </button>
        <button id = {1000000} onClick={this.test}> 1000000 formulas </button>
        <button id = {10} onClick={this.test}> (ok just kidding don't do that) </button>
        <FinishedEl formulas={formulas}/>
      </div>
    );
  }
}

 // <FinishedEl formulas={formulas}/>

export default Tester;

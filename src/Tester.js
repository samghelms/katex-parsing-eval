import React, { Component } from 'react';
import {getParse, parseString} from './parser'
import Formula from './Formula'
import ReactJson from 'react-json-view'
import Tree from './Tree'
import Message from './Message'
import {getRandomArray} from './helpers'
// import eqs from './data/all_equations.json'

const FinishedEl = ({formulas}) => {
    console.log("initializing")
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
	    this.state = { formulas: [], renderFormulas: false}
	    this.test = this.test.bind(this)
	    this.getJson = this.getJson.bind(this)
        this.gotFormulas = this.gotFormulas.bind(this)
        this.renderFormulas = this.renderFormulas.bind(this)
    }

    gotFormulas(formulas) {
    	this.setState({formulas: formulas})
    }

    gotResult(result, formulas) {
    	const error_ct = formulas? formulas.filter(el=> !el.children ).length : null
    	this.setState({testResults: result, error_ct: error_ct, renderFormulas: false})

    }

    renderFormulas() {
        this.setState({renderFormulas: true})
    }

    componentDidMount() {
    	this.getJson()
    
    }

    async getJson() {
	  const json = await fetch(`https://raw.githubusercontent.com/samghelms/katex-parsing-eval/master/src/data/all_equations.json`)
							      .then(response => response.json())
							      .then(json => json)
	  this.setState({raw_formulas: json})
	}

    test(e) {
    	if (!this.state.raw_formulas) 
    		return

    	const keys = Object.keys(this.state.raw_formulas)
    	const random_arr = getRandomArray(keys, e.target.id)
    	var i = 0;
    	const t0 = performance.now();
    	var formulas = []
    	var random_idx
    	while (i < e.target.id) {
    		random_idx = random_arr[i]
    		formulas.push(getParse(this.state.raw_formulas[random_idx]))
    		i++
    	}
		const t1 = performance.now();
		const result = (t1 - t0)
		this.gotResult(result, formulas)
		this.gotFormulas(formulas)
    }

  render() {
    console.log(this.state)
  	const formulas = this.state.formulas? this.state.formulas.map(el=>  el && el.children? el.children[1]: {"failText": el}) : null
    return (
      <div className="App">
        <button id = {10} onClick={this.test}> 10 formulas </button> 
        <button id = {100} onClick={this.test}> 100 formulas </button>
        <button id = {1000} onClick={this.test}> 1000 formulas </button>
        <button id = {10000} onClick={this.test}> 10000 formulas </button>
        {this.state.testResults? <Message renderFlag = {this.state.renderFormulas} renderedFlag={this.renderFormulas} style={{padding: 10}} testResults={this.state.testResults} error_ct={this.state.error_ct}/>: <div style={{padding: 10}}> Select a test above </div>}
        {this.state.renderFormulas ? <FinishedEl formulas={formulas}/> : <div> waiting on you to select a test... </div> }
      </div>
    );
  }
}

 // <FinishedEl formulas={formulas}/>

export default Tester;

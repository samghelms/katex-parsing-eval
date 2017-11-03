

export const getParse = text => {
  try {
      const obj = window.katex.renderToObject(text, {trackLocation: true})
      return obj
  }
  catch(err) {
  	try {
  		const obj = window.katex.renderToObject(text, {throwOnError: false, trackLocation: true})
    	return obj
  	}
  	catch(err) {
  		console.log("NON FIXABLE ERROR")
  		return null
  	}
    console.log("ERROR")
    return null
  }
}

export const parseString = arr_of_strings => {
	return arr_of_strings.map( el=>getParse(el) )
}
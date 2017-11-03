

export const getParse = (text) => {
	const orig_text = text
    text = text.replace(/\\begin{equation[^}]*}/g, "");
    text = text.replace(/\\end{equation[^}]*}/g, "");
    text = text.replace(/\\begin{align[^}]*}/g, "\\begin{aligned}");
    text = text.replace(/\\end{align[^}]*}/g, "\\end{aligned}");
    text = text.replace(/\\label{[^}]*}*/g, "");
    text = text.replace(/\\n/g, "");
    text = text.replace(new RegExp('\\$\\$', 'g'), '');
  try {
      const obj = window.katex.renderToObject(text, { throwOnError: false, falsetrackLocation: true})
      return obj
  }
  catch(err) {
  	return "original: "+orig_text+ " \n With our regex: "+text
  }
}

export const parseString = arr_of_strings => {
	return arr_of_strings.map( el=>getParse(el) )
}
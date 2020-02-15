// Init function to fetch the INITIAL.md and display the help
(() => {
  fetch('https://raw.githubusercontent.com/wonyk/Markdown-Previewer/master/INITIAL.md')
    .then(response => response.text())
    .then(text => {
      document.getElementById('preview').innerHTML = marked(text, config);
      let o = document.getElementById('editor')
      o.value = text
      o.style.height = "1px";
      o.style.height = (25 + o.scrollHeight) + "px";

      // checks for table
      editTables()
    })
    .catch(err => {
      document.getElementById('preview').innerHTML = marked('Something has went wrong, please try again', config);
      document.getElementById('editor').value = 'Something has went wrong, please try again'
    })
})()

const editMarkDown = (o) => {
  let newEdits = document.getElementById('editor').value
  document.getElementById('preview').innerHTML = marked(newEdits, config)
  o.style.height = "1px";
  o.style.height = (25 + o.scrollHeight) + "px";
  editTables()
}

const config = {
  gfm: true,
  breaks: true
}

const editTables = () => {
  let tables = document.getElementsByTagName('TABLE')
  for (i = 0; i < tables.length; i++) {
    tables[i].classList.add('table')
    tables[i].classList.add('table-striped')
    tables[i].classList.add('table-responsive-sm')
  }
}
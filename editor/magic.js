const toolbar = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ direction: "rtl" }],

  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ["clean"]
];
const quill = new Quill("#theBoard", {
  modules: {
    toolbar
  },
  placeholder: "",
  theme: "snow"
});

try {
  const editorDataBoard = window.localStorage.getItem('boardData');
  const data = JSON.parse(editorDataBoard)
  quill.setContents(data);  
} catch(e){}

quill.on('text-change', () => {
  const currentContents = quill.getContents();
  window.localStorage.setItem('boardData', JSON.stringify(currentContents))
});

browser.topSites.get(
  {
      includeFavicon: true,
      onePerDomain: true,
      limit: 6
  }
).then((topSites = []) => {
  const topSitesDiv = document.getElementById('topSites');
  console.log(topSites)
  topSites.forEach(t => {
    const siteDiv = document.createElement('a');
    siteDiv.setAttribute('href', t.url);
    siteDiv.setAttribute('data-title', t.title);
    siteDiv.style.backgroundImage = `url('${t.favicon}')`;
    topSitesDiv.appendChild(siteDiv);
  })
  document.body.appendChild(topSitesDiv);
}).catch(console.log)

document.addEventListener('click', e => {
  if(e.target.localName !== 'body' && e.target.localName !== 'html' && e.target.id !== 'topSites') {
    document.querySelector('.ql-toolbar.ql-snow').style.opacity = 1
  } else {
    document.querySelector('.ql-toolbar.ql-snow').style.opacity = 0;
  }
});

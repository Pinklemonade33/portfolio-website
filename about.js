// Globals
const textContainer = document.getElementById('text-container');
console.log(textContainer);

const getText = (path) => {
    fetch(path)
    .then(response => response.text())
    .then(fileContents => {
        console.log(fileContents);
    })
    .catch(error => console.error(error));
}

Paragraphs = [
    {text: getText('text/about.txt'), id: 'how'},
    {text: '', id: 'intro'},
    {text: '', id: 'where'}
]

const addText = (paragraph) => {
    const p = document.createElement('p');
    p.innerHTML = paragraph.text
    p.id = paragraph.id
    textContainer.appendChild(p)
}

addText(Paragraphs[0])




(async () => {
    let linguagens = []

    try {
        const res = await fetch("./data.json")
        linguagens = await res.json()
    }
    catch (err) {
        return console.error(err)
    }

    const linguagens_options = document.getElementById('linguagens-options')

    function createLinguagemElement({ name, path }) {
        const img = document.createElement('img')
        img.className = 'rank-item'
        img.src = path
        img.alt = `logo de ${name}`
        return img
    }

    linguagens.forEach(linguagem => {
        const logo_linguagens = createLinguagemElement(linguagem)
        linguagens_options.appendChild(logo_linguagens)
    });

})
.call(this)
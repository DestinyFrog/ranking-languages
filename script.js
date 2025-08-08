
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

    linguagens.forEach(({ name, path }) => {
        const li = document.createElement('li')
        li.className = 'rank-item'
        implementDragAndDrop(li)

        const img = document.createElement('img')
        img.src = path
        img.alt = `logo de ${name}`
        img.title = capitalize(name)
        li.appendChild(img)

        linguagens_options.appendChild(li)
    })

    /**
     * @param {HTMLElement} element 
     */
    function implementDragAndDrop(element) {
        let offset = { x: 0, y: 0 }
        
        function mouseMove(ev) {
            if (ev.clientX > 0 && ev.clientX < document.body.clientWidth) {
                element.style.left = `${ev.clientX - offset.x}px`	
            }

            if (ev.clientY > 0 && ev.clientY < document.body.clientHeight) {
                element.style.top = `${ev.clientY - offset.y}px`
            }
        }

        function mouseDown(ev) {
            offset.x = ev.clientX - element.offsetLeft
            offset.y = ev.clientY - element.offsetTop

            element.classList.add('draggable')

            document.addEventListener('mousemove', mouseMove)
            document.addEventListener('mouseup', _ =>
                document.removeEventListener('mousemove', mouseMove))
        }

        element.addEventListener('mousedown', mouseDown)
    }

    function capitalize(str) {
        if (!str || typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
})
.call(this)
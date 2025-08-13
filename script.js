
(async () => {
    let linguagens = []

    let linguagensScore = {}

    try {
        const res = await fetch("./data.json")
        linguagens = await res.json()
    }
    catch (err) {
        return console.error(err)
    }

    const linguagens_options = document.getElementById('linguagens-options')

    linguagens.forEach(({ name, path, link }) => {
        const li = document.createElement('li')
        li.className = 'rank-item'

        const onStopDrag = (ev) => {
            linguagensScore[name] = ev.clientY
            console.log(linguagensScore)
        }

        implementDragAndDrop(li, onStopDrag)

        const a = document.createElement('a')
        a.className = 'title'
        a.target = '_blank'
        a.textContent = capitalize(name)
        if (link) {
            a.href = link
        }
        li.appendChild(a)

        const img = document.createElement('img')
        img.className = 'icon'
        img.src = path
        img.draggable = false
        img.alt = `logo de ${name}`
        img.title = capitalize(name)
        li.appendChild(img)

        linguagens_options.appendChild(li)
    })

    let last_z_index = 1

    /**
     * @param {HTMLElement} element 
     */
    function implementDragAndDrop(element, onStopDrag) {
        let offset = { x: 0, y: 0 };
        let isDragging = false;

        element.style.cursor = 'grab';

        element.addEventListener('mousedown', startDrag);
        
        element.addEventListener('touchstart', touchStart);

        function startDrag(ev) {
            last_z_index++
            element.style.zIndex = last_z_index
            isDragging = true;
            
            offset.x = ev.clientX - element.getBoundingClientRect().left;
            offset.y = ev.clientY - element.getBoundingClientRect().top;
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
            
            ev.preventDefault();
            element.classList.add('dragging')
        }

        function drag(ev) {
            if (!isDragging) return;
            
            element.style.left = `${ev.clientX - offset.x}px`;
            element.style.top = `${ev.clientY - offset.y - document.body.getBoundingClientRect().top}px`;

            element.classList.add('selected')
        }

        function stopDrag(ev) {
            isDragging = false;
            element.classList.remove('dragging')
            element.style.cursor = 'grab';
            
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);

            onStopDrag(ev)
        }

        function touchStart(ev) {
            last_z_index++
            element.style.zIndex = last_z_index
            isDragging = true;
            
            offset.x = ev.touches[0].clientX - element.getBoundingClientRect().left;
            offset.y = ev.touches[0].clientY - element.getBoundingClientRect().top;
            
            document.addEventListener('touchmove', touchMove);
            document.addEventListener('touchend', touchEnd);
            
            ev.preventDefault();
            element.classList.add('dragging')
        }

       function touchMove(ev) {
            if (!isDragging) return;
            
            element.style.left = `${ev.touches[0].clientX - offset.x}px`;
            element.style.top = `${ev.touches[0].clientY - offset.y - document.body.getBoundingClientRect().top}px`;

            element.classList.add('selected')
        }

        function touchEnd(ev) {
            isDragging = false;
            element.classList.remove('dragging')
            element.style.cursor = 'grab';

            document.removeEventListener('touchmove', touchMove);
            document.removeEventListener('touchend', touchEnd);

            onStopDrag(ev)
        }
    }

    function capitalize(str) {
        if (!str || typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
})
.call(this)
document.addEventListener('DOMContentLoaded', function(){
    navegacioFija()
    crearGaleria()
    resaltarEnlace()
    scrollNav()
})

function navegacioFija(){
    const header = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')
    
    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed')
        }else{
            header.classList.remove('fixed')
        }
    })
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes')
    const numero = 16;

    for(let i = 1; i<= numero; i++){
        const imagen = document.createElement('PICTURE')
        imagen.innerHTML = `
        <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
    `;
        //event handler
        imagen.onclick = function(){
            mostrarImagen(i);
        }


        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i){

    const imagen = document.createElement('PICTURE')

    imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
`;

    //generar modal
    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick  = cerrarModal // para q detecte el click

    //boton cerrar
    const botonCerrar = document.createElement('BUTTON');
    botonCerrar.textContent = 'X'
    botonCerrar.classList.add('boton-cerrar')
    botonCerrar.onclick = cerrarModal

    modal.appendChild(imagen)
    modal.appendChild(botonCerrar)

    //agg al HTML
    const body = document.querySelector('BODY')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
}

function cerrarModal(){
    const modal = document.querySelector('.modal')
    modal.classList.add('fadeOut')
    setTimeout(() => {
        modal?.remove()  //? es si existe
        const body = document.querySelector('BODY')
        body.classList.remove('overflow-hidden')
    }, 500);
}

function resaltarEnlace(){
    document.addEventListener('scroll', function(){
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';
        sections.forEach( section =>{
            const sectionTop = section.offsetTop
            const sectionHeigh = section.clientHeight

            if(window.scrollY >= (sectionTop - sectionHeigh / 3)){
                actual = section.id
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('activa')
            if(link.getAttribute('href') === '#' + actual){
                link.classList.add('activa')
            }
        })
    })
}

function scrollNav(){
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach(link => { 
        link.addEventListener('click', e => {
            e.preventDefault()

            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior : 'smooth'})
        } )
    })
}
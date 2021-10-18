var acumulador2 = 0;
var acumulador = 0;
const slide = document.querySelector('#image-slider');
const btn1 = document.querySelector('#btn-1');
const btn2 = document.querySelector('#btn-2');
const imageSlider = document.querySelector('#image-slider');
const templateCard = document.querySelector('#card-template').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => { 
    fetchApi();
})


const fetchApi = async () => {
    
    //El async se usa para definir una funcion donde se va a encontrar el await, este await espera una promesa, que permite que el codigo se vuelva sincronico

    let array = [];
   
    try {

        for (let i = 1; i < 250; i++) {

            //El fetch recibe una url, con await espera a que reciba esa informacion desde la api
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            //Transformamos a json
            const data = await res.json();    
            array.push(data);
            
        }
        console.log(array);
        
        //Llamamos la funcion que renderiza la card para el pokemon, recibiendo como parmetro la data de la API 
        cardRender(array);
    
    } catch (error) {

        console.log(error)

    }





}


const cardRender = (array) => {
    
    array.forEach(pokemon => {
        templateCard.querySelector('.circle-image').setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`)
        templateCard.querySelector('.card').setAttribute('id', `slide-${pokemon.name}`);
        templateCard.querySelector('.img').setAttribute('id', `img-${pokemon.name}`);
        templateCard.querySelector('.img').setAttribute('src', pokemon.sprites.other.dream_world.front_default);
        templateCard.querySelector('.name').innerHTML = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} <span>${pokemon.stats[0].base_stat} hp</span>`
        templateCard.querySelector('.attack').innerHTML = `${pokemon.stats[1].base_stat}K`;
        templateCard.querySelector('.special-attack').innerHTML = `${pokemon.stats[2].base_stat}K`;
        templateCard.querySelector('.defense').innerHTML = `${pokemon.stats[3].base_stat}K`;

        const clone = templateCard.cloneNode(true);

        fragment.appendChild(clone);
        
    })
 
    imageSlider.appendChild(fragment);
}


const move = (id) => {

    const card = document.querySelector(`#${id}`);

    card.classList.toggle('inactive');
    card.classList.toggle('active');

}   

const leave = (id) => {

    const card = document.querySelector(`#${id}`);

    card.classList.remove('active'); 
    card.classList.add('inactive'); 
  
}


const go = () => {

    acumulador = acumulador + parseInt((35));
    slide.style.transform = `translate(${acumulador2 - acumulador}%)`;
 
    
}

const back = () => {
 
    acumulador2 = acumulador2 + parseInt((35));
    slide.style.transform = `translate(${acumulador2 - acumulador}%)`;
    
}


btn2.addEventListener('click',go);
btn1.addEventListener('click',back);

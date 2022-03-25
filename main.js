import {gsap} from 'gsap';

const ingredients = {

    'greens': [
        {'label': 'Eisbergsalat', 'slug': 'eisberg', 'width': 144, 'height': 129, 'count': 13},
        {'label': 'Kopfsalat', 'slug': 'kopfsalat', 'width': 228 / 2, 'height': 176 / 2, 'count': 12},
        {'label': 'Batavia-Mischung', 'slug': 'battavia', 'width': 168 / 2, 'height': 162 / 2, 'count': 15},
        {'label': 'Babyspinat', 'slug': 'babyspinat', 'width': 200, 'height': 79, 'count': 11},
        {'label': 'Romanasalat', 'slug': 'romana', 'width': 125, 'height': 96 / 2, 'count': 18},
    ],

    'color': [
        {'label': 'Paprika', 'slug': 'paprika', 'width': 40, 'height': 65, 'count': 5},
        {'label': 'Mais', 'slug': 'mais', 'width': 20, 'height': 23, 'count': 5},
        {'label': 'Möhren', 'slug': 'moehre', 'width': 35, 'height': 47, 'count': 5},
        {'label': 'Kidneybohnen', 'slug': 'kidney', 'width': 44, 'height': 58 / 2, 'count': 5},
        {'label': 'Rote Bete', 'slug': 'rotebete', 'width': 56 / 2, 'height': 42, 'count': 5},
        {'label': 'Tomaten', 'slug': 'tomaten', 'width': 51, 'height': 53, 'count': 5},
    ],

    'crunchy': [
        {'label': 'Croutons', 'slug': 'crouton', 'width': 23, 'height': 23, 'count': 6},
        {'label': 'Haselnüsse', 'slug': 'haselnuss', 'width': 30, 'height': 35, 'count': 8},
        {'label': 'Walnüsse', 'slug': 'walnuss', 'width': 98 / 2, 'height': 30, 'count': 6},
        {'label': 'Pinienkerne', 'slug': 'pinienkern', 'width': 13, 'height': 26, 'count': 15},
        {'label': 'Sonnenblumenkerne', 'slug': 'sonnenblumenkern', 'width': 11, 'height': 21, 'count': 15},
    ],
    'sweet': [
        {'label': 'Trauben', 'slug': 'traube', 'width': 25, 'height': 35, 'count': 5},
        {'label': 'Getrocknete Cranberries', 'slug': 'cranberry', 'width': 25, 'height': 16, 'count': 8},
        {'label': 'Apfel', 'slug': 'apfel', 'width': 86 / 2, 'height': 120 / 2, 'count': 6},
        {'label': 'Birne', 'slug': 'birne', 'width': 94 / 2, 'height': 120 / 2, 'count': 6},
        {'label': 'Blaubeeren', 'slug': 'blaubeere', 'width': 15, 'height': 16, 'count': 13},
        {'label': 'Himbeeren', 'slug': 'himbeere', 'width': 26, 'height': 26, 'count': 8},
    ],
    'extras': [
        {'label': 'Feta', 'slug': 'feta', 'width': 98 / 2, 'height': 42, 'count': 5},
        {'label': 'Gouda', 'slug': 'gouda', 'width': 59, 'height': 56, 'count': 4},
        {'label': 'Avocado', 'slug': 'avocado', 'width': 108 / 2, 'height': 66 / 2, 'count': 6},
        {'label': 'Mozzarella', 'slug': 'mozzarella', 'width': 41, 'height': 96 / 2, 'count': 6},
        {'label': 'Veggy Chicken', 'slug': 'chicken', 'width': 100, 'height': 53, 'count': 2},
    ]


}


function shuffle() {
    document.querySelectorAll('.particle').forEach(el => {
        document.body.removeChild(el);
    })

    const list = [];
    for (let cat in ingredients) {
        const ing = ingredients[cat][Math.floor(Math.random() * ingredients[cat].length)];
        list.push(ing);

    }

    showIngredientList(list);


    drawCanvas();

}

function showIngredientList(list) {
    list.forEach(ing => {
        for (let i = 0; i < ing.count; i++) {
            spawnParticle(ing);
        }
    });


    gsap.to(document.querySelector('.schuessel'), {opacity: 1, duration: 0.25});

    document.querySelector('.recipeList').innerHTML = list.map(i => `<li>${i.label}</li>`).join('');


    history.pushState({}, '', '/salat/' + list.map(i => i.slug).join('-'));

    gsap.to('.recipeList li', {
        stagger: 0.25,
        duration: 0.5,
        opacity: 1,
    })
}

function spawnParticle(ing) {
    const el = document.createElement('img');
    el.classList.add('particle');
    el.setAttribute('src', 'ingredients/' + ing.slug + '.png');
    el.setAttribute('width', ing.width);
    el.setAttribute('height', ing.height);


    document.body.appendChild(el);


    const left = document.querySelector('.schuesselInnen').getBoundingClientRect().left
    const bottom = document.querySelector('.schuesselAussen').getBoundingClientRect().bottom - 170

    gsap.set(el, {opacity: 0, left: left + (Math.floor(Math.random() * 260) + 10)});

    const heightJitter = Math.floor(Math.random() * 30);
    const turnJitter = Math.floor(Math.random() * 90) - 90;


    gsap.to(el, {
        duration: 1.8,
        opacity: 1,
        y: bottom - heightJitter,
        delay: Math.random(),
        rotate: turnJitter + 'deg'
    });
}


function drawCanvas() {
    const canvas = document.getElementById('shareCanvas');

    const ctx = canvas.getContext("2d");
    const innen = document.querySelector(".schuesselInnen");
    const aussen = document.querySelector(".schuesselOhneWeiss");

    ctx.fillStyle = '#B88839';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const leftPad = 180;

    ctx.drawImage(innen, leftPad + 228, 225, 1500 / 2, 854 / 2);

    document.querySelectorAll('.particle').forEach(el => {
        const heightJitter = Math.floor(Math.random() * 80);
        ctx.drawImage(el, leftPad + 200 + (Math.floor(Math.random() * 550) + 30), 270 + heightJitter);

    })

    ctx.drawImage(aussen, leftPad + 228, 320, 750, 335);

    ctx.fillStyle = '#fff';
    ctx.font = "bold 64px Avenir Next";
    ctx.fillText("salatgenerator.de", 25, 80);

    ctx.font = "32px Avenir Next";

    document.querySelectorAll('.recipeList li').forEach((node, i) => {
        ctx.fillText(node.textContent, 25, 145 + (i * 45));
    })

    return canvas;
}

document.getElementById('shareCanvas').addEventListener('click', ev => {
    drawCanvas();
})

document.querySelector('.ctaButton').addEventListener('click', ev => {
    shuffle();
})

document.querySelector('.shareButton').addEventListener('click', ev => {

    try {
        const canvas = drawCanvas();

        canvas.toBlob((blob) => {
            let file = new File([blob], "salat.png", {type: "image/png"});

            navigator.share({
                title: 'salatgenerator.de',
                text: 'Schau dir diesen Salat an!',
                url: location.href,
                files: [file]
            })
        }, 'image/png');

    } catch (err) {
        console.log('Unable to share', err)
    }
})


if (/^salat/.test(location.pathname.substring(1))) {
    const [_, ig] = location.pathname.substring(1).split('/');
    const filled = ig.split('-').map(ing => {
        for (let i in ingredients) {
            for (let o in ingredients[i]) {
                if (ingredients[i][o].slug == ing) {
                    return ingredients[i][o];
                }
            }
        }

        return null;
    })

    showIngredientList(filled);
}

if(!navigator.share) {
    document.querySelector('.share').style='display: none;'
}
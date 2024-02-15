import ScrollReveal from 'scrollreveal';

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: '2500',
    delay:'1000'
})


sr.reveal('.card')
sr.reveal('#card_qualities_left', {interval: '100', origin: 'left'})
sr.reveal('#card_qualities_right', {interval: '100', origin: 'right'})
sr.reveal('.left', {interval: '100', origin: 'bottom'})




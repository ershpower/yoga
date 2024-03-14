window.addEventListener('DOMContentLoaded', () => {

    'use strict'

    let info = document.querySelector('.info-header')
    let tabContent = document.querySelectorAll('.info-tabcontent')
    let tabs = document.querySelectorAll('.info-header-tab')

    //табы - старт
    function hideAllTabs(){
        for(let i = 0; i < tabContent.length; i ++){
            tabContent[i].classList.remove('show')
            tabContent[i].classList.add('hide')
        }
    }

    function showTabByIndex(index){
        for(let i = 0; i < tabContent.length; i ++){
            if(index === i){
                tabContent[i].classList.remove('hide')
                tabContent[i].classList.add('show')
            }
        }
    }

    info.addEventListener('click', event => {
        let target = event.target
        if(target && target.classList.contains('info-header-tab')){
            for(let i = 0; i < tabs.length; i ++){
                if(target == tabs[i]){
                    hideAllTabs();
                    showTabByIndex(i)
                    break
                }
            }
        }
    })

    hideAllTabs();
    showTabByIndex(1);

    //табы - конец

    //таймер - старт

    let deadLine = '2025-3-18'

    function getTimeRemaining() {
        let t = Date.parse(deadLine) - Date.parse(new Date())
        let seconds = Math.floor((t/1000) % 60)
        let minutes = Math.floor((t/1000/60) % 60)
        let hours = Math.floor((t/(1000*60*60)))
        return{
            total: t,
            seconds, hours, minutes
        }
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id);
        let hours = timer.querySelector('.hours');
        let minutes = timer.querySelector('.minutes');
        let second = timer.querySelector('.seconds');
        let timerId = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endTime)
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            second.textContent = t.seconds;
            const endDateMilliSeconds = new Date(endTime).getMilliseconds();
            if(t.total <= endDateMilliSeconds){
                clearInterval(timerId);
                hours.textContent = "00";
                minutes.textContent = "00";
                second.textContent = "00";
            }
        }
    }
    setClock('timer', deadLine)

    //таймер - конец


    //модальное окно - старт

    let more = document.querySelector('.more')
    let overlay = document.querySelector('.overlay')
    let close = document.querySelector('.popup-close')

    more.addEventListener('click', (event) => {
        overlay.style.display = 'block'
        event.target.classList.add('more-splash')
        document.body.style.overflow = 'hidden'
    })

    close.addEventListener('click', () => {
        overlay.style.display = 'none'
        more.classList.remove('more-splash')
        document.body.style.overflow = ''
    })


    //модальное окно - конец

    //модальное окно фидбэк

    let message = {
        loading: 'Загрузка',
        success: 'Успешно! Мы с вами свяжемся',
        failure: 'Ошибка'
    }

    let form = document.querySelector('.main-form')
    let input = document.getElementsByTagName('input')
    let statusMessage = document.createElement('div')
    statusMessage.classList.add('status')

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        let formData = new FormData(form)
        let obj = {}
        formData.forEach(((value, key) => {
            obj[key] = value
        }))
        console.log(obj)
        //тут какой-то фетч на сервер -_-
        if(true)
            alert(message.success)
        overlay.style.display = 'none'
        more.classList.remove('more-splash')
        document.body.style.overflow = ''
    })

    //модальное окно фидбэк


    //слайдер - старт
    let slideIndex = 1;
    let slides = document.querySelectorAll('.slider-item')
    let prev = document.querySelector('.prev')
    let next = document.querySelector('.next')
    let sliderDots = document.querySelector('.slider-dots')
    let dots = document.querySelectorAll('.dot')

    function showSlides(n) {
        if(n > slides.length){
            slideIndex = 1
        }
        if(n < 1){
            slideIndex = slides.length
        }

        slides.forEach((item) => {
            item.style.display = 'none'
        })
        dots.forEach((item) => {
            item.classList.remove('dot-active')
        })

        slides[slideIndex - 1].style.display = 'block'
        dots[slideIndex - 1].classList.add('dot-active')
    }

    showSlides(slideIndex)

    prev.addEventListener('click', () => {
        slideIndex -= 1;
        showSlides(slideIndex)
    })
    next.addEventListener('click', () => {
        slideIndex += 1;
        showSlides(slideIndex)
    })

    sliderDots.addEventListener('click', (event) => {
        for(let i = 0; i < dots.length; i++){
            if(event.target.classList.contains('dot') && event.target == dots[i]){
                slideIndex = i+1
                showSlides(slideIndex)
            }
        }
    })

    //слайдер - конец

    //калькулятор - старт
    let persons = document.querySelectorAll('.counter-block-input')[0]
    let restDays = document.querySelectorAll('.counter-block-input')[1]
    let place = document.getElementById('select')
    let totalValue = document.getElementById('total')
    let personsSum = 0
    let daysSum = 0
    let total = 0


    totalValue.textContent = total

    persons.addEventListener('input', (event) => {
        personsSum = +event.target.value
        if(personsSum !== 0 && personsSum > 0 && daysSum !== 0 && daysSum > 0 && personsSum != NaN && daysSum != NaN){
            total = (personsSum + daysSum) * 10
            totalValue.textContent = total
        }
        else {
            totalValue.textContent = 0
        }
    })

    restDays.addEventListener('input', (event) => {
        daysSum = +event.target.value
        if(personsSum !== 0 && personsSum > 0 && daysSum !== 0 && daysSum > 0 && personsSum != NaN && daysSum != NaN){
            total = (personsSum + daysSum) * 10
            totalValue.textContent = total
        }
        else {
            totalValue.textContent = 0
        }
    })

    place.addEventListener('change', function(event){
        const selectedValue = event.target.value;
        if(personsSum !== 0 && personsSum > 0 && daysSum !== 0 && daysSum > 0 && personsSum != NaN && daysSum != NaN){
            let a = total
            totalValue.textContent = a * selectedValue
        }
        else {
            totalValue.textContent = 0
        }
    })

    //калькулятор - конец

})
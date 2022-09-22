
window.onload=()=>{

    //#region variables

    const sliderContainer = document.querySelector('.slider-container');

    const sections = document.querySelectorAll('section');

    const slideRight = document.querySelector('.right-side-container');
    const slideLeft = document.querySelector('.left-side-container');
    
    const slidesLenght = slideLeft.querySelectorAll('section').length;
    
    const navList = document.querySelectorAll('#list li'), tab = [];
    
    let activeSlideIndex = 0;
    
    const hamburguerICO = document.querySelector('.fa-bars');
    const navBar = document.querySelector('nav');
    const closeICO = document.querySelector('.fa-times');
    
    const animationDuration = 2000;
    
    let lastTime = 0;

    //#endregion

    //#region sliderMenu Event

     hamburguerICO.addEventListener('click', () => {
        navBar.classList.add('open-nav');
        changeContainerMargin('menuOpen');
    })

    closeICO.addEventListener('click', () => {
        navBar.classList.remove('open-nav');
        changeContainerMargin('menuClosed');
    })

    //#endregion

    //#region translate Container

    function changeContainerMargin(menuEvent){
        if(window.matchMedia("(min-width: 768px)").matches){
            if(menuEvent === 'menuOpen'){
                sliderContainer.style.transform = `translateX(20.5%)`;
            }
            if(menuEvent === 'menuClosed'){
                sliderContainer.style.transform = `translateX(0%)`;
            }
        }
        if(window.matchMedia("(max-width: 767px)").matches){
            if(menuEvent === 'menuOpen'){
                sliderContainer.style.transform = `translateY(42vh)`;
            }
            if(menuEvent === 'menuClosed'){
                sliderContainer.style.transform = `translateY(0%)`;
            }
        }
    }

    //#endregion

    if(window.matchMedia("(min-width: 768px)").matches){

//#region navBar Navigation

    for(var i = 0; i < navList.length; i++){
        tab.push(navList[i].innerHTML);
    }

    for(var i = 0; i < navList.length; i++){
        navList[i].onclick = function() {
            activeSlideIndex = tab.indexOf(this.innerHTML);
            changeSlide();
        }
    }

    //#endregion

    //#region change Slide

    function changeSlide(direction){
        const sliderHeight = sliderContainer.clientHeight;

        console.log(activeSlideIndex);
        console.log(sliderHeight);

        if(direction === 'up'){
            activeSlideIndex--;
            if(activeSlideIndex > slidesLenght - 1){
                activeSlideIndex = 0;
            }
        } else if (direction === 'down') {
            activeSlideIndex++;
            if(activeSlideIndex < 0){
                activeSlideIndex = slidesLenght - 1;
            }
        }

        slideRight.style.transform = `translateY(${
            activeSlideIndex * sliderHeight
        }px)`;
        slideLeft.style.transform = `translateY(-${
            activeSlideIndex * sliderHeight
        }px)`;


        changeHamburguerColor();
    }

    //#endregion

        //#region slides Top Lenght

        slideLeft.style.top = `-${(slidesLenght - 1) / 100}vh`;
        slideRight.style.top = `-${(slidesLenght - 1) * 100}vh`;

        //#endregion

        //#region keyDown Event

        window.addEventListener('keydown', (key) => {
            const currentTime = new Date().getTime();

            if(currentTime - lastTime < animationDuration){
                key.preventDefault();
                return; 
            }
            else{
                if(key.code === 'ArrowUp'){
                    if(activeSlideIndex === 0){
                        key.preventDefault();
                    }
                    else if(activeSlideIndex > 0){
                        changeSlide('up');
                    }
                }
                if(key.code === 'ArrowDown'){
                    if(activeSlideIndex === slidesLenght - 1){
                        key.preventDefault();
                    }
                    else if(activeSlideIndex < slidesLenght - 1){
                        changeSlide('down');
                    }
                }
                lastTime = currentTime;
                return;
            }
        })

        //#endregion

        //#region scroll Event

        window.addEventListener('scroll', (s) => {
            s.preventDefault();
        })

        //#endregion

        //#region wheel Event

        window.addEventListener('wheel', (e) => {
            const currentTime = new Date().getTime();

            if(currentTime - lastTime < animationDuration){
                e.preventDefault();
                return; 
            }
            else{
                if(e.deltaY < 0){
                    if(activeSlideIndex === 0){
                        return false;
                    }
                    else if(activeSlideIndex > 0){
                        changeSlide('up');
                    }
                }
                if(e.deltaY > 0){
                    if(activeSlideIndex === slidesLenght - 1){
                        return false;
                    }
                    else if(activeSlideIndex < slidesLenght - 1){
                        changeSlide('down');
                    }
                }
                lastTime = currentTime;
                return;
            }
        })

        //#endregion

        //#region change Hamburguer Color

        function changeHamburguerColor(){
            if(activeSlideIndex > 0){
                hamburguerICO.style.color = "#000000";
                navBar.style.borderRight = "1px solid grey";
            }
            else if(activeSlideIndex === 0){
                hamburguerICO.style.color = "#ffffff";
                navBar.style.borderRight = "none";
            }
        }

        //#endregion

        return;
    }

    if(window.matchMedia("(max-width: 767px)").matches){

    }

    
}

 
    
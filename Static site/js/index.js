let slideIndex = 1;
let sliderDotsHolder = document.getElementsByClassName("slides-dots")[0];
let leftSlide = document.getElementById("prev");
let rightSlide = document.getElementById("next");
let ourCompanyImg = document.getElementsByClassName("img__our-company")[0];
let ourHistoryImg = document.getElementsByClassName("img__our-history")[0];
let signatureImg = document.getElementsByClassName("image__signature")[0];
let imgLogo = document.getElementsByClassName("image-logo");
let buttonReadMore = document.getElementsByClassName("button__read-more");
let spanReadMore = document.getElementsByClassName("span__read-more")
let burgerMenu = document.getElementsByClassName("navigation-icon")[0];
let navigationMenu = document.getElementsByClassName("navigation-menu")[0];

let fetchImages = () => {
    fetch("js/images.json")
        .then(res => res.json())
        .then(res => {
            getData(res)
            imagesOnLoad()
        })
}
window.addEventListener("load", () => {
    fetchImages()
    expandButton()
    colapseMenu()
})


let getData = (data) => {
    ourCompanyImg.src = data.ourCompany.image;
    ourCompanyImg.alt = data.ourCompany.name;
    ourHistoryImg.src = data.ourHistory.image;
    ourHistoryImg.alt = data.ourHistory.name;
    signatureImg.src = data.signature.image;
    signatureImg.alt = data.signature.name;
    for (let i = 1; i < 5; i++) {
        let sliderContainer = document.getElementsByClassName("slider-container")[0];
        let sliderImgs = document.createElement("img");
        let sliderNames = "sliderImage" + i;
        sliderContainer.insertBefore(sliderImgs, sliderDotsHolder);
        if (i !== 1) {
            sliderImgs.style = "display:none";
        }
        sliderImgs.className = "slider-images";
        sliderImgs.src = data[sliderNames].image;
        sliderImgs.alt = data[sliderNames].name;
    }
    for (let i = 0; i < imgLogo.length; i++) {
        imgLogo[i].src = data.logo.image;
        imgLogo[i].alt = data.logo.name;
    }

}

let imagesOnLoad = () => {
    let mySlides = document.getElementsByClassName("slider-images");
    for (let i = 0; i < mySlides.length; i++) {
        let dotSpan = document.createElement("span");
        sliderDotsHolder.appendChild(dotSpan);
        dotSpan.className = "slides-dot"
        if (i == 0) {
            dotSpan.classList.add("active-dot")
        }
    }
    let sliderDots = document.getElementsByClassName("slides-dot");
    let slider = (n) => {
        let i;
        if (n > mySlides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = mySlides.length
        }
        for (i = 0; i < mySlides.length; i++) {
            mySlides[i].style.display = "none";
            sliderDots[i].className = "slides-dot";
        }
        mySlides[slideIndex - 1].style.display = "block";
        sliderDots[slideIndex - 1].className = "slides-dot active-dot";
    }

    slider(slideIndex);

    let currentSlide = (n) => slider(slideIndex = n);

    let buttonSlide = (n) => slider(slideIndex += n);

    leftSlide.addEventListener("click", () => {
        buttonSlide(-1);
    })
    rightSlide.addEventListener("click", () => {
        buttonSlide(1);
    })
    for (let i = 0; i < sliderDots.length; i++) {
        sliderDots[i].addEventListener("click", () => currentSlide(i + 1))
    }
}

let readMore = (button, span) => {
    if (span.style.display === "none") {
        span.style.display = "inline"
        button.innerHTML = "READ LESS"
    } else {
        span.style.display = "none";
        button.innerHTML = "READ MORE"
    }
}

let expandButton = () => {
    for (let i = 0; i < buttonReadMore.length; i++) {
        buttonReadMore[i].addEventListener("click", () => readMore(buttonReadMore[i], spanReadMore[i]));
    }
}

let colapseMenu = () => {
    burgerMenu.addEventListener("click", () => {
        if (navigationMenu.style.display == "flex") {
            navigationMenu.style.display = "none";
            burgerMenu.src = "icons/Hamburger_icon.png";
            document.getElementsByClassName("nav-bar")[0].style.backgroundColor = "white"
        } else {
            navigationMenu.style.display = "flex";
            burgerMenu.src = "icons/cross-sign.png";
            document.getElementsByClassName("nav-bar")[0].style.backgroundColor = "#7799bb"
        }
    })
}

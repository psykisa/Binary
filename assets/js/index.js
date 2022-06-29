let list = document.querySelector(".page__portfolio-list.list");
list.onclick = function (e) {
    let value = e.target.dataset.item;
    let item = document.querySelectorAll(".page__portfolio-item");
    if (value == 1) {
        item.forEach((value) => { value.style.display = ""; });
    }
    else {
        item.forEach((value) => { value.style.display = "none"; });
        document.querySelectorAll(".item" + value).forEach((value) => { value.style.display = "" });
    }
};

Array.from(document.querySelector('.page__portfolio-list').children,
    item => {
        item.addEventListener('pointerdown', () => {
            Array.from(document.querySelector('.page__portfolio-list').children, value => value.style.color = 'black');
            item.style.color = "#ada074";
        })
    });

window.onscroll = (event) => {
    let distanse = 0 - scrollY / 2 + "px";
    document.querySelector(".header-block__background").style.transform = `translate(0, ${distanse}`;
};



function lightBox() {
    let portfolio = document.querySelector('.page__portfolio-colection');
    let portfolioImages = document.querySelectorAll('.page__portfolio-cover');
    let prevArrow;
    let nextArwow;
    let dataImage;
    let traslateX = 500;
    for (let i = 0; i < portfolioImages.length; i++) {
        portfolioImages[i].dataset.numberImage = i;
        portfolioImages[i].addEventListener('pointerdown', () => {
            dataImage = portfolioImages[i].dataset.numberImage
            let popupParent = document.createElement('div');
            let buttonClose = document.createElement('div');
            let popupChild = document.createElement('img');
            prevArrow = document.createElement('div');
            nextArwow = document.createElement('div');
            popupParent.classList.add("popup-container");
            popupChild.classList.add("popup-image");
            buttonClose.classList.add("popup-close");
            prevArrow.classList.add("navigation-arrows", "prev-arrow");
            nextArwow.classList.add("navigation-arrows", "next-arrow");
            popupParent.append(prevArrow, nextArwow, buttonClose, popupChild);
            portfolio.append(popupParent);
            buttonClose.textContent = "close";
            popupChild.src = portfolioImages[i].src;
            setOpacity(popupChild);

            buttonClose.addEventListener('pointerdown', () => {
                popupParent.remove();
            })

            let arrows = document.querySelectorAll('.navigation-arrows');
            arrows.forEach((value) => {
                value.addEventListener('pointerdown', () => {
                    value.style.transition = "0.3s";
                    value.style.transform = "scale(0.8)";
                    if (value.classList.contains("next-arrow")) {
                        traslateX = (traslateX > 0) ? traslateX : -traslateX;
                        setOpacity(popupChild);
                        if (dataImage == portfolioImages.length - 1)
                            dataImage = -1;
                        popupChild.src = portfolioImages[++dataImage].src;

                    }
                    if (value.classList.contains("prev-arrow")) {
                        traslateX = (traslateX < 0) ? traslateX : -traslateX;
                        setOpacity(popupChild);
                        if (dataImage == 0)
                            dataImage = portfolioImages.length;
                        popupChild.src = portfolioImages[--dataImage].src;
                    }
                });
                 value.addEventListener('pointerup', setScale)
                 value.addEventListener('pointerout', setScale)
            });
        })

    };

    function setScale() {
        console.log("ghbsjfbkls")
        this.style.transition = "1s";
        this.style.transform = "scale(1.2)";
    }
    function setOpacity(popupChild) {
        popupChild.style.transition = "0s";
        popupChild.style.transform = `translateX(${traslateX}px)`;
        popupChild.style.opacity = 0;
        setTimeout(() => {
            popupChild.style.transition = "1s";
            popupChild.style.opacity = 1;
            popupChild.style.transform = "translateX(0)"
        }, 200)
    }
}
lightBox();


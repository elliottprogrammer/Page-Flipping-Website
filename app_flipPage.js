// Page Flipping Website
// Author: Bryan Elliott - @elliottPrgmr
// Vanilla javascript - No dependencies

// UI Controller
const UIController = (function() {

    const bgPath = 'images/'
    const navLinkClassName = 'navlink';
    const UIElements = {
        spinningParent: document.querySelector('.page__container'),
        frontPage:       document.getElementById('front-page'),
        backPage:      document.getElementById('back-page')   
    }

    return {
        navLinkClassName,
        getElements: function() { return UIElements; },
        loadTemplate: function(templateID, elem) {
            const template = document.getElementById(templateID).cloneNode(true);
            const templateBg = template.getAttribute('data-background');
            if (templateBg) {
                elem.style.backgroundImage = `url(${bgPath + templateBg})`;
            }
            elem.innerHTML = '';
            elem.appendChild(template);

        },
        setZrotation(loadingPage, rotationAmount) {
            if (loadingPage === UIElements.backPage) {
                UIElements.backPage.style.transform = `rotateY(180deg) rotateZ(${rotationAmount}deg)`;
            } else {
                UIElements.frontPage.style.transform = `rotateZ(${rotationAmount}deg)`;
            }
        },
        getRotation: function() {
            const re = /rotate(X|Y)\(([+-]?\d+)deg\)/g;
            let matches;
            let currentDegrees = {
                x: 0,
                y: 0
            }
            if (UIElements.spinningParent.style.transform !== '') {
                
                while(matches = re.exec(UIElements.spinningParent.style.transform)) {
                    currentDegrees[matches[1].toLowerCase()] = parseInt(matches[2]);
                }
            }
            return currentDegrees;
        },
        flipPage: function(newRotationDegrees) {
            UIElements.spinningParent.style.transform = `rotateX(${newRotationDegrees.x}deg) rotateY(${newRotationDegrees.y}deg)`;
        }
    }
})();



// Page Controller / Page state
const PageController = (function() {

    const UIElements = UIController.getElements();

    // page state
    const pageState = {
        templateName: '',
        rotateDirection: '',
        amountToRotate: 0,
        viewingPage: UIElements.frontPage,
        viewingPageZrotation: 0,
        frontPageZrotation: 0,
        loadingPage: UIElements.backPage,
        loadingPageZrotation: 0,
        backPageZrotation: 0,
        showingFront: true,
        currentRotation: {
            x: 0,
            y: 0
        },
        newRotation: {
            x: 0,
            y: 0
        }
    }

    return {
        turnPage: function(navLink, callback) {
            pageState.templateName = navLink.getAttribute('data-template');
            pageState.amountToRotate = parseInt(navLink.getAttribute('data-rotate'));
            pageState.rotateDirection = navLink.getAttribute('data-rotatedir');

            if (pageState.showingFront) {
                pageState.loadingPage = UIElements.backPage;
                pageState.viewingPage = UIElements.frontPage;
            } else {
                pageState.loadingPage = UIElements.frontPage;
                pageState.viewingPage = UIElements.backPage;
            }

            UIController.loadTemplate(pageState.templateName, pageState.loadingPage);

            if (pageState.rotateDirection === 'X' ) {
                // spin vertical
                if (pageState.loadingPage === UIElements.backPage) {
                    pageState.backPageZrotation = pageState.frontPageZrotation - 180;
                    pageState.loadingPageZrotation = pageState.backPageZrotation;
                } else {
                    pageState.frontPageZrotation = pageState.backPageZrotation + 180;
                    pageState.loadingPageZrotation = pageState.frontPageZrotation;
                }
                UIController.setZrotation(pageState.loadingPage, pageState.loadingPageZrotation);

            } else if (pageState.rotateDirection === 'Y') {
                // spin horizontal
                if (pageState.loadingPage === UIElements.backPage) {
                    if (pageState.backPageZrotation !== pageState.frontPageZrotation) {
                        pageState.backPageZrotation = pageState.frontPageZrotation;
                        pageState.loadingPageZrotation = pageState.backPageZrotation;
                    }
                } else {
                    if (pageState.frontPageZrotation !== pageState.backPageZrotation) {
                        pageState.frontPageZrotation = pageState.backPageZrotation;
                        pageState.loadingPageZrotation = pageState.frontPageZrotation;
                    }
                }
                UIController.setZrotation(pageState.loadingPage, pageState.loadingPageZrotation);
                if ((pageState.loadingPageZrotation % 360) !== 0) {
                    // reverse direction of rotation when loadpage is flipped around
                    pageState.amountToRotate = pageState.amountToRotate * -1;
                }
            }
            

            pageState.currentRotation = {...UIController.getRotation()};
            pageState.newRotation.x = pageState.rotateDirection == 'X' ?  pageState.currentRotation.x + pageState.amountToRotate : pageState.currentRotation.x;
            pageState.newRotation.y = pageState.rotateDirection == 'Y' ?  pageState.currentRotation.y + pageState.amountToRotate : pageState.currentRotation.y;

            UIController.flipPage(pageState.newRotation);

            pageState.showingFront = !pageState.showingFront;
            setTimeout(() => {
                callback(pageState.templateName);
            }, 2700);
        }
    }

})();



// Main PageFlipper
const PageFlipper = (function(UIController, PageController) {

    return {
        init: function() {
            UIController.loadTemplate('home', document.getElementById('front-page'));
            document.addEventListener('click', function(e) {
                if (e.target && e.target.classList.contains(UIController.navLinkClassName)) {
                    PageController.turnPage(e.target, function(currentPage) {
                        console.log(currentPage);
                    });
                }
            });
        }
    }

})(UIController, PageController);

PageFlipper.init();
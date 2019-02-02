const UIController = (function() {

    const bgPath = './images/'
    const navLinkClassName = 'navlink';
    const UIElements = {
        spinningParent: document.querySelector('.page__container'),
        frontPage:      document.getElementById('front-page'),
        backPage:       document.getElementById('back-page')   
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

export default UIController;
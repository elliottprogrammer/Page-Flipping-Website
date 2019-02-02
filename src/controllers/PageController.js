import UIController from './UIController';
// Page Controller / Page state
const PageController = (function(UIController) {

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

})(UIController);

export default PageController;
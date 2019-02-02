import styles from './scss/main.scss';

import UIController from './controllers/UIController';
import PageController from './controllers/PageController';

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
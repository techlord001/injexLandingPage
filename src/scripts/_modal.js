/* Script for generating, presenting & closing modal windows */

// Variable for close button
const close = document.querySelector('.close-modal');

// Close modal
close.addEventListener('click', () => {
    modal.closeModal(modalImgs);
})

// Grab arrows
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

arrowLeft.addEventListener('click', () => {
    modal.previousModal(modalImgs);
});
arrowRight.addEventListener('click', () => {
    modal.nextModal(modalImgs);
});

// Open, modify & close modal functions
const modal = {
    i: 0,
    displayImg(id, imgs) {
        imgs.forEach(img => {
            if (img.dataset.modalId === id) {
                img.classList.toggle('display-none');
                this.i = id;
            }
        });
    },
    nextModal(modalImgs) {
        this.i++;
        if (this.i > 2) {
            this.i = 0;
        }
        modalImgs.forEach(img => {            
            if (img.dataset.modalId == this.i) {
                img.classList.remove('display-none');
            } else {                
                console.log(`3: ${this.i}`);
                img.classList.add('display-none');
            }
        });
    },
    previousModal(modalImgs) {
        this.i--;
        if (this.i < 0) {
            this.i = 2;
        }
        modalImgs.forEach(img => {
            if (img.dataset.modalId == this.i) {
                img.classList.remove('display-none');
            } else {
                img.classList.add('display-none');
            }
        });
    },
    openModal(id, imgs) {
        modalWrapper.classList.remove('display-none');
        this.i = id;
        this.displayImg(id, imgs);
    },
    closeModal(imgs) {
        modalWrapper.classList.add('display-none');
        imgs.forEach(img => {
            img.classList.add('display-none');
        });
        this.i = 0;
    }
}

// Integrate script to site
// Grabbing wrapper that holds all modals on page
const modalWrapper = document.querySelector('.modal-wrapper');
// Grab images
const imgs = document.querySelectorAll('.img');
// Grab modal images
const modalImgs = document.querySelectorAll('.modal-img');

imgs.forEach(img => {
    img.addEventListener('click', () => {
        modal.openModal(img.dataset.modalId, modalImgs);
    })
});
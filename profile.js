function updateActiveSlide() {
  let lists = document.querySelectorAll('.item');
  let slide = document.getElementById('slide');
  lists.forEach((item, index) => {
    item.classList.toggle('active', index === 1);
    if (index === 1) {
      const bgImage = item.style.backgroundImage;
      document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${bgImage} no-repeat center center/cover`;
    }
  });
}

document.getElementById('next').onclick = function () {
  let lists = document.querySelectorAll('.item');
  let slide = document.getElementById('slide');
  slide.appendChild(lists[0]);
  updateActiveSlide();
};

document.getElementById('previous').onclick = function () {
  let lists = document.querySelectorAll('.item');
  let slide = document.getElementById('slide');
  slide.prepend(lists[lists.length - 1]);
  updateActiveSlide();
};

// Initialize active class and body background
updateActiveSlide();

// Autoplay functionality
let autoplay = setInterval(() => {
  let lists = document.querySelectorAll('.item');
  let slide = document.getElementById('slide');
  slide.appendChild(lists[0]);
  updateActiveSlide();
},11000);

document.getElementById('slide').addEventListener('mouseenter', () => clearInterval(autoplay));
document.getElementById('slide').addEventListener('mouseleave', () => {
  autoplay = setInterval(() => {
    let lists = document.querySelectorAll('.item');
    let slide = document.getElementById('slide');
    slide.appendChild(lists[0]);
    updateActiveSlide();
  }, 11000);
});
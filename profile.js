let images = [
    'images/1.jpeg',
    'images/five.jpeg',
    'images/3.jpeg',
    'images/4.jpeg',
    'images/5.jpg',
    'images/6.jpg',
    'images/7.jpg',
    'images/8.jpeg',
    'images/9.jpeg',
    'images/ten.jpeg',
    'images/eleven.jpeg'
];
let imageDataURLs = [...images];
let names = [
    'Welcome',
    'Moments',
    'Hürrem',
    'Hürrem IV',
    'Hürrem V',
    'Hürrem VI',
    'Beauty',
    'Extraordinary',
    'Grace',
    'Divine',
    'Finale'
];
let descriptions = [
    'Explore the beauty of this moment',
    'A snapshot of serenity',
    'Timeless elegance captured',
    'Grace in every detail',
    'A vision of beauty',
    'Nature’s masterpiece',
    'Radiance in simplicity',
    'A moment of wonder',
    'A touch of elegance',
    'A creation of wonder',
    'The last but not least'
];

function updateActiveSlide() {
    let lists = document.querySelectorAll('.item');
    lists.forEach((item, index) => {
        item.classList.toggle('active', index === 1);
        if (index === 1) {
            console.log('Active slide:', item.style.backgroundImage);
            const bgImage = item.style.backgroundImage;
            document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${bgImage} no-repeat center center/cover`;
        }
    });
}

function handleImageUpload(event) {
    const files = event.target.files;
    const slide = document.getElementById('slide');
    for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const src = e.target.result;
            console.log('Uploaded image:', src.substring(0, 30));
            images.push(src);
            imageDataURLs.push(src);
            names.push('Uploaded Image');
            descriptions.push('User-uploaded photo');
            const newItem = document.createElement('div');
            newItem.className = 'item';
            newItem.style.backgroundImage = `url(${src})`;
            newItem.innerHTML = `
                <div class="content">
                    <div class="name">Uploaded Image</div>
                    <div class="description">User-uploaded photo</div>
                    <button class="see-more" onclick="openDetails('slide-${images.length}')">See More</button>
                    <button class="download-btn" onclick="downloadImage('${src}', 'image-${images.length}')">Download</button>
                </div>
            `;
            slide.appendChild(newItem);
            updateActiveSlide();
        };
        reader.readAsDataURL(file);
    }
}

function downloadImage(src, filename) {
    console.log('Downloading:', src, filename);
    const index = images.indexOf(src);
    if (index === -1) {
        console.error('Image not found:', src);
        return;
    }
    const link = document.createElement('a');
    let href = imageDataURLs[index];
    if (href.startsWith('data:')) {
        const extension = src.includes('image/png') ? 'png' : 'jpeg';
        href = href.replace(/^data:image\/[^;]+/, `data:image/${extension}`);
        filename = `${filename}.${extension}`;
    }
    link.href = href;
    link.download = filename;
    console.log('Href:', link.href);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function openDetails(slideId) {
    alert(`Details for ${slideId}: Coming soon!`);
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
}, 11000);

document.getElementById('slide').addEventListener('mouseenter', () => clearInterval(autoplay));
document.getElementById('slide').addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
        let lists = document.querySelectorAll('.item');
        let slide = document.getElementById('slide');
        slide.appendChild(lists[0]);
        updateActiveSlide();
    }, 11000);
});

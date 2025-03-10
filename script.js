const users = {
    "user1": "3942", "user2": "8173", "user3": "6529", "user4": "1084", "user5": "2751",
    "user6": "4367", "user7": "9502", "user8": "7234", "user9": "3641", "user10": "5893",
    "user11": "1047", "user12": "8715", "user13": "2468", "user14": "9305", "user15": "6782",
    "user16": "5170", "user17": "8023", "user18": "3654", "user19": "2948", "user20": "7591",
    "user21": "4106", "user22": "6239", "user23": "5723", "user24": "8150", "user25": "3971",
    "user26": "2314", "user27": "7482", "user28": "6059", "user29": "2930", "user30": "6817",
    "user31": "7428", "user32": "5301", "user33": "9823", "user34": "1574", "user35": "8642",
    "user36": "9051", "user37": "6138", "user38": "4729", "user39": "3215", "user40": "5973",
    "user41": "8436", "user42": "2605", "user43": "9381", "user44": "7502", "user45": "6841",
    "user46": "5097", "user47": "3284", "user48": "9125", "user49": "4730", "user50": "6914",
    "user51": "8029", "user52": "5372", "user53": "3648", "user54": "2106", "user55": "9473",
    "user56": "8751", "user57": "6802", "user58": "4325", "user59": "7159", "user60": "2947",
    "user61": "8361", "user62": "5012", "user63": "6934", "user64": "2480", "user65": "5793",
    "user66": "8062", "user67": "3124", "user68": "9468", "user69": "7281", "user70": "5103",
    "user71": "3857", "user72": "6792", "user73": "2348", "user74": "8471", "user75": "9016",
    "user76": "7139", "user77": "5648", "user78": "2507", "user79": "8694", "user80": "4371",
    "user81": "5283", "user82": "9702", "user83": "4168", "user84": "3057", "user85": "6892",
    "user86": "7509", "user87": "8374", "user88": "6938", "user89": "5126", "user90": "2783",
    "user91": "4905", "user92": "6587", "user93": "3401", "user94": "8257", "user95": "1736",
    "user96": "9472", "user97": "6804", "user98": "5293", "user99": "7125", "user100": "3698"
};

// Login tekshirish
function checkLogin() {
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;

    if (users[login] && users[login] === password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "gallery.html";
    } else {
        document.getElementById('error-message').innerText = "Incorrect login or password!";
    }
}

// Rasm yuklash
function uploadImage() {
    let fileInput = document.getElementById('imageUpload');

    if (fileInput.files.length > 0) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let images = JSON.parse(localStorage.getItem("images")) || [];
            images.push(e.target.result);
            localStorage.setItem("images", JSON.stringify(images));
            displayImages();
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

// Rasmlarni ko‘rsatish
function displayImages() {
    let gallery = document.getElementById('gallery');
    gallery.innerHTML = ""; // Eski rasmlarni tozalash

    let images = JSON.parse(localStorage.getItem("images")) || [];
    images.forEach((src, index) => {
        let imgContainer = document.createElement('div');
        imgContainer.classList.add("image-container");

        let img = document.createElement('img');
        img.src = src;
        img.classList.add("gallery-img");
        img.onclick = function () {
            openFullScreen(src);
        };

        let deleteButton = document.createElement('button');
        deleteButton.innerText = "🗑 Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = function () {
            deleteImage(index);
        };

        imgContainer.appendChild(img);
        imgContainer.appendChild(deleteButton);
        gallery.appendChild(imgContainer);
    });
}

// Rasmlarni to‘liq ekranda ochish
function openFullScreen(src) {
    let fullScreenDiv = document.createElement('div');
    fullScreenDiv.classList.add('fullscreen-container');

    let fullScreenImg = document.createElement('img');
    fullScreenImg.src = src;
    fullScreenImg.classList.add('fullscreen-img');

    let closeButton = document.createElement('span');
    closeButton.innerHTML = "✖";
    closeButton.classList.add('close-button');
    closeButton.onclick = function () {
        document.body.removeChild(fullScreenDiv);
    };

    fullScreenDiv.appendChild(fullScreenImg);
    fullScreenDiv.appendChild(closeButton);
    document.body.appendChild(fullScreenDiv);
}

// Rasm o‘chirish funksiyasi
function deleteImage(index) {
    let images = JSON.parse(localStorage.getItem("images")) || [];
    images.splice(index, 1); // Massivdan rasmni o‘chirish
    localStorage.setItem("images", JSON.stringify(images));
    displayImages(); // Galereyani yangilash
}

// Logout funksiyasi
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

// Sahifani yuklaganda tekshirish va rasmlarni chiqarish
window.onload = function () {
    if (!localStorage.getItem("loggedIn") && window.location.pathname.includes("gallery.html")) {
        window.location.href = "index.html";
    }
    displayImages();
};
// Media yuklash funksiyasi
function uploadMedia() {
    let fileInput = document.getElementById('mediaUpload');

    if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        let reader = new FileReader();

        reader.onload = function (e) {
            let mediaList = JSON.parse(localStorage.getItem("media")) || [];
            let mediaType = file.type.startsWith("image") ? "image" : "video";
            
            mediaList.push({ type: mediaType, src: e.target.result });
            localStorage.setItem("media", JSON.stringify(mediaList));
            displayMedia();
        };

        reader.readAsDataURL(file);
    }
}

// Galereyani ko‘rsatish
function displayMedia() {
    let gallery = document.getElementById('gallery');
    gallery.innerHTML = ""; // Eski media-fayllarni tozalash

    let mediaList = JSON.parse(localStorage.getItem("media")) || [];
    mediaList.forEach((media, index) => {
        let mediaContainer = document.createElement('div');
        mediaContainer.classList.add("media-container");

        let mediaElement;
        if (media.type === "image") {
            mediaElement = document.createElement('img');
            mediaElement.src = media.src;
            mediaElement.classList.add("gallery-media");
            mediaElement.onclick = function () {
                openFullScreen(media.src, media.type);
            };
        } else {
            mediaElement = document.createElement('video');
            mediaElement.src = media.src;
            mediaElement.classList.add("gallery-media");
            mediaElement.controls = true;
        }

        let deleteButton = document.createElement('button');
        deleteButton.innerText = "🗑 Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = function () {
            deleteMedia(index);
        };

        mediaContainer.appendChild(mediaElement);
        mediaContainer.appendChild(deleteButton);
        gallery.appendChild(mediaContainer);
    });
}

// To‘liq ekran rejimi
function openFullScreen(src, type) {
    let fullScreenDiv = document.createElement('div');
    fullScreenDiv.classList.add('fullscreen-container');

    let mediaElement;
    if (type === "image") {
        mediaElement = document.createElement('img');
        mediaElement.src = src;
        mediaElement.classList.add('fullscreen-media');
    } else {
        mediaElement = document.createElement('video');
        mediaElement.src = src;
        mediaElement.classList.add('fullscreen-media');
        mediaElement.controls = true;
        mediaElement.autoplay = true;
    }

    let closeButton = document.createElement('span');
    closeButton.innerHTML = "✖";
    closeButton.classList.add('close-button');
    closeButton.onclick = function () {
        document.body.removeChild(fullScreenDiv);
    };

    fullScreenDiv.appendChild(mediaElement);
    fullScreenDiv.appendChild(closeButton);
    document.body.appendChild(fullScreenDiv);
}

// Media o‘chirish
function deleteMedia(index) {
    let mediaList = JSON.parse(localStorage.getItem("media")) || [];
    mediaList.splice(index, 1); // Massivdan o‘chirish
    localStorage.setItem("media", JSON.stringify(mediaList));
    displayMedia(); // Galereyani yangilash
}

// Logout funksiyasi
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

// Sahifani yuklaganda media-fayllarni chiqarish
window.onload = function () {
    if (!localStorage.getItem("loggedIn") && window.location.pathname.includes("gallery.html")) {
        window.location.href = "index.html";
    }
    displayMedia();
};
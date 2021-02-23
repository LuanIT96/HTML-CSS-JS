//Animation init
AOS.init();

//function notification
function notificationMe() {
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        if (Notification.permission === 'granted') {
            var notify = new Notification('Chào bạn!', {
                body: 'Hôm nay bạn thấy thế nào?',
                icon: 'https://thanhluan.cf/images/logo.jpg',
            });
        } else {
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    var notify = new Notification('Chào Bạn!', {
                        body: 'Hôm nay bạn thấy thế nào?',
                        icon: 'https://thanhluan.cf/images/logo.jpg',
                    });
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}

//function get data json
function getJson() {
    let dataObj = ``, dataImage = ``,
    jsonUrl = '../json/all.json';
    fetch(jsonUrl)
    .then(res => res.json())
    .then(data => {
        if(data.store.length > 0) {
            for(let i = 0; i < data.store.length; i++) {
                dataObj += `
                <div class="col-md-6 col-sm-6 col-lg-4 mx-auto my-3 store-item">
                <div class="card">
                    <div id="img-windows" class="img-container">
                        <img src="${data.store[i].imageUrl}" width="250" class="card-img-top store-img" alt="${data.store[i].name}">
                    </div>
                    <div class="card-body">
                    <div class="card-text d-flex justify-content-between text-capitalize">
                        <h5 id="store-item-name">${data.store[i].name}</h5>
                        <h5 class="store-item-value">
                            <a href="javascript:;" onclick="downloadIso(this, '${data.store[i].linkUrl}')"
                            title="${data.store[i].name}">
                            <strong id="store-item-price" class="font-weight-bold">download</strong>
                            </a> 
                        </h5>
                    </div>
                    </div>
                </div>
                </div>
                `;
            }
            document.getElementById('store-items').innerHTML = dataObj;
        }

        if(data.imageMe.length > 0) {
            for(let i = 0; i < data.imageMe.length; i++) {
                dataImage += `<div class="col-md-6 col-sm-6 col-lg-4 mx-auto my-3 store-item" data-aos="flip-left"
                data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                    <div class="card">
                      <div class="img-container">
                        <img src="${data.imageMe[i].imageUrl}" height="350" class="card-img-top store-img" alt="${data.imageMe[i].name}">
                      </div>
                    </div>
                </div>`;
            }
            document.getElementById('image-items').innerHTML = dataImage;
        }
    })
    .catch(error => console.log('Error:', error));
}

//function download iso
function downloadIso(e, url) {
    swal({
        title: "Bạn có chắc chắn tải xuống?",
        text: e.title,
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
      .then((willDelete) => {
        if (willDelete) {
          window.open(url, '_blank');
        }
    });
}

//function search
function search() {
    let keyword, filter, storeItems, columns, text, i, textValue;
    keyword = document.getElementById('keyword');
    filter = keyword.value.toUpperCase();
    storeItems = document.getElementById('store-items');
    columns = storeItems.getElementsByClassName('col-md-6');
    for (i = 0; i < columns.length; i++) {
        text = columns[i].getElementsByTagName('h5')[0];
        textValue = text.innerText.toUpperCase();
        textValue.indexOf(filter) > -1 ? columns[i].style.display = 'block' : 
        columns[i].style.display = 'none';
    }
}

//function submit form
function onSubmitForm() {
    search();
    return false;
}

//function toggle menu
function toggleMenu(elements) {
    let tagName = elements.getElementsByTagName('i')[0];
    tagName.className === 'fas fa-bars' ? tagName.className = 'fas fa-window-close' : 
    tagName.className = 'fas fa-bars';
}

//function active menu
function activeMenu(e) {
    let menuId, li; 
    menuId = document.getElementById('main-menu');
    li = menuId.getElementsByTagName('li');
    for(let j = 0; j < li.length; j++) {
        li[j].classList.remove('active');
    } 
    e.classList.add('active'); 
}

//function scroll to top
window.onscroll = () => {
    let btnId, navbar;
    btnId = document.getElementById('moveTop');
    navbar = document.querySelector('.navbar');
    if(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btnId.style.display = 'block';
        navbar.style.background = '#fdfbb8';
    } else {
        btnId.style.display = 'none';
        navbar.style.background = '#ffffff';
    }
}

function moveTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function randomId() {
    return Math.floor(Math.random() * 100000);
}

function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

let products = [
    {
        id: randomId(),
        name: 'Nước Hoa Nữ Calvin Klein 100ml',
        description:
            'Nó là 1 chai nước hoa',
        price: 2499000,
        image:
            'sp5.png',
        count: 1,
    },
    {
        id: randomId(),
        name: 'Son Kem Lì  Espoir Couture Lip Tint',
        description:
            'Nó là 1 cây son.',
        price: 300000,
        image:
            'sp1a.jpg',
        count: 1,
    },
    {
        id: randomId(),
        name: 'Phấn Nước Kiềm Dầu Lemonade',
        description:
            'Nó là 1 hộp phấn nước.',
        price: 367000,
        image:
            'sp2.jpg',
        count: 1,
    },
];

let promotionCode = {
    KhuongBatOn: 10,
    TramXinhDep: 100,
    ThaoDien: 30,
    Phat: 40,
    MienPhiVanChuyen: 20,
};

let productsEle = document.querySelector('.products');

let subTotalEl = document.querySelector('.subtotal span');
let vatEl = document.querySelector('.vat span');
let discount = document.querySelector('.discount');
let discountEle = document.querySelector('.discount span');
let totalEle = document.querySelector('.total span');

let btnPromotion = document.querySelector('.promotion button');
let inputPromotion = document.querySelector('#promo-code');

function renderUI(arr) {
    productsEle.innerHTML = '';

    let countEle = document.querySelector('.count');
    countEle.innerText = `${updateTotalItem(arr)} vật phẩm trong giỏ hàng`;

    updateTotalMoney(arr);

    if (arr.length == 0) {
        productsEle.insertAdjacentHTML(
            'afterbegin',
            '<li>Không có sản phẩm nào trong giỏ hàng</li>'
        );
        document.querySelector('.option-container').style.display = 'none';
        return;
    }

    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        productsEle.innerHTML += `
            <li class="row">
                <div class="col left">
                    <div class="thumbnail">
                        <a href="#">
                            <img src="${p.image}" alt="${p.name}">
                        </a>
                    </div>
                    <div class="detail">
                        <div class="name"><a href="#">${p.name}</a></div>
                        <div class="description">
                            ${p.description}
                        </div>
                        <div class="price">${convertMoney(p.price)}</div>
                    </div>
                </div>
                <div class="col right">
                    <div class="quantity">
                        <input 
                            type="number" 
                            class="quantity" 
                            step="1" 
                            value="${p.count}" 
                            onchange="changeTotalProduct(${p.id}, event)"
                        >
                    </div>
                    <div class="remove">
                        <span class="close" onclick="removeItem(${p.id})">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
            </li>
        `;
    }
}

function updateTotalItem(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        total += p.count;
    }
    return total;
}

function removeItem(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products.splice(i, 1);
        }
    }
    renderUI(products);
}

function changeTotalProduct(id, e) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].count = Number(e.target.value);
        }
    }
    renderUI(products);
}

function updateTotalMoney(arr) {
    let totalMoney = 0;
    let discountMoney = 0;

    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        totalMoney += p.count * p.price;
    }

    let data = checkPromotion();

    if (data) {
        discountMoney = (totalMoney * data) / 100;
        discount.classList.remove('hide');
    } else {
        discount.classList.add('hide');
    }


    subTotalEl.innerText = convertMoney(totalMoney);
    vatEl.innerText = convertMoney(totalMoney * 0.05);
    discountEle.innerText = convertMoney(discountMoney);
    totalEle.innerText = convertMoney(totalMoney * 1.05 - discountMoney);
}


function checkPromotion() {
    let value = inputPromotion.value;
    if (promotionCode[value]) {
        return promotionCode[value];
    }
    return 0;
}

btnPromotion.addEventListener('click', function () {
    updateTotalMoney(products);
});

window.onload = renderUI(products);
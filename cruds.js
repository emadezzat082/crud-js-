let title = document.getElementById("title");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let create = document.getElementById("create");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let all = document.getElementById("all");
let mood = "create";
let x;
// console.log(
//   title,
//   price,
//   ads,
//   taxes,
//   discount,
//   total,
//   create,
//   amount,
//   category
// );
//!get tottal
function getTotal() {
  if (price.value != "") {
    total.value = +price.value + +ads.value + +taxes.value - +discount.value;
    total.style.backgroundColor = "green";
  } else {
    total.style.backgroundColor = "red";
  }
}
//! create
let info = [];
if (localStorage.product != null) {
  info = JSON.parse(localStorage.product);
}

create.onclick = function () {
  let pro = {
    title: title.value.toLowerCase(),
    price: price.value,
    ads: ads.value,
    taxes: taxes.value,
    discount: discount.value,
    total: total.value,
    amount: amount.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != "") {
    clear();
    if (mood === "create") {
      if (amount.value > 1) {
        for (h = 0; h < amount.value; h++) {
          info.push(pro);
        }
      } else {
        info.push(pro);
      }
    } else {
      info[x] = pro;
      mood = "create";
      create.innerHTML = "create";
      amount.style.display = "block";
    }
  }

  localStorage.setItem("product", JSON.stringify(info));

  show();
};
// so the inputs return empty on click or on update
function clear() {
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  total.value = "";
  amount.value = "";
  category.value = "";
  title.value = "";
}
function show() {
  getTotal();
  let tabel = "";
  for (let j = 0; j < info.length; j++) {
    tabel += `
    <tr>
          <td>${j + 1}</td>
          <td>${info[j].title}</td>
          <td>${info[j].price}</td>
          <td>${info[j].taxes}</td>
          <td>${info[j].ads}</td>
          <td>${info[j].total}</td>
          <td>${info[j].category}</td>
          <td><button onclick="updata(${j})">update</button></td>
          <td><button onclick="remove(${j})">delete</button></td>
        </tr>`;
  }
  document.getElementById("body").innerHTML = tabel;
}
show();
//! delete
function remove(j) {
  info.splice(j, 1);
  localStorage.product = JSON.stringify(info);
  // to update data after delte becausae of if conditon
  show();
  // to update html after delte
}
function alll() {
  localStorage.clear();
  info.splice(0);
  show();
}
//! update
function updata(j) {
  title.value = info[j].title;
  price.value = info[j].price;
  ads.value = info[j].ads;
  taxes.value = info[j].taxes;
  discount.value = info[j].discount;
  category.value = info[j].category;
  getTotal();
  amount.style.display = "none";
  create.innerText = "update";
  mood = "update";
  x = j;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
///! search
let searchmood = "title";
let e = document.getElementById("search");
function search(p) {
  // because the user clikcen the buttom it will reset to noraml
  // all data are shown and the input is empty
  e.focus();
  e.value = "";
  show();

  if (p == "name") {
    searchmood = "title";
    e.placeholder = "search by titel";
  } else {
    searchmood = "category";
    e.placeholder = "search by category";
  }
  console.log(searchmood);
}
function searchdata(value) {
  let tabel;
  if (searchmood == "title") {
    // to search in info array
    for (j = 0; j < info.length; j++) {
      if (info[j].title.includes(value.toLowerCase())) {
        tabel += `
    <tr>
          <td>${j + 1}</td>
          <td>${info[j].title}</td>
          <td>${info[j].price}</td>
          <td>${info[j].taxes}</td>
          <td>${info[j].ads}</td>
          <td>${info[j].total}</td>
          <td>${info[j].category}</td>
          <td><button onclick="updata(${j})">update</button></td>
          <td><button onclick="remove(${j})">delete</button></td>
        </tr>`;
      }
    }
  } else {
    for (j = 0; j < info.length; j++) {
      if (info[j].category.includes(value.toLowerCase())) {
        tabel += `
      <tr>
            <td>${j}</td>
            <td>${info[j + 1].title}</td>
            <td>${info[j].price}</td>
            <td>${info[j].taxes}</td>
            <td>${info[j].ads}</td>
            <td>${info[j].total}</td>
            <td>${info[j].category}</td>
            <td><button onclick="updata(${j})">update</button></td>
            <td><button onclick="remove(${j})">delete</button></td>
          </tr>`;
      }
    }
  }

  document.getElementById("body").innerHTML = tabel;
}

var siteName = document.getElementById("site");
var siteUrl = document.getElementById("url");
var addprodact = document.getElementById("addbtn");
var update = document.getElementById("updatebtn");
var vlaueContainer = [];
if (localStorage.getItem("items", JSON.stringify(vlaueContainer)) == null) {
  vlaueContainer = [];
} else {
  vlaueContainer = JSON.parse(localStorage.getItem("items"));
}

function addInfo() {
  if (valdation(siteName) && valdation(siteUrl)) {
    info = {
      sName: siteName.value,
      sUrl: siteUrl.value,
    };
    vlaueContainer.push(info);

    show();
    console.log(info);
    removeData();
    localStorage.setItem("items", JSON.stringify(vlaueContainer));
  }
}
function show() {
  var bBox = ``;
  for (let i = 0; i < vlaueContainer.length; i++) {
    bBox += `<tr>
        <th scope="row">${i}</th>
        <td>${vlaueContainer[i].sName}</td>
        <td><a href="https://${vlaueContainer[i].sUrl}"><button type="button" class="btn btn-success  w-25 d-flex justify-content-center ">vist</button></a></td>
        <td><button type="button" onclick="DeleteItem(${i})" class="btn btn-danger w-25 d-flex justify-content-center ">Delete</button></td>
        <td><button type="button" onclick="edite(${i})" class="btn btn-info w-25 text-center d-flex justify-content-center ">edite</button>
        </td>
      </tr>`;
  }
  document.getElementById("here").innerHTML = bBox;
}
function removeData() {
  siteName.value = "";
  siteUrl.value = "";
}
function DeleteItem(Delete) {
  vlaueContainer.splice(Delete, 1);
  localStorage.setItem("items", JSON.stringify(vlaueContainer));

  show();
}

function valdation(ele) {
  var regx = {
    site: /^[a-zA-Z]{3,}$/,
    url: /^www\.([a-zA-Z]+)\.([a-zA-Z]{2,})$/i,
  };
  var isvalid = regx[ele.id].test(ele.value) == true;
  if (isvalid) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    ele.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-vaild");
    ele.nextElementSibling.classList.replace("d-none", "d-block");
  }
  return isvalid;
}
var updateindex;

function edite(change) {
  updateindex = change;
  addprodact.classList.add("d-none");
  update.classList.remove("d-none");
  siteName.value = vlaueContainer[change].sName;
  siteUrl.value = vlaueContainer[change].sUrl;
  show();
}

function updatelist() {
  addprodact.classList.remove("d-none");
  update.classList.add("d-none");
  vlaueContainer[updateindex].sName=siteName.value
  vlaueContainer[updateindex].sUrl=siteUrl.value


  localStorage.setItem("items", JSON.stringify(vlaueContainer));
  show()
  removeData()
}



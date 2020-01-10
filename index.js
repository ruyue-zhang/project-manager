const API_ROOT = "http://localhost:3000/projects";
const POP = document.querySelector('.pop');
const ACTIVE = "ACTIVE";
const PENDING = "PENDING";
const CLOSED = "CLOSED";
const DELETE = "删除";

let taskList = document.getElementsByTagName('tbody')[0];
let id = null;
getListData();


function getListData() {
  ajax({
      url: API_ROOT,
      method: "GET",
      success: function(responseText) {
        renderProjectList(responseText);
        let status = document.getElementsByClassName('status');
        changeColorByStatus(status);
        realTimeupdateData(status);
      }, 
  })
}

function deleteItemData() {
  ajax({
      url: API_ROOT + '/' + id,
      method: "DELETE",
      success: function(result) {
          deleteItem();
          let status = document.getElementsByClassName('status');
          realTimeupdateData(status);
      }, 
  })
}

taskList.addEventListener('click', function (event) {
  id = event.target.parentElement.parentElement.getAttribute('data-id');
  if (!id) {
      return false;
  }
  event.target.value === DELETE ? popDisplay() : '';
});

function renderProjectList(data) {
  if (!Array.isArray(data) && !data instanceof Array) {
      return false;
  }
  taskList.innerHTML = data.reduce((acc, cur) => {
      return acc += `
      <tr data-id='${cur.id}'>
          <td>${cur.name}</td>
          <td class="description">${cur.description}</td>
          <td>${cur.endTime}</td>
          <td class = 'status'>${cur.status}</td>
          <td><input type="submit" value="删除" class="delete"></td>
      </tr>`;
  },'');
}

function changeColorByStatus(status) { 
  for(let i = 0; i < status.length; i++) {
    switch(status[i].innerText) {
        case ACTIVE:
            status[i].style.color = '#666666';
            break;
        case PENDING:
            status[i].style.color = '#ee706d';
            break;
        case CLOSED:
            status[i].style.color = '#f7da47';
            break;
        default:
    }
  }
}

function realTimeupdateData(status) {
  status = Array.from(status);
  let all = status.length - 1;
  let active = status.filter(value => value.innerText==='ACTIVE').length;
  let pending = status.filter(value => value.innerText==='PENDING').length;
  let closed = all - active - pending;
  changeNumbers(all, active, pending, closed);
  changePercents(all, active, pending, closed) ;
}

function changeNumbers(all, active, pending, closed) {
  document.querySelector('.all-number').innerText = all;
  document.querySelector('.avtive-number').innerText = active;
  document.querySelector('.pending-number').innerText = pending;
  document.querySelector('.closed-number').innerText = closed;
}

function changePercents(all, active, pending, closed) {
  document.querySelector('.active-percent').innerText = all ? Math.round(active / all * 1000) / 10 + '%' : '0%';
  document.querySelector('.pending-percent').innerText = all ? Math.round(pending / all * 1000) / 10 + '%' : '0%';
  document.querySelector('.closed-percent').innerText = all ? Math.round(closed / all * 1000) / 10 + '%' : '0%';  
}

function popDisplay() {
  POP.style.display = 'block';
}

function cancelDelete() {
  POP.style.display = 'none';
}

function deleteTask() {
  deleteItemData();
  POP.style.display = 'none';
}

function deleteItem() {
  let item = taskList.querySelector(`tr[data-id='${id}']`);
  taskList.removeChild(item);
}


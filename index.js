const API_ROOT = "http://localhost:3000/projects";
let taskList = document.getElementsByTagName('tbody')[0];
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

function changeColorByStatus(status) {
  for(let i = 0; i < status.length; i++) {
    switch(status[i].innerText) {
        case 'ACTIVE':
            status[i].style.color = '#666666';
            break;
        case 'PENDING':
            status[i].style.color = '#ee706d';
            break;
        case 'CLOSED':
            status[i].style.color = '#f7da47';
            break;
        default:
    }
  }
}

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

function realTimeupdateData(status) {
  status = Array.from(status);
  
  let all = status.length - 1;
  let active = status.filter(value => value.innerText==='ACTIVE').length;
  let pending = status.filter(value => value.innerText==='PENDING').length;
  let closed = all - active - pending;

  document.querySelector('.all-number').innerText = all;
  document.querySelector('.avtive-number').innerText = active;
  document.querySelector('.pending-number').innerText = pending;
  document.querySelector('.closed-number').innerText = closed;

  document.querySelector('.active-percent').innerText = Math.round(active / all * 1000) / 10 + '%';
  document.querySelector('.pending-percent').innerText = Math.round(pending / all * 1000) / 10 + '%';
  document.querySelector('.closed-percent').innerText = Math.round(closed / all * 1000) / 10 + '%';    
}

taskList.addEventListener('click', function (event) {
  let id = event.target.parentElement.parentElement.getAttribute('data-id');
  if (!id) {
      return false;
  }
  event.target.value === '删除' ? console.log(id) : '';
})


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


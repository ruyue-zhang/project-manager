const API_ROOT = "http://localhost:3000/projects";
let taskList = document.getElementsByTagName('tbody')[0];
getListData();

let status = document.getElementsByClassName('status');
changeColorByStatus(status);

function getListData() {
  ajax({
      url: API_ROOT,
      method: "GET",
      success: function(responseText) {
          console.log(responseText);
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


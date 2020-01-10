let status = document.getElementsByClassName('status');
changeColorByStatus(status);

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
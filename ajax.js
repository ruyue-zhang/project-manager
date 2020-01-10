/**
options = {
  url: "",
  method: "",
  headers: {}, 
  data: "",
  success: function(result) {},  // 请求成功后调用此方法
  fail: function(error) {}    // 请求失败或出错后调用此方法
}
**/
window.ajax = function (options) {
  const ajaxOptions = {
    url: options.url || "",
    method: options.method.toUpperCase() || "GET",
    headers: options.headers || {}, 
    data: options.data || null,
    onSuccess: options.success || function(result) {},
    onFail: options.fail || function(error) {}
  }
  var xhr = new XMLHttpRequest();
  xhr.open(ajaxOptions.method,ajaxOptions.url,true);
  if("POST" === ajaxOptions.method || "PUT" === ajaxOptions.method) {
    xhr.setRequestHeader("content-type","application/json");
    ajaxOptions.data = JSON.stringify(ajaxOptions.data);
  }
  xhr.onerror = () => ajaxOptions.onFail(xhr.status);
  xhr.onload = () => ajaxOptions.onSuccess(JSON.parse(xhr.responseText));
  xhr.send(ajaxOptions.data);
}
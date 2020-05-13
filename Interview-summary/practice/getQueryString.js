var getQueryString = function(name,url = window.location.href){
  var url = url.substring(url.indexOf('?'));
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = url.substring(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]); return null;
}
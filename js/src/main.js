var menu = document.querySelector('#menu_button');
var main = document.querySelector('#main');
var drawer = document.querySelector('#navbar');

menu.addEventListener('click', function(e) {
  drawer.classList.toggle('open');
  e.stopPropagation();
});
main.addEventListener('click', function() {
  drawer.classList.remove('open');
});

//这里需要改成jquery
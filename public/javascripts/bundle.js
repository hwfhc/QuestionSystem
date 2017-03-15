console.log('dsaf');

function signUp(){
    var demo = new FormData(document.getElementById('signUp'));
    console.log(demo);
    console.log(demo.getAll('username'));
    var xhr = new XMLHttpRequest();

    xhr.open("post","/signUp",true);
    xhr.send(demo);
}

var btn = document.getElementById('test');
btn.addEventListener('click',signUp);

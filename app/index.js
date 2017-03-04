console.log('dsaf');

function send(){
    var demo = new FormData(document.getElementById('test'));
    demo.append('username','hehe');

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                alert(xhr.responseText);
            }
        }else{
            alert("success" + xhr.status);
        }
    }
    xhr.open("post","/test.js",true);
    xhr.send(demo);
}

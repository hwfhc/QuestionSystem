function getPersonalInformation(){
    var username = document.getElementById('username');
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            username.innerHTML = JSON.parse(this.responseText).username;
        }
    }

    xhttp.open('GET','/personalHomePage/getPersonalInformation',true);
    xhttp.send();
}

getPersonalInformation();

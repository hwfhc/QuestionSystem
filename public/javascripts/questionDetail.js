function getScore(){
    var total_score = document.getElementById('total_score');
    var your_score = document.getElementById('your_score');
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            total_score.innerHTML = JSON.parse(this.responseText).total_score;
            your_score.innerHTML = JSON.parse(this.responseText).your_score;
        }
    }

    xhttp.open('GET','/questionDetail/getScore',true);
    xhttp.send();
}

getScore();

function getQuestionDetail(){
    var total_score = document.getElementById('total_score');
    var your_score = document.getElementById('your_score');
    //var title = document.getElementById('title');
    var description = document.getElementById('description');

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var data = JSON.parse(this.responseText);

            total_score.innerHTML = data[0].score;
            your_score.innerHTML = data[0].score;
            //title.innerHTML = data[0].title;
            description.innerHTML = data[0].description;
            //console.log(data);
        }
    }

    xhttp.open('GET','/questionDetail/getQuestionDetail',true);
    xhttp.send();
}

getQuestionDetail();

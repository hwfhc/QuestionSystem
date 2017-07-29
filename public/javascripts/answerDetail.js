function getAnswerDetail(){
    //var total_score = document.getElementById('total_score');
    //var your_score = document.getElementById('your_score');
    var title = document.getElementById('title');
    var description = document.getElementById('description');
    var answer = document.getElementById('answer');
    var answer_man = document.getElementById('answer_man');

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var data = JSON.parse(this.responseText);

            //total_score.innerHTML = data[0].score;
            //your_score.innerHTML = data[0].score;
            title.innerHTML = data.title;
            description.innerHTML = data.description;
            answer.innerHTML = data.answer;
            answer_man.innerHTML = data.username;
            //console.log(data);
        }
    }

    xhttp.open('GET','/answerDetail/getAnswerDetail',true);
    xhttp.send();
}

getAnswerDetail();

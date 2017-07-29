function hidden(){
    var viewAnswer = document.getElementById('viewAnswer');
    viewAnswer.style.display="none";
}

function displayViewAnswer(){
    viewAnswer.style.display="inline-block";
}

hidden();

function getQuestionDetail(){
    var total_score = document.getElementById('total_score');
    var your_score = document.getElementById('your_score');
    var title = document.getElementById('title');
    var description = document.getElementById('description');
    var answer = document.getElementById('answer');
    var publish_man = document.getElementById('publish_man');

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var data = JSON.parse(this.responseText);

            total_score.innerHTML = data.total_score;
            your_score.innerHTML = data.score;
            title.innerHTML = data.title;
            description.innerHTML = data.description;
            answer.innerHTML = data.answer;
            publish_man.innerHTML = data.author_name;

            if(data.isAuthor) displayViewAnswer();
        }
    }

    xhttp.open('GET','/questionDetail/getQuestionDetail',true);
    xhttp.send();
}

getQuestionDetail();

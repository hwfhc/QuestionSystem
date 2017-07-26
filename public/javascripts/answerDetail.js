var get_score = document.getElementById('get_socre');
var answer_form = document.getElementById('answer_form');

function hidden(){
  get_score.style.display="none";
  answer_form.style.display="none";
}

function displayAnswer_form(){
  get_score.style.display="none";
  answer_form.style.display="block";
}

function displayGet_Score(){
  get_score.style.display="block";
  answer_form.style.display="none";
}

hidden();
displayAnswer_form();

function getAnswerDetail(){
    //var total_score = document.getElementById('total_score');
    //var your_score = document.getElementById('your_score');
    //var title = document.getElementById('title');
    var answer = document.getElementById('answer');
    var answer_username = document.getElementById('answer_username');

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var data = JSON.parse(this.responseText);

            //total_score.innerHTML = data[0].score;
            //your_score.innerHTML = data[0].score;
            //title.innerHTML = data[0].title;
            answer.innerHTML = data.answer;
            answer_username.innerHTML = 'answerman: ' +data.username;
            //console.log(data);
        }
    }

    xhttp.open('GET','/answerDetail/getAnswerDetail',true);
    xhttp.send();
}

getAnswerDetail();

function getQuestionDetail(){
    //var total_score = document.getElementById('total_score');
    //var your_score = document.getElementById('your_score');
    var title = document.getElementById('title');
    var description = document.getElementById('description');

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var data = JSON.parse(this.responseText);

            //total_score.innerHTML = data[0].score;
            //your_score.innerHTML = data[0].score;
            title.innerHTML = data[0].title;
            description.innerHTML = data[0].description;
            //console.log(data);
        }
    }

    xhttp.open('GET','/questionDetail/getQuestionDetail',true);
    xhttp.send();
}

getQuestionDetail();

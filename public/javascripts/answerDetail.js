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

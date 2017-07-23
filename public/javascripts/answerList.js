var myJSON = '{ \
  "list":[\
  {"name":"黄旭东","link":"/answerDetail"},\
  {"name":"士兵76","link":123},\
  {"name":"吕布","link":123}\
]}';

function addItemOfAnswerList(){
  let answerList = JSON.parse(myJSON).list;
  let answerTable = document.getElementById('answerTable');

  for(let i=0;i < answerList.length;i++){
    answerTable.innerHTML += '<tr><td><a href="' + answerList[i].link + '">' + answerList[i].name + '</a></td></tr>';
  }
}

addItemOfAnswerList();

var myJSON = '{ \
  "list":[\
  {"name":"css3题目","link":123},\
  {"name":"es6题目","link":123},\
  {"name":"http题目","link":123}\
]}';

function addItemOfQuesiontList(){
  let questionList = JSON.parse(myJSON).list;
  let questionTable = document.getElementById('questionTable');

  for(let i=0;i < questionList.length;i++){
    questionTable.innerHTML += '<tr><td><a href="' + questionList[i].link + '">' + questionList[i].name + '</a></td></tr>';
  }
}

addItemOfQuesiontList();

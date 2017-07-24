function addItemToAnswerList(){
  let answerList;
  let answerTable = document.getElementById('answerTable');

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            answerList = JSON.parse(this.responseText).list;

            for(let i=0;i < answerList.length;i++){
                answerTable.innerHTML += '<tr><td><a href="' + answerList[i].link + '">' + answerList[i].name + '</a></td></tr>';
            }
        }
    }

    xhttp.open('GET','/answerList/getAnswerList',true);
    xhttp.send();

}

addItemToAnswerList();

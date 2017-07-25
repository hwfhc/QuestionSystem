function addItemToAnswerList(){
  let answerList;
  let answerTable = document.getElementById('answerTable');

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            answerList = JSON.parse(this.responseText);

            for(let i=0;i < answerList.length;i++){
                answerTable.innerHTML += '<tr><td><a href="/answerDetail?ID=' + answerList[i].ID + '">' + answerList[i].answer + '</a></td></tr>';
            }
        }
    }

    xhttp.open('GET','/answerList/getAnswerList',true);
    xhttp.send();

}

addItemToAnswerList();

function addItemToQuesiontList(){
    let questionList;
    let questionTable = document.getElementById('questionTable');

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            questionList = JSON.parse(this.responseText).list;

            for(let i=0;i < questionList.length;i++){
                questionTable.innerHTML += '<tr><td><a href="' + questionList[i].link + '">' + questionList[i].name + '</a></td></tr>';
            }
        }
    }

    xhttp.open('GET','/questionList/getQuestionList',true);
    xhttp.send();

}

addItemToQuesiontList();

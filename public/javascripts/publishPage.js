function getQuestionDetail(){
    //var title = document.getElementById('title');
    var description = document.getElementById('description');

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var data = JSON.parse(this.responseText);

            //title.innerHTML = data[0].title;
            description.innerHTML = data[0].description;
        }
    }

    xhttp.open('GET','/questionDetail/getQuestionDetail',true);
    xhttp.send();
}

getQuestionDetail();

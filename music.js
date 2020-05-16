const button= document.getElementById("searchButton");
button.addEventListener("click", update);

function update(){

    //getting the input value from the user; 
    //@param artistName is the name of the artist that the user enters
    //@param songName is the name of the song that the user enters
    const userInput1 = document.getElementById('artist'); 
    const artistName = userInput1.value; 
    const userInput2 = document.getElementById('songtitle'); 
    const songName = userInput2.value; 

    var request = new XMLHttpRequest();
    request.open('GET', "https://api.lyrics.ovh/v1/"+artistName+"/"+songName, true);
    request.onload = function(){
    var result = JSON.parse(this.response);

    //retrieve the lyrics from API and display it on website
    var lyrics=result.lyrics.replace(new RegExp("\n","g"),"<br>");
    document.getElementById("description").innerHTML= "<strong>"+songName+"</strong>"+"<br><br>"+lyrics;

    //if the user checks this box, the website will also display the artist's information
    // if(document.getElementById('artistSummary').checked="true"){
    const checkBox=document.getElementById('artistSummary');
    if(checkBox.checked ==true){
        displaySummary();
    }
    }
    request.send();

    function displaySummary(){
        var request2 = new XMLHttpRequest();
        request2.open('GET', "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+artistName+"&api_key=47dee139fab3f5521df2f3b6f78dbd97&format=json", true);
        request2.onload = function(){
        var result2 = JSON.parse(this.response);

        //retrieves information about artist based on their name
        var summary=result2.artist.bio.summary;
        
        var para = document.createElement("P");
        para.innerHTML="<strong>Summary</strong><br>"+summary;
        document.getElementById('description').appendChild(para);
    }
    request2.send();
    }
}

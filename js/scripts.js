
    //url: "http://localhost:json/fomo-json-small.json",

/*$.getJSON("https://raw.githubusercontent.com/zeedee-h/bl-fomo/master/fomo-json-small.json", function(data) {
    console.log(data[0].emailAddress);
});*/

//https://help.appsheet.com/data/keys/manually-generating-uniqueid-key-values

document.onload = repopulate("alldays");

function repopulate(){

    $.ajax({
        url: "https://raw.githubusercontent.com/zeedee-h/bl-fomo/master/fomo-json-full%20ID.json",
        dataType: "json",
        type: "get",
        cache: false,
        success: function(data) {
           console.log(data.length);
           populate(data, indexListJS);
           }
    });
    
};    

//read localStorage
let savedFaves = ["D21A7CB0", "DF61D0E8"];

function populate(data, callback){
    for (i = 0; i < data.length; i++) {
        
        if (savedFaves.includes(data[i].eventID)) {
        var fasORfar = "fas";    
        } else {
        var fasORfar = "far";      
        }
        
        var eventContent = `<li id=${data[i].eventID} class="eventBox">
                            <h1 class="eventTitle">${data[i].eventTitle}</h1>
                            <p class="bold">At <span class="location green">${data[i].location}</span> on <span class="day blue">${data[i].day}</span> from <span class="startEndTime magenta">${data[i].startEndTime}</span></p>
                            <p class="bold"><span class="familyFriendly orange">${data[i].familyFriendly}</span> <span class="eventType yellow">${data[i].eventType}</span> by <span class="hostPlayaName yellow">${data[i].hostPlayaName}</span></p>
                            <p>${data[i].description}</p>
                            <p class="right"><i class="${fasORfar} fa-heart fa-3x" job="favourite"></i></p> 
                            </li>
                            `
        
        selectedDay = document.getElementById("daySelect").value;
        
        if (selectedDay == "alldays" ) {
            $('#container').append(eventContent);
            console.log("changed to alldays");
                //if (){eventContent.id matches array, add favourite class}
        }else if(data[i].day == selectedDay +"T22:00:00.000Z"){ //https://medium.com/@switzerlandhero/5-ways-to-check-if-a-string-contains-a-substring-in-javascript-523ac134f878
            $('#container').append(eventContent);
            console.log("changed " + selectedDay)
        };
        
        //$('#container').append(eventContent);
        
    };
callback();
}; 

//let selectedDay = document.getElementById("daySelect").value

document.getElementById("daySelect").onchange = function(){
    
    selectedDay = document.getElementById("daySelect").value;
    
    //console.log(selectedDay);
    
    var containerNode = document.getElementById("container");
    containerNode.innerHTML = "";
    /*while (containerNode.firstChild) {
        containerNode.removeChild(containerNode.firstChild);
    }*/
    
    repopulate();
    //run populate(data, day, indexListJS);
};

function indexListJS() {
    var options = {
        valueNames: [ 'eventTitle', 'description', 'hostPlayaName', 'eventType', 'location', 'startEndTime', 'familyFriendly', 'day' ]
    };
    var eventList = new List('event-list', options);  
};

const CHECK = "far";
const UNCHECK = "fas";

function addFav(element){       
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    
    console.log("Toggled favourite for " + element.parentNode.parentNode.id);
    savedFaves.push(element.parentNode.parentNode.id);
}

function removeFav(element){       
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    
    console.log("Toggled favourite for " + element.parentNode.parentNode.id);
    
    var index = savedFaves.indexOf(element.parentNode.parentNode.id);    // <-- Not supported in <IE9
    if (index !== -1) {
    savedFaves.splice(index, 1);
    }
}

const list2 = document.getElementById("container");

list2.addEventListener("click", function() {
    let element = event.target;
    const elementJOB = event.target.attributes.job.value;
    
    if (elementJOB == "favourite" && !savedFaves.includes(element.parentNode.parentNode.id)) {
        addFav(element);
        //update localStorage
        
    } else if (elementJOB == "favourite" && savedFaves.includes(element.parentNode.parentNode.id)) {
        removeFav(element);
        //update localStorage
        
    };

});

/*
function logH1(element) {
            $(".right").click(function () {
            console.log( element.parentNode.querySelector("h1").innerHTML );  
        });
}*/
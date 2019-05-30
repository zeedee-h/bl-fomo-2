
    //url: "http://localhost:json/fomo-json-small.json",

/*$.getJSON("https://raw.githubusercontent.com/zeedee-h/bl-fomo/master/fomo-json-small.json", function(data) {
    console.log(data[0].emailAddress);
});*/

document.onload = repopulate("alldays");

function repopulate(selectedDay){

    $.ajax({
        url: "https://raw.githubusercontent.com/zeedee-h/bl-fomo/master/fomo-json-full.json",
        dataType: "json",
        type: "get",
        cache: false,
        success: function(data) {
           console.log(data.length);
           populate(data, selectedDay, indexListJS);
           }
    });
    
};    

function populate(data, selectedDay, callback){
    for (i = 0; i < data.length; i++) {
        
        var eventContent = `<li id="placeholderEventID" class="eventBox">
                            <h1 class="eventTitle">${data[i].eventTitle}</h1>
                            <p class="bold">At <span class="location green">${data[i].location}</span> on <span class="day blue">${data[i].day}</span> from <span class="startEndTime magenta">${data[i].startEndTime}</span></p>
                            <p class="bold"><span class="familyFriendly orange">${data[i].familyFriendly}</span> <span class="eventType yellow">${data[i].eventType}</span> by <span class="hostPlayaName yellow">${data[i].hostPlayaName}</span></p>
                            <p>${data[i].description}</p>
                            <p class="right"><i class="far fa-heart fa-3x" job="favourite"></i></p> 
                            </li>
                            `
                            //<i class="fas fa-heart"></i> for filled heart

        //set i class from localStorage
        
        if (selectedDay == "alldays" ) {
            $('#container').append(eventContent);
        }else if(data[i].day == selectedDay){ //https://medium.com/@switzerlandhero/5-ways-to-check-if-a-string-contains-a-substring-in-javascript-523ac134f878
            $('#container').append(eventContent);
        };
        
        //$('#container').append(eventContent);
        
    };
callback();
}; 

let selectedDay = document.getElementById("daySelect").value

document.getElementById("daySelect").onchange = function(){
    
    let selectedDay = document.getElementById("daySelect").value;
    
    console.log(selectedDay);
    
    
    var containerNode = document.getElementById("container");
    while (containerNode.firstChild) {
        containerNode.removeChild(containerNode.firstChild);
    }
    
    repopulate(selectedDay);
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

function completeToDo(element){       
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    
    console.log("Toggled favourite for " + element.parentNode.parentNode.id);
}

const list2 = document.getElementById("container");

list2.addEventListener("click", function() {
    let element = event.target;
    const elementJOB = event.target.attributes.job.value;
    
    if (elementJOB == "favourite") {
        completeToDo(element);
    };

});

/*
function logH1(element) {
            $(".right").click(function () {
            console.log( element.parentNode.querySelector("h1").innerHTML );  
        });
}*/
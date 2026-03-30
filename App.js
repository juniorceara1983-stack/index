let calendar;
let events = JSON.parse(localStorage.getItem("events")) || [];

document.addEventListener('DOMContentLoaded', function(){

let calendarEl = document.getElementById('calendar');

calendar = new FullCalendar.Calendar(calendarEl,{

initialView:'dayGridMonth',

editable:true,

events:events,

eventClick:function(info){

let e = info.event;

let text =
`Evento: ${e.title}
Data: ${e.start.toLocaleString()}
Local: ${e.extendedProps.location || ""}

${e.extendedProps.notes || ""}`;

showShareMenu(text,e);

},

eventDrop:function(){

saveEvents();

}

});

calendar.render();

});

function saveEvents(){

let allEvents = calendar.getEvents().map(e=>({

title:e.title,

start:e.start,

end:e.end,

extendedProps:e.extendedProps

}));

localStorage.setItem("events",JSON.stringify(allEvents));

}

function addEvent(){

let title=document.getElementById("title").value;

let date=document.getElementById("date").value;

let start=document.getElementById("start").value;

let end=document.getElementById("end").value;

let location=document.getElementById("location").value;

let notes=document.getElementById("notes").value;

let event={

title:title,

start:date+"T"+start,

end:date+"T"+end,

extendedProps:{

location:location,

notes:notes

}

};

calendar.addEvent(event);

saveEvents();

}

function showShareMenu(text,event){

let menu=

`Compartilhar evento:

1 - WhatsApp
2 - Facebook
3 - Twitter
4 - Telegram
5 - Copiar
6 - Excluir evento

Digite o número da opção`;

let choice=prompt(menu);

let url=encodeURIComponent(text);

switch(choice){

case "1":

window.open(`https://wa.me/?text=${url}`);
break;

case "2":

window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
break;

case "3":

window.open(`https://twitter.com/intent/tweet?text=${url}`);
break;

case "4":

window.open(`https://t.me/share/url?text=${url}`);
break;

case "5":

navigator.clipboard.writeText(text);
alert("Evento copiado!");
break;

case "6":

event.remove();
saveEvents();
break;

}

}

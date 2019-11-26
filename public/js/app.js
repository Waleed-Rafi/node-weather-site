console.log('Client side javascript is running!!');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent = 'From Javascript';


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            //console.log(data.error);
            messageOne.textContent = data.error;
            search.value = '';
        }else{
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast.status + '. It is currently ' + data.forecast.temperature + ' degrees out. There is a ' + data.forecast.rain + '% chance of rain.';
        //console.log(data.forecast.status);
        //console.log(data.forecast.temperature);
        //console.log(data.forecast.status);
        //console.log(data.location);
        search.value = '';
        }
    });
})
})
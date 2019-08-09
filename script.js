var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
var xhrBtn = document.querySelector('#xhr');
var quote = document.getElementById('quote');
var fetchBtn = document.querySelector('#fetch');
var axiosBtn = document.querySelector('#axios');


// XHR method
xhrBtn.addEventListener('click', function(){
  var XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function(){
    if(XHR.readyState == 4 && XHR.status == 200) {
    	var message = JSON.parse(XHR.responseText)[0];
      	quote.innerHTML = message;
    }
  }
  XHR.open("GET",url);
  XHR.send();
})

// fetch method
fetchBtn.addEventListener('click', function(){
	fetch(url)
		.then(handleErrors)
		.then(parseJSON)
		.then(displayMessage)
		.catch(printError);
})

function handleErrors (response){
  if(!response.ok) {
    throw Error(response.status);
  }
  return response;
}

function parseJSON(response){
	return response.json().then(function(data){
		return data[0]});
}

function displayMessage(data){
	quote.innerHTML = data;
}

function printError(error){
	console.log(error);
}


// jQuery method
$("#jquery").click(function(){
  $.getJSON(url)
  .done(function(data){
  
    $('#quote').text(data[0])
  })
  .fail(function(){
    console.log("PROBLEM!");
  })
});

// Axios method
axiosBtn.addEventListener('click', sendRequest)

function sendRequest(){
	axios.get(url)
	.then(displayMessageAxios)
	.catch(handleErrorsAxios)
}


function displayMessageAxios(res){
	quote.innerHTML = res.data[0];
}


function handleErrorsAxios(err) {
    if (err.response) {
      console.log("Problem With Response ", err.response.status);
    } else if (err.request) {
      console.log("Problem With Request!");
    } else {
      console.log('Error', err.message);
    }
  }

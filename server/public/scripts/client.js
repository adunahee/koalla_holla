console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', saveKoala); 

}

//get koalas functions as expected
function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax ({
    method: 'GET',
    url: 'koalas'
  }).then(function(response) {
    const listOfKoalas = response;
    $('#viewKoalas').empty();
    for(let koala of listOfKoalas) {
      //append each koala to the table
      $('#viewKoalas').append(`<tr>
                                <td>${koala.name}</td>
                                <td>${koala.gender}</td>
                                <td>${koala.age}</td>
                                <td>${koala.ready_to_transfer}</td>
                                <td>${koala.notes}</td>
                                <button class="delete-button"
                                data-koalaId="${koala.id}">Delete</button>
                                <button class="transfer-button"
                                data-transfer="${koala.id}">Ready for Transfer</button>
                                </tr>`
                          )};
       
  });
} // end getKoalas

function saveKoala(){
  // ajax call to server to get koalas
 
}

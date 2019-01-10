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
  $('#viewKoalas').on('click', '.transfer-button', koalaReady);
  
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

function saveKoala(){
  // ajax call to server to get koalas
 
}

function koalaReady(){
  const transferReady = $(this).data('transfer');
    $.ajax({
      method: 'PUT',
      url: `/transfer/${koala.id}`
    }).then(function(response){
      getKoalas()
    }).catch(function(error){
      alert('Transfer Update Failed.', error);
      console.log(error);
    })
}

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
  $('#deleteButton').on('click', deleteKoala );
}
//delete Koala 
function deleteKoala(){
  // const koalaId = 1;//$(this).data('koalasid');
  $.ajax({
      method: 'DELETE',
      url: `/koalas/1 `//${koalaId}`
  }).then(function(response) {
      getKoalas();
  }).catch(function(error) {
      console.log('Error in deleteKoala', error );
  });
};

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

function saveKoala(){
  // ajax call to server to get koalas
 
}

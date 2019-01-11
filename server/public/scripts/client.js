//console.log( 'js' );

$( document ).ready( function(){
  //console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  //test code to fill out inputs
  placeholderValues();
  //test code for sweet alert sourced
  //swal('DOM has loaded, sweet alert is sourced!');
}); // end doc ready

function setupClickListeners() {
$( '#addButton' ).on( 'click', addKoala); 
  $('#viewKoalas').on('click', '.transfer-button', koalaReady);
  $('#viewKoalas').on('click','.delete-button', deleteKoala);
}

//delete Koala 
function deleteKoala(){
  //grabs name of koala in row to be deleted
  const koalaName = $(this).parent().parent().children(".name").html();
  //console.log(koalaName);
  
  swal({
    title: 'Confirm Delete',
    text: `Are you sure you want to delete ${koalaName} from the table?`,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((confirmation) => {
    switch (confirmation) {
      case true:
      swal('Delete confirmed.', `${koalaName} is gone now.`); 
        const koalaId = $(this).data('koalaid');
        $.ajax({
          method: 'DELETE',
          url: `/koalas/${koalaId}`
        }).then(function (response) {
          getKoalas();
        }).catch(function (error) {
          console.log('Error in deleteKoala', error);
        });
        break;
      case null:
      swal('Delete canceled.', `${koalaName} kept!`);
        break;
      default:
        break;
    }
  });
  //console.log('delete Click');
};

//get koalas functions as expected
function getKoalas(){
  //console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax ({
    method: 'GET',
    url: '/koalas'
  }).then(function(response) {
    const listOfKoalas = response;
    $('#viewKoalas').empty();
    for(let koala of listOfKoalas) {
      //append each koala to the table
      //console.log(`${koala.ready_to_transfer}`);
      if (`${koala.ready_to_transfer}` === 'false') {
      
        
      $('#viewKoalas').append(`<tr>
                                <td class="name">${koala.name}</td>
                                <td>${koala.gender}</td>
                                <td>${koala.age}</td>
                                <td>${koala.ready_to_transfer}</td>
                                <td><button class="transfer-button"
                                data-transfer="${koala.id}">Ready for Transfer</button></td>
                                <td>${koala.notes}</td>
                                <td><button class="delete-button"
                                data-koalaId="${koala.id}">Remove</button></td>
                                </tr>`
        )
      } else {
        $('#viewKoalas').append(`<tr class='ready'>
                                <td>${koala.name}</td>
                                <td>${koala.gender}</td>
                                <td>${koala.age}</td>
                                <td>${koala.ready_to_transfer}</td>
                                <td></td>
                                <td>${koala.notes}</td>
                                <td><button class="delete-button"
                                data-koalaId="${koala.id}">Remove</button></td>
                                </tr>`)
      }
    } 
  });
} // end getKoalas

function placeholderValues () {
  $('#nameIn').val('Fred');
  $('#ageIn').val(4);
  $('#genderIn').val('M');
  $('#readyForTransferIn').val('N');
  $('#notesIn').val('Enjoys long walks on the beach');
}

function addKoala() {
  $.ajax({
    method: 'POST', 
    url: '/koalas',
    data: {
      name: $('#nameIn').val(),
      gender: $('#genderIn').val(),
      age: $('#ageIn').val(),
      ready_to_transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    }
  }).then((res)=>{
    //console.log(res);
    getKoalas();
  }).catch((error) => {
    console.log('server error for ajax POST', error);
  })
}

function koalaReady(){
  const transferReady = $(this).data('transfer');
    $.ajax({
      method: 'PUT',
      url: `/koalas/transfer/${transferReady}`
    }).then(function(response){
      getKoalas()
    }).catch(function(error){
      alert('Transfer Update Failed.', error);
      console.log(error);
    })
}

$(document).ready(function(){
    $("#update").hide()
    // reset FormData
    function resetForm() {
        $('#myform').trigger("reset");
    };

     // addMethod of email
     jQuery.validator.addMethod("myemail", function(value, element) {
        return this.optional( element ) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( value );
        }, 'Email must be in this format : exampale@abc.abc');
    
    // addMethod of firstname
    jQuery.validator.addMethod("f_name", function(value, element) {
        return this.optional( element ) || /^[a-zA-Z]+$/.test( value );
        }, 'first name should be only letters');
    
    // addMethod of last name 
    jQuery.validator.addMethod("l_name", function(value, element) {
        return this.optional( element ) || /^[a-zA-Z]+$/.test( value );
        }, 'last name should be only letters');
    
    // validation function 
    $(document).ready(function checkvalid() {
        $("#myform").validate({ 
            rules: {
                email: {
                    myemail: true,
                    required: true
                },
                fname: {
                    f_name: true,
                    required: true
                },
                lname: {
                    l_name: true,
                    required: true
                },
                gender: {
                    required: true
                },
                country: {
                    required: true
                },
                hobbies:{
                    required: true
                },
            },
            messages: {
                email: {
                    required: "Please enter your email",
                },
                fname: {
                    required: "Please enter your first name",
                },
                lname: {
                    required: "Please enter your last name",
                },
                gender: {
                    required: "Please select your gender",
                },
                country: {
                    required: "Please select your country",
                },
                hobbies:{
                    required: "Please select your hobbies"
                },
            },
            // Placement of error
            errorPlacement: function(error, element){
                if(element.is(".email")){
                    error.appendTo("#email-valid");
                }else if (element.is(".fname")) {
                    error.appendTo("#fname-valid");
                }else if (element.is(".lname")) {
                    error.appendTo("#lname-valid");
                }else if(element.is(":radio")){
                    error.appendTo("#gender-valid");
                }else if (element.is(".country")) {
                    error.appendTo("#country-valid");
                }else if (element.is(".hobbies")) {
                    error.appendTo("#hobbies-valid");
                }
            },
        });
    });
    // init datatable 
    var table = new DataTable('#example', {
        columnDefs: [{
            "defaultContent": "-",
            "targets": "_all"
          }],
        "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
			//debugger;
			var index = iDisplayIndexFull + 1;
			$("td:first", nRow).html(index);
			return nRow;
		},
    });
//  register function
    $('#register').on('click', function(event, nRow) {
        event.preventDefault();
        if(!$("#myform").valid()){   
            // checkvalid();   
        }
        else{
        let email = $("#email").val()
        let firstname = $("#fname").val()
        let lastname = $("#lname").val()
        let gender = $('input[name="gender"]:checked').val()
        let hobbies = $('input[type="checkbox"]:checked').map(function() {return this.value;}).get();
        let country = $('#country').find(":selected").val();
        let action = '<button type="button" class="btn btn-success me-2 edit">Edit</button><button type="button" class="btn btn-dark delete" id="delete">Delete</button>'
        let dataf = [nRow,email, firstname, lastname, gender,country, hobbies, action]
        resetForm()
        if (email !== "" && firstname !== "" && lastname !== "" && gender !== "" && hobbies !== "" && country !== ""){
            table.row.add(dataf).draw();
        }
        }
    });
    // edit function
    table.on("click", ".edit", function () {
        window.rowindex = table.row($(this).parents('tr')).index();
        let data = table.row(rowindex).data();
        $('#email').val(data[1]);
        $('#fname').val(data[2]);
        $('#lname').val(data[3]);
        if (data[4] == "Female"){
            $('#female').prop('checked', true);
        }else{
            $('#male').prop('checked', true);
        }
        $("#country").val(data[5])
        $(".hobbies").val(data[6])  
        $("#register").hide()
        $("#update").show()
    });
    // update function 
    $("#update").on('click', function(event, nRow) { 
        $("#register").show()
        $("#update").hide()
        event.preventDefault();
        if(!$("#myform").valid()){   
            // checkvalid();
        }else{
        let email = $("#email").val()
        let firstname = $("#fname").val()
        let lastname = $("#lname").val()
        let gender = $('input[name="gender"]:checked').val()
        let hobbies = $('input[type="checkbox"]:checked').map(function() {return this.value;}).get();
        let country = $('#country').find(":selected").val();
        let action = '<button type="button" class="btn btn-success me-2 edit">Edit</button><button type="button" class="btn btn-dark delete" id="delete">Delete</button>'
        resetForm()
            if (email !== "" && firstname !== "" && lastname !== "" && gender !== "" && hobbies !== "" && country !== ""){
        table.row(rowindex).data([nRow, email, firstname, lastname, gender,country, hobbies, action ]).draw()
        resetForm()
           }
        }
    });
    // delete function 
    table.on("click", ".delete", function() {
        table.row($(this).parents('tr')).remove().draw(); 
    }) 
});
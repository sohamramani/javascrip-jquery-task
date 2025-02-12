$(document).ready(function(){
    $("#update").hide()

    // var table = $('#example').DataTable();
    var table = new DataTable('#example', {
        autoFill: true,
        columnDefs: [
            {
                searchable: false,
                orderable: false,
                targets: 0
            }
        ],
        order: [[1, 'asc']],    

        columnDefs: [
            {
                data: null,
                defaultContent:'<button type="button" class="btn btn-success me-2 edit">Edit</button><button type="button" class="btn btn-dark delete" id="delete">Delete</button>',
                targets: -1
            }
        ]
    });



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


    $('#register').on('click', function(event) {
        event.preventDefault();
        if(!$("#myform").valid()){   
            checkvalid();   
        }
        else{
        let email = $("#email").val()
        let firstname = $("#fname").val()
        let lastname = $("#lname").val()
        let gender = $('input[name="gender"]:checked').val()
        let hobbies = $('input[type="checkbox"]:checked').map(function() {return this.value;}).get();
        let country = $('#country').find(":selected").val();


        // let total = 0;
 
        // table.cells(null, 6, { search: 'applied', order: 'applied' }).every(function (cell) {
        //      total += t.row( this.index().row ).data().cash_in * 1;
        //         this.data( total );
        //     }).draw();

        resetForm()
        if (email !== "" && firstname !== "" && lastname !== "" && gender !== "" && hobbies !== "" && country !== ""){
            table.on('order.dt search.dt', function() {
                let i = 1;
         
                table.cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
                    this.data(i++);
                });
            }).draw();
            
            table.row.add([email, firstname, lastname, gender,country, hobbies ]).draw(); 
        }
    }
    });
    
    table.on("click", ".edit", function () {
        let rowindex = table.row($(this).parents('tr')).index();
        let data = table.row(rowindex).data();
        // $(".test span").text(data);
        $('#email').val(data[0]);
        $('#fname').val(data[1]);
        $('#lname').val(data[2]);
        if (data[3] == "Female"){
            $('#female').prop('checked', true);
        }else{
            $('#male').prop('checked', true);
        }
        $("#country").val(data[4])
        $(".hobbies").val(data[5]) 

        $("#register").hide()
        $("#update").show()
    
        $("#update").on('click', function(event) { 
            $("#register").show()
            $("#update").hide()
            event.preventDefault();
            if(!$("#myform").valid()){   
                checkvalid();
            }else{
            let email = $("#email").val()
            let firstname = $("#fname").val()
            let lastname = $("#lname").val()
            let gender = $('input[name="gender"]:checked').val()
            let hobbies = $('input[type="checkbox"]:checked').map(function() {return this.value;}).get();
            let country = $('#country').find(":selected").val();
            resetForm()
            if (email !== "" && firstname !== "" && lastname !== "" && gender !== "" && hobbies !== "" && country !== ""){
                table.row(rowindex).data([email, firstname, lastname, gender,country, hobbies ]).draw()
                resetForm()
            }
        }
        })
    });
 
    table.on("click", ".delete", function(e) {
        table.row($(this).parents('tr')).remove().draw();
    })

});
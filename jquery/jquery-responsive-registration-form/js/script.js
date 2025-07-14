$(document).ready(function(){
    jQuery.validator.addMethod("myemail", function(value, element) {
        return this.optional( element ) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( value );
        }, 'Email must be in this format : exampale@abc.abc');
      
    jQuery.validator.addMethod("mypass", function(value, element) {
        return this.optional( element ) || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test( value );
        }, "password must be 8 character and contain at least one uppercase letter, one lowercase letter, one digit, and one special character");

    jQuery.validator.addMethod("f_name", function(value, element) {
        return this.optional( element ) || /^[a-zA-Z]+$/.test( value );
        }, 'first name should be only letters');

    jQuery.validator.addMethod("l_name", function(value, element) {
        return this.optional( element ) || /^[a-zA-Z]+$/.test( value );
        }, 'last name should be only letters');

$(document).ready(function checkvalid() {
    $("#myform").validate({ 
        rules: {
            email: {
                myemail: true,
                required: true
            },
            password: {
                mypass: true,
                required: true
            },
            re_password: {
                equalTo: "#pass",
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
            terms: {
                required: true
            }
        },
        messages: {
            email: {
                required: "Please enter your email",
            },
            password: {
                required: "Please enter your password",
            },
            re_password:{
                equalTo: "Password does not match",
                required: "Please enter your re-type password",
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
            terms: {
                required: "Please agree with terms and conditions",
            }
        },
        errorPlacement: function(error, element){
            if(element.is(":radio")){
                error.appendTo("#gender-valid");
            }else if (element.is(".country")) {
                error.appendTo("#country-valid");
            }else if (element.is(".hobbies")) {
                error.appendTo("#hobbies-valid");
            }else if (element.is(".terms")) {
                error.appendTo("#term-valid");
            }else if (element.is(".fname")) {
                error.appendTo("#fname-valid");
            }else if (element.is(".lname")) {
                error.appendTo("#lname-valid");
            }else{
                error.insertAfter(element);
            }
        },
    });

    $("#register").click(function(){  
        if(!$("#myform").valid()){   
            checkvalid();
        }
    });
});
});

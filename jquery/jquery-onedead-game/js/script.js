$(document).ready(function(){
    $(".game").hide()

    // restart the game and generate rendom number
    $('#strat').click(function() {
        $(".game").show()
        function generate_randomnumber(count, max) {
            const numbers = [];
            while (numbers.length < count) {
              const randomnumber = Math.floor(Math.random() * max);
              if (!numbers.includes(randomnumber)) {
                numbers.push(randomnumber);
              }
            }
            return numbers;
          }
        random_number = generate_randomnumber(4, 10); 
        console.log("random number : " + random_number);
    });

    // clear function
    function clear() {
        calculationArray = [];
        screen.innerHTML = calculationArray
        $("#injured").html(" ");
        $("#dead").html("");
        $("#error").html("")
    }
    $('#clear').click(clear);
    let calculationArray = [];
    let random_number
    let screen = document.querySelector('.display_num')
    let is_enterd = false
        
    // all digit number function
    $('.num_value').click(function() {
        if (is_enterd == true ){
            clear()
        is_enterd = false
        }
        let number = $(this).val();
        appendValue(number);
    });
    
    // digit disply in screen
    function appendValue(value) {
        if (calculationArray.length < 4) {
            if (!calculationArray.includes(+value)) {
                calculationArray.push(+value);
            }else{
                $("#error").html("repeating characters are not allowed");
            }   
        }
        screen.innerHTML = calculationArray.join("");
    }
    // win function
    function compare(arr1, arr2) { 
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
            return false;
          }
        }
        calculationArray = [];
        screen.innerHTML = calculationArray
        return alert("you won"), $(".game").hide();
    }
    let move_count = 0
    // enter key function
    $('#enter').click(function() {
        if (calculationArray.length > 3){
            move_count++
            console.log("my Array : " + calculationArray);
            // win function
            compare(calculationArray, random_number);
            // for dead count
            let count_dead = 0;
            random_number.forEach((element, i) => {
                if (element === calculationArray[i]) {
                    count_dead++;
                    $("#dead").html(count_dead + " : Dead");
                }
            });
            // for injured count
            let count_injured = 0;
            for (let i = 0; i < random_number.length; i++) {
                if (calculationArray.includes(random_number[i])) {
                    count_injured++;
                }
            }

            let value = `<tr> "<td>${move_count} </td> <td>${calculationArray}</td> <td> ${count_dead} : Dead </td> <td>${count_injured - count_dead} : injured </td>" </tr>` 
            $('#myTable tbody').append(value);
            is_enterd = true
            return $("#injured").html(count_injured - count_dead + " : injured");
        }else{
            $("#error").html("only 4 digits are allowed");
            clear()
        }
    });
});


var people = {};

var total = 0;
var average = 0;

var eachPersonPaid = [];
var differences = [];
function init(){

    people['a'] = [];
    people['b'] = [];
    people['c'] = [];
    people['d'] = [];
    people['e'] = [];

    people['a'].push({ "paid" : 5000 , "info" : "CarExpensesA"});
    people['b'].push({ "paid" : 600 , "info" : "CarExpensesB"});
    people['c'].push({ "paid" : 8000 , "info" : "CarExpensesC"});
    people['d'].push({ "paid" : 1000 , "info" : "CarExpensesD"});
    people['e'].push({ "paid" : 15000 , "info" : "CarExpensesE"});
    people['a'].push({ "paid" : 500 , "info" : "CarExpensesA1"});

    var numOfPeople = Object.keys(people).length;
    
    total = calculateTotal();
    average = calculateAverage(numOfPeople, total);
    calculateDiff(numOfPeople);
    whoPayWho(numOfPeople);
    
}

function calculateTotal( ){
    var calcTotal = 0;
    eachPersonPaid = [];
    for (const [key, value] of Object.entries(people)) {
        var paymentByEach = 0;
        var person = people[key];
        for (var i = 0 ; i < people[key].length; i++){
            var currentPayment = people[key][i];
            var paid = currentPayment['paid'];
            paymentByEach = paymentByEach + paid;
            
        }
        eachPersonPaid.push(paymentByEach);
        calcTotal = calcTotal + paymentByEach;
    }
    return calcTotal;
}

function calculateAverage ( numOfPeople , total ){
    return total / numOfPeople;
}

function calculateDiff (numOfPeople){
    for (var i = 0 ; i < numOfPeople ; i++){
        differences.push(eachPersonPaid[i] - average);
    }
}

function whoPayWho( numOfPeople , average ){
    var paidMore = [];
    var paidLess = [];
    counter = 0 ;
    console.log("TCL: whoPayWho -> differences", differences)
    for (const [key, value] of Object.entries(people)) {
        var peopleName = key;
        
        if(differences[counter] > 0){

            var paidMorePerson = { 'paid' : differences[counter] , 'name' : peopleName};
            paidMore.push(paidMorePerson);
        }
        else if(differences[counter] < 0){
            var paidLessPerson = { 'paid' : Math.abs(differences[counter]) , 'name' : peopleName};
            paidLess.push(paidLessPerson);
        }
        else{
            // console.log("Person " + peopleName + " does not need to pay anyone.");
        }
        counter++;
    }

    for (var i = 0 ; i < paidMore.length; i++){
        var personThatPaidMore = paidMore[i];
        if(personThatPaidMore.paid == 0 ) break
        for(var j = 0; j < paidLess.length; j++){
            var personThatPaidLess = paidLess[j];
            if(personThatPaidLess.paid == 0 || personThatPaidMore.paid == 0) continue
            if(personThatPaidMore.paid > personThatPaidLess.paid){
                console.log("Person " + personThatPaidLess.name + " paid back " + personThatPaidMore.name + " : $" + personThatPaidLess.paid);
                // console.log("Trigger1");
                personThatPaidMore.paid = personThatPaidMore.paid - personThatPaidLess.paid;
                personThatPaidLess.paid = 0;
                
            }
            else if (personThatPaidMore.paid < personThatPaidLess.paid){
                console.log("Person " + personThatPaidLess.name + " paid back " + personThatPaidMore.name  + " : $" + personThatPaidMore.paid);
                // console.log("Trigger2");
                personThatPaidLess.paid = personThatPaidLess.paid - personThatPaidMore.paid;
                personThatPaidMore.paid = 0;
                
            }
            else{
                console.log("Person " + personThatPaidLess.name + " paid back " + personThatPaidMore.name  + " : $" + personThatPaidMore.paid);
                // console.log("Trigger3");
                personThatPaidMore.paid = 0;
                personThatPaidLess.paid = 0;
            }
            
        }
    }
    // console.log("TCL: whoPayWho -> paidMore", JSON.stringify(paidMore))
    // console.log("TCL: whoPayWho -> paidLess", JSON.stringify(paidLess))
}

init();
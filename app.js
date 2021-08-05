"use strict"

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      mainMenu(searchResults,people);
      break;
    case 'no':
      // TODO: search by traits
      let userPickedTrait = promptFor("Do you want to search by eye color, gender or occupation?", customValidation);
        switch(userPickedTrait){
          case 'eye color':
            searchResults = searchByEyeColor(people);
            //choosePerson(searchResults);
            break;
          case 'gender':
            searchResults = searchByGender(people);
            break;
          case 'occupation':
            searchResults = searchByOccupation(people);
            break;  
        }
      
      break;
      default:
    app(people); // restart app
      break;
      
  }

  //mainMenu(searchResults,people);
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
 
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  //displayPeople(people); //for test
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    displayPerson(person[0]);
    break;
    case "family":
    findMyFamily(people,person[0]);
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }

}
//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", customValidation);
  let lastName = promptFor("What is the person's last name?", customValidation);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}


//Search by user entered name
function userSearchByName(people, person){

  let userPerson = person.split(" ");
  let firstName = userPerson[0];
  let lastName = userPerson[1];

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}



//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", validateEyeColor);
  
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){     
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
    let peopleArray = [];
    for(let i = 0; i < foundPerson.length; i ++){
      peopleArray.push(foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n");
    }
     //let userSelectedName = prompt("Please select one of the following names: \n" + peopleArray);
    
     choosePerson(foundPerson);


  return foundPerson;
}
 

//Search by Gender
function searchByGender(people){
  let gender = promptFor("What is the person's gender?", validateGender);
  
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){     
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  let peopleArray = [];
  for(let i = 0; i < foundPerson.length; i ++){
    peopleArray.push(foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n");
  }
   //let userSelectedName = prompt("Please select one of the following names: \n" + peopleArray);
  
   choosePerson(foundPerson);


return foundPerson;
}

//Search by Occupation
function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation?", validateText);
  
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === occupation){     
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  let peopleArray = [];
  for(let i = 0; i < foundPerson.length; i ++){
    peopleArray.push(foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n");
  }
   //let userSelectedName = prompt("Please select one of the following names: \n" + peopleArray);
  
   choosePerson(foundPerson);


return foundPerson;
}


//Find Family of selected person
function findMyFamily(people,person){

  let myParents = person.parents;
  let mySpouse =  person.currentSpouse;
  let parentsNames = [];
  let spouseName = "";

  for(let i =0; i < people.length; i ++){

    for(let j = 0; j < person.parents.length; j++){
      if(people[i].id === person.parents[j]){
        parentsNames.push(" " + people[i].firstName + " " + people[i].lastName);
      }
    }
  }

  for(let i = 0; i < people.length; i++){
    if(people[i].id === person.currentSpouse){
      spouseName = people[i].firstName + " " + people[i].lastName;
    }
  }

  if(myParents != null || mySpouse != null){
    
    alert(`Parent:${parentsNames} \nSpouse: ${spouseName}`);
   
  }
}
//Find Descendants of selected person
function findMyDescendants(person){

}


//Calculate Age based on current date
 function calculateAgeInYrs(person){
   let thisAge = Date.parse(person.dob);
   let diff_ms = Date.now() - thisAge;
   let age_dt = new Date(diff_ms);

   return Math.abs(age_dt.getUTCFullYear() - 1970);
 }



//TODO: add other trait filter functions here.



//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "inches" + "\n";
  personInfo += "Weight: " + person.weight + " lbs" + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Age: " + calculateAgeInYrs(person) + " years old";
  alert(personInfo);
}

function choosePerson(people){
  let listOfPeople = people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n");
  let userSelectedPerson = prompt("Please select a name from the list: \n" + listOfPeople);

  mainMenu(userSearchByName(people, userSelectedPerson), people);
  //userSearchByName(people, userSelectedPerson);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let response;
  let isValid;
  do{
    response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false) //changed !== to === ""
  return response
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Custom Validations for individual trait searches
function customValidation(input){
  let testCase = /^[A-Za-z]/g;
  return testCase.test(input);
}
function validateText(input){
  let testCase = /^[A-Za-z]+$/;
  return testCase.test(input);
}
function validateInteger(input){
  let testCase = /^[0-9]+$/;
  return testCase.test(input);
}
function validateGender(input){
  let testCase = /^[male|female]+$/
  return testCase.test(input);
}
function validateEyeColor(input){
  let testCase = /^[blue|brown|black|hazel|green]/g;
  return testCase.test(input);
}
function validateYear(input){
  let testCase = /^(19[2-9]|200\d|2010)$/ //allow for year entries from 1920-2010
  return testCase.test(input);
}
//#endregion
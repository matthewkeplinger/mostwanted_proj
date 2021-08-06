"use strict";

//Authors: Matt Keplinger, Richard Fleming
//Title: Most Wanted
//Date: August 06, 2021

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      mainMenu(searchResults, people);
      break;
    case "no":
      let userPickedTrait = promptFor(
        "Do you want to search by eye color, gender, occupation, or multiple?",
        validateMenu
      );
      switch (userPickedTrait) {
        case "eye color":
          searchResults = searchByEyeColor(people);
          choosePerson(searchResults);
          break;
        case "gender":
          searchResults = searchByGender(people);
          choosePerson(searchResults);
          break;
        case "occupation":
          searchResults = searchByOccupation(people);
          choosePerson(searchResults);
          break;
        case "multiple":
          searchResults = multipleCriteriaSearch(people);
          choosePerson(searchResults);
          break;
      }

      break;
    default:
      app(people); // restart app
      break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }
  let displayOption = promptFor(
    "Found " +
      person[0].firstName +
      " " +
      person[0].lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
    validateText
  );

  switch (displayOption) {
    case "info":
      displayPerson(person[0]);
      break;
    case "family":
      findMyFamily(people, person[0]);
      break;
    case "descendants":
      console.log(findMyDescendantsRecursively(people, person[0]));
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

//Filter functions.
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", validateText);
  let lastName = promptFor("What is the person's last name?", validateText);

  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.firstName === firstName &&
      potentialMatch.lastName === lastName
    ) {
      return true;
    } else {
      return false;
    }
  });

  return foundPerson;
}

//Search by user entered name
function userSearchByName(people, person) {
  let userPerson = person.split(" ");
  let firstName = userPerson[0];
  let lastName = userPerson[1];

  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.firstName === firstName &&
      potentialMatch.lastName === lastName
    ) {
      return true;
    } else {
      return false;
    }
  });

  return foundPerson;
}

//Search by eye color
function searchByEyeColor(people) {
  let eyeColor = promptFor("What is the person's eye color?", validateEyeColor);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.eyeColor === eyeColor) {
      return true;
    } else {
      return false;
    }
  });

  let peopleArray = [];
  for (let i = 0; i < foundPerson.length; i++) {
    peopleArray.push(
      foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n"
    );
  }

  return foundPerson;
}

//Search by Gender
function searchByGender(people) {
  let gender = promptFor("What is the person's gender?", validateGender);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.gender === gender) {
      return true;
    } else {
      return false;
    }
  });

  let peopleArray = [];
  for (let i = 0; i < foundPerson.length; i++) {
    peopleArray.push(
      foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n"
    );
  }

  return foundPerson;
}

//Search by Occupation
function searchByOccupation(people) {
  let occupation = promptFor("What is the person's occupation?", validateText);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.occupation === occupation) {
      return true;
    } else {
      return false;
    }
  });

  let peopleArray = [];
  for (let i = 0; i < foundPerson.length; i++) {
    peopleArray.push(
      foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n"
    );
  }

  return foundPerson;
}

//Search by Age
function searchByAge(people) {
  let age = promptFor("What is the person's age?", validateInteger);

  let foundPerson = people.filter(function (potentialMatch) {
    if (calculateAgeInYrs(potentialMatch) === parseInt(age)) {
      return true;
    } else {
      return false;
    }
  });

  let peopleArray = [];
  for (let i = 0; i < foundPerson.length; i++) {
    peopleArray.push(
      foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n"
    );
  }

  return foundPerson;
}

//Search by Height
function searchByHeight(people) {
  let minHeight = promptFor(
    "What is the minimum height range?",
    validateInteger
  );
  let maxHeight = promptFor(
    "What is the maximum height range?",
    validateInteger
  );

  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.height >= parseInt(minHeight) &&
      potentialMatch.height <= parseInt(maxHeight)
    ) {
      return true;
    } else {
      return false;
    }
  });

  let peopleArray = [];
  for (let i = 0; i < foundPerson.length; i++) {
    peopleArray.push(
      foundPerson[i].firstName + " " + foundPerson[i].lastName + "\n"
    );
  }

  return foundPerson;
}

//Find Family of selected person
function findMyFamily(people, person) {
  let myParents = person.parents;
  let mySpouse = person.currentSpouse;
  let parentsNames = [];
  let spouseName = "";

  //Finds Parent Names
  for (let i = 0; i < people.length; i++) {
    for (let j = 0; j < person.parents.length; j++) {
      if (people[i].id === person.parents[j]) {
        parentsNames.push(" " + people[i].firstName + " " + people[i].lastName);
      }
    }
  }

  //Finds Spouse Name
  for (let i = 0; i < people.length; i++) {
    if (people[i].id === person.currentSpouse) {
      spouseName = people[i].firstName + " " + people[i].lastName;
    }
  }

  if (myParents != null || mySpouse != null) {
    alert(`Parent:${parentsNames} \nSpouse: ${spouseName}`);
  }
}

//Find Descendants of selected person
function findMyDescendantsRecursively(people, person) {
  let foundDescendants = [];

  for (let i = 0; i < people.length; i++) {
    if (people[i].parents.includes(person.id)) {
      foundDescendants.push(people[i]);
    }
  }
  for (let i = 0; i < foundDescendants.length; i++) {
    foundDescendants = foundDescendants.concat(
      findMyDescendantsRecursively(people, foundDescendants[i])
    );
  }
  return foundDescendants;
}

//Calculate Age based on current date
function calculateAgeInYrs(person) {
  let thisAge = Date.parse(person.dob);
  let diff_ms = Date.now() - thisAge;
  let age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

//Multiple criteria search
function multipleCriteriaSearch(people) {
  let gender = searchByGender(people);
  let eyeColor = searchByEyeColor(gender);
  let occupation = searchByOccupation(eyeColor);
  let age = searchByAge(occupation);
  let height = searchByHeight(age);

  return height;
}

//Display functions

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}

//Displays single person object traits
function displayPerson(person) {
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + " inches" + "\n";
  personInfo += "Weight: " + person.weight + " lbs" + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Age: " + calculateAgeInYrs(person) + " years old";
  alert(personInfo);
}

//Selects person from list, passes into main menu function
function choosePerson(people) {
  let listOfPeople = people
    .map(function (person) {
      return person.firstName + " " + person.lastName;
    })
    .join("\n");
  let userSelectedPerson = prompt(
    "Please select a name from the list: \n" + listOfPeople
  );

  mainMenu(userSearchByName(people, userSelectedPerson), people);
}

//Validation functions.
function promptFor(question, valid) {
  let response;
  let isValid;
  do {
    response = prompt(question).trim();
    isValid = valid(response);
  } while (response === "" || isValid === false); //changed !== to === ""
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  } else {
    return false;
  }
}

//Custom Validations for individual trait searches
function validateMenu(input) {
  let testCase = /^eye color$|^gender$|^occupation$|^multiple$/g;
  return testCase.test(input);
}
function validateText(input) {
  let testCase = /^[A-Za-z]+$/;
  return testCase.test(input);
}
function validateInteger(input) {
  let testCase = /^[0-9]+$/;
  return testCase.test(input);
}
function validateGender(input) {
  let testCase = /^male$|^female$/g;
  return testCase.test(input);
}
function validateEyeColor(input) {
  let testCase = /^blue$|^brown$|^black$|^hazel$|^green$]/g;
  return testCase.test(input);
}

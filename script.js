// Assignment Code
var generateBtn = document.querySelector("#generate");

// made a few global variables, since this is a simple application and it will make a couple things easier. 
var passwordLength;
// These are the booleans for the checkboxes
var upperCase;
var lowerCase;
var specialCase;
var numbers;

// setting up the value slider.
// this is NOT a part of the assignment, but again, i feel that it greatly improves the user experience, so why not?
var slider = document.getElementById("passwordLength");
var output = document.getElementById("passwordValue");
output.innerHTML = slider.value;
slider.oninput = function () {
  output.innerHTML = this.value;
};

// I chose to use checkboxes in the html for selecting password criteria instead of prompts, 
// i know the assignment called for prompts, but i felt that checkboxes were a little more use friendly. 
// This section of the code simply checks the checkboxes and sets a true/false statement depending on their position. 
document.getElementById('upperCase').onclick = function () {
  if (this.checked) {
    upperCase = true;
  }
  else {
    upperCase = false;
  }
  console.log(upperCase)//check
};
document.getElementById('lowerCase').onclick = function () {
  if (this.checked) {
    lowerCase = true;
  }
  else {
    lowerCase = false;
  }
  console.log(lowerCase)//check
};
document.getElementById('specialChar').onclick = function () {
  if (this.checked) {
    specialCase = true;
  }
  else {
    specialCase = false;
  }
  console.log(specialCase)//check
};
document.getElementById('numbers').onclick = function () {
  if (this.checked) {
    numbers = true;
  }
  else {
    numbers = false;
  }
  console.log(numbers)//check
};


// Write password to the #password input
function writePassword() {
  // I added an if/else to check and make sure at least one of the criteria had been selected. 
  if (upperCase === true || lowerCase === true || specialCase === true || numbers === true) {

    passwordLength = document.getElementById("passwordLength").value;
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    if (password === undefined) { // give an alert if the password generator fails for some reason. mostly for development 
      alert("error");
    }
    else {
      passwordText.value = password;
    }
  }
  else {
  alert("You must chose at least one of the password criteria")
}
}


function generatePassword() {
  // set up variables for the random selection of all true character sets
  let charSet = [];
  let passwordString = [];

  var length = passwordLength;
  var upperRange = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerRange = "abcdefghijklmnopqrstuvwxyz";
  var specialRange = "!@#$%^&*()_+~`-=:;',.<>?/{}[]";
  var numberRange = "1234567890";

  // this loop picks a bunch of random characters (if the respective checkbox is selected) and stores them in the charSet array
  // the higher the number in the middle statement, the more "random" the charSet will become. (in theory. there is a practical limit though, and I chose a relatively small number so 
  //                                                                                             that the cpu will not get burnt out on the number of loops)
  for (let i = 0; i < 75; i++) {

    if (upperCase === true) {
      upperChar = upperRange.charAt(Math.floor(Math.random() * upperRange.length));
      charSet.push(upperChar);
    }
    if (lowerCase === true) {
      lowerChar = lowerRange.charAt(Math.floor(Math.random() * lowerRange.length));
      charSet.push(lowerChar);
    }
    if (specialCase === true) {
      specialChar = specialRange.charAt(Math.floor(Math.random() * specialRange.length));
      charSet.push(specialChar);
    }
    if (numbers === true) {
      numberChar = numberRange.charAt(Math.floor(Math.random() * numberRange.length));
      charSet.push(numberChar);
    }
    console.log(charSet);
  }

  // this loop picks random characters form the list complied by the previous loop 
  // it uses var.length, which equals the user input for how long the password should be
  //    to determine how many random characters to select. 
  for (let i = 0; i < length; i++) {
    var charPicked = "";
    charPicked += charSet[Math.floor(Math.random() * charSet.length)];
    passwordString.push(charPicked);
  };
  // finally, log the result to the console, as well as return the result
  // so that the main function can access the randomly generated password. 
  console.log(passwordString);
  return passwordString.join('').toString();
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);





// PORTION OF WRITE PASSWORD FUNCTION THAT I CUT WHEN I ADDED THE SLIDER FUNCTION. 
// SAVING HERE IN CASE I NEED TO COME BACK TO IT. 

// if (passwordLength < 8) { // making sure there is at least 8 characters
//   alert("Password must be at least 8 characters");
//   console.log(passwordLength); //check if working
// }
// else if (passwordLength > 128) { // then making sure there is no more than 128 characters.
//   alert("Password must be less than 129 characters");
//   console.log(passwordLength); // check if working
// }
// else if (7 < passwordLength < 129) { // so if the password length meets the above criteria, is passes into the next part of the function
//   console.log(passwordLength);
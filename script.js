// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function generatePassword() {

  // Using while loop to get user input on how long the password should be
  do {
    passwordLength = prompt("Please pick a password length between 8 and 128 characters long.");
  }
  // In this while statement, i specify that passwordLength must be a number, and must be between 8 and 128. 
  // if the user given criteria for the password length does not meet these conditions, the prompt will be repeated. 
  while (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128);
  alert("You password will be " + passwordLength + " characters long."); // Confirming what they chose.

  // Once the user has satisfied the criteria for passwordLength, they are asked to confirm which character sets they want to include in their password. 
  upperCase = confirm("Would you like your password to include UPPER-CASE characters? (OK=YES, CANCEL=NO)");
  lowerCase = confirm("Would you like your password to include LOWER-CASE characters? (OK=YES, CANCEL=NO)");
  specialCase = confirm("Would you like your password to include SPECIAL characters? (OK=YES, CANCEL=NO)");
  numbers = confirm("Would you like your password to include NUMBERS? (OK=YES, CANCEL=NO)");

  // Check here to make sure at least one of the criteria had been selected. 
  // If user selected no to all of them, they will be alerted, and the function quits. 
  if (upperCase === false && lowerCase === false && specialCase === false && numbers === false) {
    alert("You must select yes for at least one password criteria");
    return;
  }
  // Once the required criteria is met, the password will be generated, along the criteria given. 
  var password = generateRandomPassword();
  var passwordText = document.querySelector("#password");
  if (password === undefined) { // give an alert and stop the program if the password generator fails for some reason.
    alert("error");
    return;
  }
  passwordText.value = password; // If you make it here, the program is working!
}

// Here is the function that actually generates a random password.
function generateRandomPassword() {

  let randomSet = []; // Array for a bunch of random, possible characters, that will then go on to be randomly chosen from for the final password
  let ensureSet = []; // Array for ensuring that at least one of each selected char-set will be included in the final password
  let passwordString = []; // Array for the final, randomly generated password. 

  // AND the variables for the contents of each possible character set. 
  var upperRange = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerRange = "abcdefghijklmnopqrstuvwxyz";
  var specialRange = "!@#$%^&*()_+~`-=:;',.<>?/{}[]";
  var numberRange = "1234567890";

  // doing truth checks to make sure the character sets are only included if the user selected them, then running the functions to include them if they pass.
  truthCheck(upperCase, upperRange);
  truthCheck(lowerCase, lowerRange);
  truthCheck(specialCase, specialRange);
  truthCheck(numbers, numberRange);

  // Truth-check function for the character selection.
  function truthCheck(x, y) {
    if (x) {
      randomSelector(y); // details below::
      charsetEnsure(y); // details below::
    };
  };

  // this is the function that provides a bunch of random characters to chose from, and sends them into the randomSet array, to later be chosen from randomly agin.
  // There are different methods that could be used in place of the for-loop, specifically the middle parameter. 
  // I chose i < 100 so that it would really fill up the randomSet array with options to choose from, to ensure a thoroughly random password, 
  // without running too many iterations and causing the function to run really slow. 
  function randomSelector(x) {
    for (let i = 0; i < 100; i++) {
      xChar = x.charAt(Math.floor(Math.random() * x.length));
      randomSet.push(xChar);
    };
  };

  // This function is what ensures that if a char-set passes its truth check, at least one of that sets characters will show up in the generated password. 
  function charsetEnsure(x) {
    xChar = x.charAt(Math.floor(Math.random() * x.length));
    ensureSet.push(xChar);
  };
  //then::
  //push the ensured chars to the passwordString, while joining them together so that they don't print with commas later.
  passwordString.push(ensureSet.join(''));

  // this loop picks random characters form the randomSet array that was filled earlier by the previous loop (randomSelector())
  // it uses (passwordLength - ensureSet.length) to ensure the generated password is the same length as specified by the user
  // (you must subtract ensureSet, because those characters will be added by force, and do not account for what the user specified the length to be)
  for (let i = 0; i < (passwordLength - ensureSet.length); i++) {
    var charPicked = randomSet[Math.floor(Math.random() * randomSet.length)];
    passwordString.push(charPicked);
  };

  // finally, log the result to the console, as well as return the result
  // so that the main function can access the randomly generated password. 
  console.log(passwordString); //console check
  return passwordString.join('').toString();
};

// Add event listener to generate button
generateBtn.addEventListener("click", generatePassword);
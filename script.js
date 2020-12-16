// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  // start by asking the user how many characters the password should be
  passwordLength = prompt("Chose a password length between 8 and 128 characters!");
  // check that the password length matches the criteria
  if (passwordLength > 7 && passwordLength < 129) {
    // if it does, then we can move on to the next part of the password generation. 
    upperCase = confirm("Would you like your password to have uppercase characters? (OK for yes, cancel for no)");
    lowerCase = confirm("Would you like your password to have lowercase characters? (Ok for yes, cancel for no)");
    specialCase = confirm("Would you like your password to have special characters? (OK for yes, cancel for no)");
    numbers = confirm("Would you like your password to have numbers? (OK for yes, cancel for no)");

    // I added an if/else to check and make sure at least one of the criteria had been selected. 
    if (upperCase === true || lowerCase === true || specialCase === true || numbers === true) {
      var password = generatePassword();
      var passwordText = document.querySelector("#password");

      if (password === undefined) { // give an alert if the password generator fails for some reason. for dev purposes
        alert("error");
      }
      else {
        passwordText.value = password;
      }
    }
    // if you did not accept any password criteria, you end up here.
    else {
      alert("You must chose at least one of the password criteria")
    }
  }
  // if the password length did not match the criteria, you end up here.
  else {
    alert("Please pick a number between 8 and 128")
    return;
  }

  // write the function that actually generates a random password.
  function generatePassword() {
    // set up variables for the random selection of all true character sets
    let randomSet = [];
    let ensureSet = [];
    let passwordString = [];
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
    // Truth-check function for the character selection. These are the functions run if the char-sets pass the truth test
    function truthCheck(x,y) {
      if (x) {
        randomSelector(y);
        charsetEnsure(y);
      };
    };
    // this is the function that provides a bunch of random characters to chose from, and sends them into the randomSet array, to later be chosen from randomly agin.
    // There are different methods that could be used in place of the for-loop, specifically the middle parameter. 
    // I chose i < 75 so that it would really fill up the randomSet array with options to choose from, to ensure a thoroughly random password, 
    // without running too many iterations and causing the function to run really slow. 
    function randomSelector(x) {
      for (let i = 0; i < 75; i++) {
        xChar = x.charAt(Math.floor(Math.random() * x.length));
        randomSet.push(xChar);
      };
    };
    // So this ensures that if a char-set passes its truth check, at least one of that sets characters will show up in the generated password. 
    function charsetEnsure(x) {
      xChar = x.charAt(Math.floor(Math.random() * x.length));
      ensureSet.push(xChar);
    };
    //push the ensured chars to the passwordString, while joining them together so that they don't print with commas later.
    passwordString.push(ensureSet.join(''));
    // this loop picks random characters form the list complied by the previous loop (randomSelector())
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
};
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
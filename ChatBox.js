//Bot responses
var keyMatch={
  good:"Thats good to hear.",
  bad: "Well I hope the rest of your day is better.",
  cold: "That's my least favourite weather.", 
  hot: "If the sun is out, great time to get a tan.",
  warm: "Warm weather is my favourite.",
  blue: "40% of people worldwide say their favorite color is blue.",
  red: "Red is the first color a baby sees, at around 2 weeks of age.",
  pink: "Pink is the most calming color, and is used in some prisons and mental health institutions to calm worked-up prisoners and patients.",
  basketball: "Cool fact, the slam dunk was banned in the nba from 1967-1977.",
  soccer: "That's pretty cool, Messi is really skilled.",
  football: "Watch out for the head trauma.",
  software: "You should take codeworks bootcamp to accelerate your software engineering education.",
  doctor: "You'll be helping people feel better, you must be a good person.",
  player: "You'll be active while having a career.",
  cat: "Did you know cats can jump up to six times their length.",
  dog:"A dog's sense of smell is at least 40x better than human.",
  bye: "Goodbye.",
  goodbye: "Goodbye."

}

//Bot questions
var arrayOfQuestions = ["How was the weather now?", "What's your favourite color?", "Whats your favourite sport to watch?", "What's your dream job?", "What is your favourite domestic animal?"];


//Posts the first message when the user clicks anywhere in the body of page including the textbox
$("body").one("click",function(event){ 
  event.preventDefault();
  //adds date and time
  var pDate =$('<p id="dateTime"></p>');
  pDate.text(dateTime());
  $("#ChatBox").append(pDate);
  //sends intial computer message
  var p =$('<p id="ComputerChatBox"></p>');
  p.text("Hello I'm a ChatBot, How are you?");
  $("#ChatBox").append(p);
});



//Posts user message on webpage when user clicks send message button
$("#User-message").on("submit",function(event){
  event.preventDefault(); 

  //retrive message and post it in chatbox
  var $message = $(this).find("[name=LatestMessage]");
  var message=$message.val();
  var p =$('<p id="UserChatBox"></p>');
  p.text(message);
  //adds date and time
  var pDate =$('<p id="dateTime"></p>');
  pDate.text(dateTime());
  $("#ChatBox").append(pDate);
  $("#ChatBox").append(p);
  //clear textbox form after 
  $("#User-message")[0].reset();

  //start of bot response process
  var onlyLettersMessage=keepLettersOnly(message);
  var computerResponse=keyProperty(onlyLettersMessage,keyMatch);

  //create paragraph element for botresponse
  p =$('<p id="ComputerChatBox"></p>');

  //if statment checks if user said goodbye and if any questions left 
  if (computerResponse!=="Goodbye."&&arrayOfQuestions[0]!==undefined){
    var questionIndex = Math.round(Math.random() * (arrayOfQuestions.length-1));
    p.text(computerResponse+" "+arrayOfQuestions[questionIndex]);
    arrayOfQuestions.splice(questionIndex,1);//removes question so no repeat Questions
  }else if(computerResponse!=="Goodbye."&&arrayOfQuestions[0]===undefined){
    p.text(computerResponse+" "+"I have no more questions to ask.");//executes if user still conversating but no more questions
  }else{
    p.text(computerResponse);//executes if user says bye
  }
  //adds date and time
  pDate =$('<p id="dateTime"></p>');
  pDate.text(dateTime());
  $("#ChatBox").append(pDate);
  $("#ChatBox").append(p);

  // we want to use browser methods so we want to create a dom node of the chatbox div
  var chatBox = document.getElementById("ChatBox");
  chatBox.scrollTop = chatBox.scrollHeight;
  document.getElementById( "User-message" ).scrollIntoView();
  
});

/*function returns an array with userMessage's individual words in each index with all non letters removed and all letters in lowercase
function assumes good grammer (Ex, "I am good, hbu?", so space after each special character)*/
function keepLettersOnly(userMessage){
  var userMessageArray = (userMessage.toLowerCase()).split(" ");// also lower case because keys are all in lowercase

  for(let i=0;i<userMessageArray.length;i++){
    for(let j=0;j<userMessageArray[i].length;j++){
      //checks for characters that arent letters
      if (!(userMessageArray[i][j].match(/[a-z]/gi))){
        //splits the word at index i into a array of characters
        var wordArray=userMessageArray[i].split("");
        //removes the non letter
        wordArray.splice(j,1);
        //stores the word back into the array with the non leter removed
        userMessageArray[i]=wordArray.join("");
        j--;//since we removed a special char
      }
    }
  }
  return userMessageArray;
}

 //checks if a key from keyPropertyObject matchs any word in array and if it does returns the property of that key, if no matching key returns generic message 
function keyProperty(arrayOfWords,keyPropertyObject){
  for (let i=0;i<arrayOfWords.length;i++){
    if(keyPropertyObject[arrayOfWords[i]]!==undefined){
      return keyPropertyObject[arrayOfWords[i]];
    }
  }
  return "I'm a ChatBot, my conversation skills are limited. I have no reply to that message.";
}

//gets current date and time
function dateTime (){
  var now = new Date();

  var minutes = now.getMinutes(); 
  //displays minutes when under 10 as 01,02...
  if (minutes<10){
    minutes = "0"+minutes;
  }

  var date = now.getDate()+"/"+ (now.getMonth()+1)+"/"+ now.getFullYear();
  var time = now.getHours() + ":" + minutes;

  return date+" "+time;
}

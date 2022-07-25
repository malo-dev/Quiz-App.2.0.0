//Start Section
let start = document.querySelector("#start");

//guide Section
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");
// all about variables regex will go here
const Email = document.getElementById("email_field")
const Name = document.getElementById("name_field")
const error_message = document.getElementById("error_message")
const errorr_message = document.getElementById("errorr_message")
const success_message = document.getElementById("success_message")
const successs_message = document.getElementById("successs_message")
const form_container=document.querySelector(".form_container")
//Quiz Section
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

//question Section
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//Multiple Choices Of Questions
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//correct and next Button
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

//Result Section
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");

//Get All 'H4' From Quiz Section (MCQS)
let choice_que = document.querySelectorAll(".choice_que");


let index = 0;
let timer = 0;
let interval = 0;

//total points
let correct = 0;

//store Answer Value
let UserAns = undefined;


// here will go the regex expression
const ValidateName = function () {
    if (Name.value !== "") {
        successs_message.innerHTML = "your name is  valid"
        errorr_message.style.display="none"
        return true
    } else {
        errorr_message = "please fullfield this field"
        successs_message.style.display="none"
        return false
    }
}

const ValidateEmail= function(){
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(Email.value.trim())){
        Email.style.border="1px solid #028A3D"
        success_message.innerHTML = "your mail is valid"
        error_message.style.display="none"
        return true

    }else if(Email.value === ""){
        Email.style.border="1px solid #FF3838"
        error_message.innerHTML = "Fullfil this field ,please."
        success_message.style.display="none"
        return false

    }else if(!(reg.test(Email.value.trim()))){
        Email.style.border="1px solid #FF3838"
        error_message.innerHTML = "Fullfil this field ,please."
        success_message.style.display="none"
        return false
        
    }else if(!(reg.test(Email.value))){
        Email.style.border="1px solid #FF3838"
        error_message.innerHTML = "Fullfil this field ,please."
        success_message.style.display="none"
        return false
    }  
}

Name.addEventListener("change", () => {
    ValidateName()
    document.getElementById("nametitle").innerText=Name.value
})
Email.addEventListener("change", () => {
    ValidateEmail()
     document.getElementById("mailtitle").innerText=Email.value
})


document.getElementById("start-quiz").addEventListener("click", () => {
    if (ValidateEmail() && ValidateName()) {
        document.querySelector(".form_container").style.display = "none"
        guide.style.display="block"
    }
})



//what happen when 'Start' Button Will Click
start.addEventListener("click", () => {
    start.style.display = "none";
    form_container.style.display = "flex";
});

//what happen when 'Exit' Button Will Click
exit.addEventListener("click", () => {
    start.style.display = "block";
    guide.style.display = "none";
});

//Creating Timer For Quiz Timer Section

let countDown = () => {
    if (timer === 20) {
        clearInterval(interval);
        next_question.click();
    } else {
        timer++;
        time.innerText = 60-timer;
    }
   
}

//setInterval(countDown,1000);

let loadData = () => {
    questionNo.innerText =  index + 1 + "/15 ";
    questionText.innerText = MCQS[index].question;
    option1.innerText = MCQS[index].choice1;
    option2.innerText = MCQS[index].choice2;
    option3.innerText = MCQS[index].choice3;
    option4.innerText = MCQS[index].choice4;

    //    timer start
    timer = 0;
}

loadData();


//what happen when 'Continue' Button Will Click
continueBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    guide.style.display = "none";

    interval = setInterval(countDown, 1000);
    loadData();
 

    //    remove All Active Classes When Continue Button Will Click

    choice_que.forEach(removeActive => {
        removeActive.classList.remove("active");
    })

    total_correct.innerHTML = `${correct = 0} Out Of ${MCQS.length} Questions`;
});

choice_que.forEach((choices, choiceNo) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");
        //check answer
        if (choiceNo === MCQS[index].answer) {
            correct++;
        } else {
            correct += 0;
        }
        //stop Counter
        clearInterval(interval);

        //disable All Options When User Select An Option
        for (i = 0; i <= 3; i++) {
            choice_que[i].classList.add("disabled");
        }
    })
});

////what happen when 'Next' Button Will Click
next_question.addEventListener("click", () => {
    //    if index is less then MCQS.length
    if (index !== MCQS.length - 1) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("active");
        })

        //question
        loadData();

        //result
        total_correct.style.display = "block";
        total_correct.innerHTML = `${correct} Out Of ${MCQS.length} Questions`;
        clearInterval(interval);

        interval = setInterval(countDown, 1000);
    } else {
        index = 0;


        //when Quiz Question Complete Display Result Section
        clearInterval(interval);
        quiz.style.display = "none";
        points.innerHTML = ` ${correct} /${MCQS.length}`;
        const correct_condition=`${correct} `
        console.log(correct_condition)
        if (correct_condition >=7 && correct_condition  >=15) {
            document.getElementById('image_succes').style.display='block'
        } if (correct_condition < 7) {
            document.getElementById('failure_succes').style.display='block'
        }
        result.style.display = "block";
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
    }
})

//what happen when 'Quit' Button Will Click
quit.addEventListener("click", () => {
    start.style.display = "block";
    result.style.display = "none";
});

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const loginContainer = document.querySelector("#login-container");
const mainContainer = document.querySelector("#main");
const logOut = document.querySelector("#log-out");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event){
    // event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY,username); //username을 local storage에 저장해서 새로고침해도 기억하게 함
   paintGreetings(username);
}

function paintGreetings(username){
    greeting.innerText = `Welcome! ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

//localstorage에 username 있는지 확인하기
const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername===null){
    loginContainer.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit",onLoginSubmit);
}else{
    paintGreetings(savedUsername);
    mainContainer.classList.remove(HIDDEN_CLASSNAME);
}

function onLogOut(){
    localStorage.clear();
    location.reload();
}

logOut.addEventListener("click",onLogOut);
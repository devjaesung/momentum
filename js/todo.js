const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "toDos";

let toDos = []; //toDos가 업데이트 되도록 let으로 만듦

function saveTodos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));//JSON.stringfy는 object나 array를 string타입으로 바꿔줌
}

function deleteToDo(event){
    const li = event.target.parentElement; //함수를 실행한 버튼의 html의 부모요소를 찾음
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); //li.id와 다른 id를 가지고 있는 li들만 남겨둔다!
    saveTodos();//제외하고 남은 li를 저장!
    
}
//filter는 return이 true일 때만 array의 item을 유지시킨다.
//return에 조건문을 활용하여 원하는 값만 true가 되도록 만들어 주기!
//기본로직은 fillter로 함수를 실행한 li를 제외하고 새 array를 만들어서 다시 저장해주는 것..! 

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id; //li에 id값을 추가함
    const span = document.createElement("span");
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo); //button에 이벤트리스너 추가
    li.appendChild(span); //span을 li의 자식으로 넣어줌.
    li.appendChild(button);
    span.innerText = newTodo.text; //newTodoObj의 text만 작성하게 함
    toDoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    const newTodoObj = {
        text: newTodo,
        id: Date.now() //밀리세컨드를 알려주는 함수를 사용하여 마치 랜덤한 값이 id가 되게 만들어 줌.
    } //Todo array를 object타입으로 바꿔서 id를 추가하여 각각의 item을 구분할 수 있게 만듦.
    toDoInput.value = ""; //enter하면 input값을 초기화함
    toDos.push(newTodoObj); //newTodoObj를 toDos배열에 넣어줌
    paintToDo(newTodoObj);
    saveTodos(); //localsotrage에 toDos를 저장하는 함수
}

toDoForm.addEventListener("submit",handleToDoSubmit);

const saveToDos = localStorage.getItem(TODOS_KEY);



if(saveToDos !== null){
    const parsedToDos = JSON.parse(saveToDos); //string타입을 array타입으로 바꿔줌
    toDos = parsedToDos //toDos배열에 localstorage에 저장된 toDo들을 넣어줌. -> 새로고침해도 예전에 있던 toDo들을 기억함.
    parsedToDos.forEach(paintToDo);//각각의 item들을 화면에 보여주는 역할
    // parsedToDos.forEach((item)=>{console.log("this is ToDos item",item)}); 
    //javascript의 array타입은 여러가지 함수를 사용할 수 있음 forEach는 array의 각각의 item에 대한 function을 사용함.
}


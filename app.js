const random = [];
let points = 0;
let flag = 10;
randomFunc();
function createGrid() {
    for(let i=0;i<=99;i++){
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", i);
        newDiv.classList.add("valid");
        newDiv.addEventListener("click", leftClick);
        newDiv.addEventListener("contextmenu", rightClick);
        document.getElementsByClassName("grid")[0].appendChild(newDiv);  
    }
    for(let i = 0 ; i < random.length ; i++){
        document.getElementById(random[i]).classList.remove("valid");
        document.getElementById(random[i]).classList.add("bomb");
    }
    for(let i = 0 ; i <= 99 ; i++){
        let data = neighbourhood(i);
        document.getElementById(i).setAttribute("data", data);
    }
    document.getElementById("flagsLeft").innerHTML = flag;
}
createGrid();
function rightClick(event){
    event.preventDefault();
    let rightClickedCell = event.target;    
    if(rightClickedCell.classList.contains("flag")){
            rightClickedCell.classList.remove("flag");
            rightClickedCell.innerHTML = '';
            flag++;
            document.getElementById("flagsLeft").innerHTML = flag;
    }
    else if(flag > 0){
        rightClickedCell.innerHTML = '🚩';
        rightClickedCell.style.color = "red";
        flag--;
        document.getElementById("flagsLeft").innerHTML = flag;
        rightClickedCell.classList.add("flag"); 
        if(flag == 0){
            let tempFlag = true;
            document.querySelectorAll(".flag").forEach((cell)=>{
                let temp = parseInt(cell.getAttribute("id"));
                if(random.includes(temp) == false)
                    tempFlag = false;
            })
            if(tempFlag){
                document.getElementById("result").innerHTML = "YOU WIN!";
                document.getElementById("result").style.color = "green";
                document.querySelectorAll(".valid").forEach((cell) => cell.removeEventListener("click", leftClick) );
                document.querySelectorAll(".bomb").forEach((cell) => cell.removeEventListener("click", leftClick) );
                document.querySelectorAll(".valid").forEach((cell) => cell.removeEventListener("contextmenu", rightClick) );
                document.querySelectorAll(".bomb").forEach((cell) => cell.removeEventListener("contextmenu", rightClick) );        
            }
        }
    }
}
function neighbourhood(boxID){
    let c = 0;
    let arr = [];
    if(boxID == 0)
        arr = [1, 10, 11];
    else if(boxID == 9)
        arr = [-1, 9, 10];
    else if(boxID == 90)
        arr = [-9, -10, 1];
    else if(boxID == 99)
        arr = [-11, -10, -1];
    else if(boxID > 0 && boxID < 9)
        arr = [-1, 1, 9, 10, 11];
    else if(boxID > 90 && boxID < 99)
        arr = [-11, -10, -9, -1, 1];
    else if(boxID % 10 == 0 && boxID != 0 && boxID != 90)
        arr = [-9, -10, 1, 10 ,11];
    else if(boxID % 10 == 9 && boxID != 9 && boxID != 99)
        arr = [-11, -10, -1, 9, 10];
    else
        arr = [-11, -10, -9, -1, 1, 9, 10, 11];
    for(let i = 0 ; i < arr.length ; i++){
        if(random.indexOf(boxID+arr[i]) != -1)
            c++;
    }
    return c;
}
function leftClick(event){
    let clickedCell = event.target;
    let cellID = Number(clickedCell.getAttribute("id"));
    if(!random.includes(cellID)){
        points++;
        // clickedCell.style.removeProperty("background-image");
        clickedCell.classList.add("checked");
        clickedCell.innerHTML = clickedCell.getAttribute("data");
        clickedCell.style.color = "black";
    }
    else{
        document.querySelectorAll(".bomb").forEach((cell)=>{
            cell.classList.add("checked");
        })
        showBomb();
        document.getElementById("result").innerHTML = "YOU LOSE!";
        document.getElementById("result").style.color = "red";    
        document.querySelectorAll(".valid").forEach((cell) => cell.removeEventListener("click", leftClick) );
        document.querySelectorAll(".bomb").forEach((cell) => cell.removeEventListener("click", leftClick) );
        document.querySelectorAll(".valid").forEach((cell) => cell.removeEventListener("contextmenu", rightClick) );
        document.querySelectorAll(".bomb").forEach((cell) => cell.removeEventListener("contextmenu", rightClick) );
    }
    if(points == 90){
        document.getElementById("result").innerHTML = "YOU WIN!";
        document.getElementById("result").style.color = "green";
        document.querySelectorAll(".bomb").forEach((cell) => cell.removeEventListener("click", leftClick) );
        document.querySelectorAll(".bomb").forEach((cell) => cell.removeEventListener("contextmenu", rightClick) );
        showBomb();
    }
    clickedCell.removeEventListener("click", leftClick);
    clickedCell.removeEventListener("contextmenu", rightClick);
}
function randomFunc() {
    while(random.length < 10){
        var num = Math.floor(Math.random()*99+0);
        if(!random.includes(num))
            random.push(num);
    }
    console.log(random);
}
function showBomb(){
    for(var i = 0 ; i < 10 ; i++){
        document.getElementById(random[i]).innerHTML = '💣';
        document.getElementById(random[i]).style.backgroundSize = "30px 30px";
    }        
}
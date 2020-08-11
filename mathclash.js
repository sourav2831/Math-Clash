const rowSize = 8;
const colSize = 8;
const cells = [];
let currentSum = 0;
let target;
let score = 0;
const cellEl = document.querySelectorAll(".cell")
//console.log(cellEl)

function firstCell(){
    const arr = [];
    for(let i=0;i<colSize;i++){
        arr.push({selected:false,number:Math.ceil(Math.random()*9)});
    }
    cells.unshift(arr);

}

const interval = setInterval(()=>{
    if(cells.length == rowSize){

        clearInterval(interval);
        alert("game over")
        //document.querySelector("body")
        document.getElementById("board").classList.add("disabled")

        //console.log(document.querySelector("body"))
        return;
    }
    firstCell();
    //console.log(cells)
    render();
},5000);

function render(){
    for(let i=0;i<cells.length;i++){
        for(let j=0;j<cells[i].length;j++){
            const el = document.getElementById("cell"+i+j);
            el.innerText = cells[i][j].number;

            if(cells[i][j].number !== ""){
                el.classList.add("filledcell")
            }
            else if(el.classList.contains("filledcell")){
                el.classList.remove("filledcell")
            }

            if(cells[i][j].selected){
                //console.log(el)
                el.classList.add("greenselect")
            }
            else if(el.classList.contains("greenselect")){
                el.classList.remove("greenselect")
            }
        }

    }
}

const board = document.getElementById('board')
function initBoard(){

    for(let i=0;i<rowSize;i++){
        let rowEl = document.createElement('div');
        rowEl.classList.add('row')
        for(let j=0;j<colSize;j++)
        {
            let insideEl = document.createElement('div');
            insideEl.classList.add("cell");
            insideEl.setAttribute("id","cell"+i+j);
            insideEl.addEventListener("click",(event)=> handleClick(event,i,j,insideEl));
            rowEl.appendChild(insideEl);
        }
        board.appendChild(rowEl);
    }

}

initBoard();
initTarget();
initCurrentSum();
initScore();

firstCell();
render();

function initTarget(){
    target = 5 + Math.ceil(Math.random()*50)
    document.getElementById("target").innerText = target;
    //console.log(typeof target)
}

function initCurrentSum(){
    document.getElementById("currentsum").innerText = currentSum;
}

function initScore(){
    document.getElementById("score").innerText = `score : ${score}`;
}

function handleClick(event,i,j,insideEl){
    //event.preventDefault();
    // if(i>= cells.length || j>=cells[i].length){
    //     return;
    // }
    //console.log(cells)
    if(cells[i][j].number === ""){
        return;
    }
    cells[i][j].selected = !cells[i][j].selected;

    insideEl.classList.add("greenselect")
    if(cells[i][j].selected){
        currentSum += cells[i][j].number
    }
    else{
        currentSum -= cells[i][j].number
    }

    if(currentSum > target){
        removeAllSelected();
        currentSum = 0;

    }
    else if(currentSum === target){

        const addScore = removeSelectedReplace();

        console.log(cells)
        score += addScore

        initScore();
        currentSum = 0;
        initTarget();


        shiftCells();



       console.log("after shift")
        //shiftCells();
        //console.log(cells);

    }
    initCurrentSum();
    render();

    if(removeEmptyRow()){
        cells.pop();
    }
    //console.log(event.target)
    //console.log('clicked',i,j)
}

function removeAllSelected(){
    for(let i=0;i<cells.length;i++){
        for(let j=0;j<cells[i].length;j++){
            if(cells[i][j].selected){
                cells[i][j].selected = false;
                //render();
            }
        }
    }
}

function removeSelectedReplace(){
    let count = 0;
    for(let i=0;i<cells.length;i++){
        for(let j=0;j<cells[i].length;j++){
            if(cells[i][j].selected){
                count++;
                cells[i][j].number = "";

                cells[i][j].selected = false;

                //console.log(cells[i][j],i,j)
                //render();


            }
        }
    }

    return count;
}

function shiftCells(){
    console.log(cells.length)
    for(let i=0;i<cells.length;i++){
        for(let j=0;j<cells[i].length;j++){
            if(cells[i][j].number === ""){
                //console.log(cells[i][j])
                for(let i1 = i+1;i1<cells.length;i1++){
                    //console.log(i1,j)
                    if(cells[i1][j].number !== ""){
                        //console.log(cells[i1][j])
                        //let temp =
                        cells[i][j].number = cells[i1][j].number
                        cells[i1][j].number = ""
                        break
                    }
                }
            }
        }
    }
    console.log("i am exiting")
    //render();
}

function removeEmptyRow(){
    let row = cells.length - 1
    let cnt = 0
    flag = true
    for(let i=0;i<cells[0].length;i++){
        if(cells[row][i].number === '' ){
            cnt++;
        }
        else{
            return false;

        }
    }
    return true

}

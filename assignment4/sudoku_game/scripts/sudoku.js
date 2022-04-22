let gameValues = [[-1,6,-1,3,-1,-1,8,-1,4],[5,3,7,-1,9,-1,-1,-1,-1],[-1,4,-1,-1,-1,6,3,-1,7],[-1,9,-1,-1,5,1,2,3,8],[-1,-1,-1,-1,-1,-1,-1,-1,-1], 
                  [7,1,3,6,2,-1,-1,4,-1], [3,-1,6,4,-1,-1,-1,1,-1], [-1,-1,-1,-1,6,-1,5,2,3], [1,-1,2,-1,-1,9,-1,8,-1]]

window.onload = function() {

    var cleanedNum = -1;
    var tableBoard = document.getElementById("board");
    
    //gameboard creation
    for (let i = 1; i <= 9; i++) {
        var row = document.createElement("tr");
        row.className = "board-row"
        
        for (let j = 1; j <= 9; j++) {
            var cell = document.createElement("td");
            cell.className = "board-cell";
            cell.setAttribute("id", "cell" + i + j);
            cell.textContent = gameValues[i-1][j-1];
            row.appendChild(cell);
        }
        tableBoard.appendChild(row);     
    }
    validateNums();

    var undoState = tableBoard.innerHTML;

    //get elements
    var pickers = document.getElementsByClassName('picker-cell');
    var cells = document.getElementsByClassName('board-cell');

    //creating event handlers
    var pickerHandler = function() {
        if(this.id == "btnUndo") {
            tableBoard.innerHTML = undoState;
            for (let i = 0; i < cells.length; i++) {
                cells[i].addEventListener('click', cellsHandler, false);
            }
            validateNums();
        } else {
            cleanSelected();
            cleanedNum = this.textContent;
            this.style.backgroundColor = "#f2f2f2";
        }
    }
    var cellsHandler = function() {
        if (cleanedNum != -1) {
            undoState = tableBoard.innerHTML;
            this.textContent = cleanedNum;
            cleanedNum = -1;
            validateNums()
        }
    }

    //assigning event handler to cells
    for (let i = 0; i < pickers.length; i++) {
        pickers[i].addEventListener('click', pickerHandler, false);
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', cellsHandler, false);
    }

}
//check for conflicts and deal with
function validateNums(){
    var tableBoard = document.getElementById('board');
    var elements = document.getElementsByClassName("board-cell"); //since cells taken went with elements instead

    cleanSelected();

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent === "-1") {
            elements[i].style.fontSize = "0";
        } else {
            elements[i].style.fontSize = "115%";
        }
        
    }

    //check rows for conflicts
    var badRow = [];
    var row, rows = tableBoard.rows;
    var cell, cells;
    for (let i = 0; i < rows.length; i++) {
        row = rows[i];
        cells = row.cells;
        for (let j = 0; j < cells.length; j++) {
            cell = cells[j];
            //compare the cell to each cell in the same row
            for (let k = 0; k < cells.length; k++) {
                if(k != j && sameElement(cells[k], cell)){
                    badRow.push(cells[k]);        
                }
            }        
        }       
    }

    //check columns for conflicts
    var badCol = [];
    for (let i = 0; i < elements.length / 9; i++) {
        for (let j = 0; j < elements.length; j += 9) {
            for (let k = 0; k < elements.length; k += 9) {
                if(k != j && sameElement(elements[k+i], elements[j+i])){
                    badCol.push(elements[k+i]);         
                }     
            }
        }
    }

    //check boxes for conflicts
    var badBox = []
    var boxCount = 1;
    for (let i = 0; i < elements.length; i += 3) {
        var cellCount = 1;
        for (let j = 0; j < elements.length / 3; j++) {
            var cellCountCheck = 1;
            for (let k = 0; k < elements.length / 3; k++) {

                if(j != k && sameElement(elements[k+i], elements[j+i])){
                    badBox.push(elements[k+i]);
                }  
                //if first row checked move on
                if(cellCountCheck % 3 == 0){
                    k += 6;
                }
                cellCountCheck += 1;
            }
            // if first row checked move on
            if(cellCount % 3 == 0){
                j += 6;
            }
            cellCount += 1;
        }
        //if first box checked move on
        if(boxCount % 3 == 0){
            i += 18;
        }
        boxCount += 1;
    }

    for (let i = 0; i < elements.length; i++) {
        //if error
        if(badRow.includes(elements[i]) || badCol.includes(elements[i]) || badBox.includes(elements[i])){
            elements[i].style.backgroundColor = "#f76c5e";
        } else {
            elements[i].style.backgroundColor = null;
        }
        
    }

}

//equivalence check
function sameElement(x1, x2) {
    if (x1.textContent != '-1' || x2.textContent != '-1') {
        return x1.textContent == x2.textContent;
    } else {
        return false;
    }
 }

// clean the cell
function cleanSelected() {
    var pickers = document.getElementsByClassName('picker-cell');
    for (let i = 0; i < pickers.length; i++) {
        pickers[i].style.backgroundColor = null;    
    }
 }
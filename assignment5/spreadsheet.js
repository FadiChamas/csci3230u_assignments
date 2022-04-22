window.onload = function () {
    var cells = document.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = backgroundThis;
    }
    var headers = document.getElementsByTagName("th");
    for(var i = 0; i < headers.length; i++){
        if(headers[i].id == 'rowHead') {
            headers[i].onclick = backgroundRow;
        }
    }
    for(var i = 0; i < headers.length; i++){
        if(headers[i].id == 'colHead') {
            headers[i].onclick = backgroundColumn;
        }
    }
}

function backgroundThis() {
    cleanCells();
    this.style.backgroundColor = '#e0e0ff';
}

function backgroundRow() {
    cleanCells();
    for(var i = 1; i < this.parentElement.children.length; i++){
        this.parentElement.children[i].style.backgroundColor = '#e0e0ff';
    }
}

function backgroundColumn() {
    var rows = document.getElementsByTagName("tr");
    var index = getRow(this);
    cleanCells();
    for(var i = 1; i < rows.length; i++){
        rows[i].children[index].style.backgroundColor = '#e0e0ff';
    }
}

function getRow(indice) {
    var i = 0;
    while (indice = indice.previousSibling) {
        if (indice.nodeType == 1) { 
            ++i 
        }
    }
    return i;
}

function cleanCells() {
    var rows = document.getElementsByTagName("tr");
    for(var i = 1; i < rows.length; i++){
        for(var j = 1; j < rows[i].children.length; j++){
            rows[i].children[j].style.backgroundColor = 'white';
        }
    }
}
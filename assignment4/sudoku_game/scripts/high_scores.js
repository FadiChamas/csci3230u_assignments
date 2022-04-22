let values = [{"date": "2022/01/07", "duration": "2:49"}, {"date": "2022/01/18", "duration": "5:51"},{"date": "2022/02/01", "duration": "4:25"},
              {"date": "2022/02/15", "duration": "8:34"}, {"date": "2022/03/02", "duration": "9:13"}]

window.onload = function() {
    var valueTable = document.getElementById("scoretable");

    for (let i = 0; i < values.length; i++) {
        var row = document.createElement("tr");
        row.classname = "score";
        for (let j = 0; j < 2; j++) {
            var value = document.createElement("td");
            value.className = "data";
            if (j==0) {
                value.textContent = values[i].date;
            }
            else {
                value.textContent = values[i].duration;
            }
            row.appendChild(value);
        }
        valueTable.appendChild(row);
    }
}
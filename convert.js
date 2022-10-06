var fs = require("fs")

function Initialize() {
    const tbodyRef = document.getElementById('output').getElementsByTagName('tbody')[0];
    readTextFile("./units.json", function(text){
        const units = JSON.parse(text);
        units.map((unit, i) => {
            const newRow = tbodyRef.insertRow()
            const newCell = newRow.insertCell()
            const newText = document.createTextNode(unit.name + ": ")
            newCell.appendChild(newText)
            const row = tbodyRef.rows[i]
            const valCell = row.insertCell()
            const valText = document.createTextNode("0")
            valCell.appendChild(valText)
            valCell.setAttribute("id", `unit${i}`)
            row.setAttribute("class", "OutputRow")
        }
    );
    
})}
function Calc() {
    readTextFile("./units.json", function(text) {
        const units = JSON.parse(text);        
        units.map((unit, i) => {
        const value = () => {
            switch (document.getElementById('unit').value) {
                case 'cm':
                  return (document.getElementById("value").value / 100) / unit.size;
                case 'm':
                  return (document.getElementById('value').value) / unit.size;
                case 'km':
                  return (document.getElementById('value').value * 1000) / unit.size;
            }
        };
        document.getElementById(`unit${i}`).innerHTML = value().toFixed(10)
        }
        );
    })
}

function AddUnit() {
    var newUnits = ""
    readTextFile("./units.json", function(text) {
        newUnits = JSON.parse(text);
        const nameIn = document.getElementById("nameIn").value
        const sizeIn = (+document.getElementById("sizeIn").value)
        if (nameIn != "" && sizeIn != 0/* && JSON.stringify(newUnits).indexOf(nameIn) == -1*/) {
            newUnits = newUnits.concat({name: "in " + nameIn, size: sizeIn})
            console.log(newUnits)
            var write = JSON.stringify(newUnits)
            fs.writeFile("units.json", write, function(err, result) {
                if(err) console.log("error", err)
            })
            location.reload()
        }
    }
)}

function Delete() {
    var DelUnits  = ""
    readTextFile("./units.json", function(text) {
        DelUnits = JSON.parse(text);
        DelUnits = DelUnits.slice(0, DelUnits.length - 1)
        console.log(DelUnits)
        var write = JSON.stringify(DelUnits)
        fs.writeFile("units.json", write, function(err, result) {
            if(err) console.log("error", err)
        })
        location.reload()
        }    
)}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

document.addEventListener("DOMContentLoaded", Initialize())
document.getElementById("enter").addEventListener("click", Calc)
document.getElementById("value").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("enter").click();
    }
})
document.getElementById("Test").addEventListener("click", AddUnit)
document.getElementById("Del").addEventListener("click", Delete)


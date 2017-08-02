$(document).ready(function(){
    $("#csv-file").change(handleFileSelect);
 
  });

var numOfPicks = 15;
var numOfRounds = 9;
var picked = false;
var same = false;
var names = [];
var comboRound = []
var CSV = [];


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function handleFileSelect(evt) {
	var file = evt.target.files[0];

	Papa.parse(file, {
		complete: function(results) {
			processChoices(results.data);
		}
	});
}

function processChoices(data){
	data.splice(0,1);
	for(var z = 0; z < numOfRounds; z++){
		//console.log(i);
		var round = [];
		studentList=shuffle(data);
		//console.log(studentList);
		round[0] = studentList[0][1];
		studentList[0].splice(1,1);
		for(var i = 1; i < studentList.length; i++){
			for(var x = 1; x < numOfPicks+1; x++){
				for(var y = 0; y<round.length; y++){
					if(studentList[i][x]!=round[y] && y==round.length-1 && studentList[i][x] !== undefined){
						y++;
						round[round.length]=studentList[i][x];
						//console.log(studentList[i]);
						studentList[i].splice(x,1);
						//console.log(studentList[i]);
						picked = true;
						break;
					}
					if(studentList[i][x]==round[y]){
						same=true;
						break;
					}
					if(picked == true){
						break;
					}
					else {
					picked=false;
					};
				}
				if(same==true){
					same=false;
				}
				if(picked == true){
						break;
				};

			}
			if(picked == true){
				picked = false;
			}
			else if(picked == false){
				round[round.length] = "BREAK";
			};
		};
		names = [];
		for(var i = 0; i<studentList.length; i++){
			names[i] = studentList[i][0];
		}

		
		for(var i = 0; i<names.length; i++){
			comboRound[i]=names[i]+ ': ' + round[i];
	}


		CSV.push(comboRound);
				//console.log(round);
				console.log(comboRound);

		comboRound = [];
	}


	var finalCSV = Papa.unparse(CSV);
	var outputString = "data:text/csv;charset=utf-8,";
	outputString += finalCSV;
	var encodedUri = encodeURI(outputString);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "JobFairProcessed.csv");
	document.body.appendChild(link);
	link.click();

	
//console.log(data);
}





//console.log(studentList);
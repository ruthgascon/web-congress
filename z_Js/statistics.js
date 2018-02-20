////////////////*CREATING GENERAL VARIABLES*////////////////
var members = data.results[0].members;
var dataType = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');

///////////////////////*FIRST TABLE*///////////////////////
//Get elements by party

var totalMembers = 0;
var membersDem = [];
var percentDem = 0;
var membersRep = [];
var percentRep = 0;
var membersInd = [];
var percentInd = 0;

for (var i=0;i<members.length;i++){
	totalMembers ++;
	if (members[i].party == "D"){
		membersDem.push(members[i].first_name);
		percentDem+=(Number(members[i].votes_with_party_pct));
	} else if (members[i].party == "R"){
		membersRep.push (members[i].first_name);
		percentRep += (Number(members[i].votes_with_party_pct));
	} else if (members[i].party == "I") {
		membersInd.push(members[i].first_name);
		percentInd += (Number(members[i].votes_with_party_pct));
	}
};

///////////////////*PERCENTAGE CALC%*///////////////////
var finalPercen

function calPercentage (percen, value){
	finalPercen = Math.round((value*percen)/100);
};

calPercentage (10,members.length);

////////////////*CALCULATE LESS VOTED*///////////////
var finalArrayLeast = [];
var finalArrayLeast2 = [];
var membersOrdMenosMas = members;
var property;

// función para ordenar de menor a mayor
function dynamicSortMenosMas(property) {
	return function (a,b) {
		return a[property]-b[property];
	}
};

//según pathname, coger unos datos u otros para ordenar
if (dataType == "attendance_senate.html" || dataType == "attendance_house.html") {
	property = "missed_votes_pct";
	membersOrdMenosMas.sort(dynamicSortMenosMas(property));
} else {
	property = "votes_with_party_pct";
	membersOrdMenosMas.sort(dynamicSortMenosMas(property));
};

// ordenar teniendo en cuenta el porcentaje
function ordenarFinalMenosMas (){
	var arrayNuevo = [];
	for (var i=0; i<membersOrdMenosMas.length; i++){
		if (arrayNuevo.length < finalPercen){
			arrayNuevo.push (membersOrdMenosMas[i]);
		} else {
			if (membersOrdMenosMas[i][property] === arrayNuevo[arrayNuevo.length-1][property]){
				arrayNuevo.push (membersOrdMenosMas[i]);
			}
		}
	}
	return arrayNuevo;
}

finalArrayLeast=ordenarFinalMenosMas();
finalArrayLeast2=ordenarFinalMenosMas();

////////////////*CALCULATE MORE VOTED*///////////////
//ORDENAR VALORES DE MAS A MENOS
var finalArrayMore = [];
var finalArrayMore2 = [];
var membersOrdMasMenos = members;

// función para ordenar de mayor a menor
function dynamicSortMasMenos(property) {
	return function (a,b) {
		return b[property]-a[property];
	}
};

//según pathname, coger unos datos u otros para ordenar
if (dataType == "attendance_senate.html" || dataType == "attendance_house.html") {
	property = "missed_votes_pct";
	membersOrdMasMenos.sort(dynamicSortMasMenos(property));
} else {
	property = "votes_with_party_pct";
	membersOrdMasMenos.sort(dynamicSortMasMenos(property));
};

//quedarnos con ciertos valores segun porcentaje
function ordenarFinalMasMenos (){
	var arrayFinalMasMenos = [];
	for (var i=0; i<membersOrdMasMenos.length; i++){
		if (arrayFinalMasMenos.length < finalPercen){
			arrayFinalMasMenos.push (membersOrdMasMenos[i]);
		} else {
			if (membersOrdMasMenos[i][property] === arrayFinalMasMenos[arrayFinalMasMenos.length-1][property]){
				arrayFinalMasMenos.push (membersOrdMasMenos[i]);
			}
		}
	}
	return arrayFinalMasMenos;
}

finalArrayMore=ordenarFinalMasMenos();
finalArrayMore2=ordenarFinalMasMenos();

//////////////////*VAR STATISTICS*//////////////////
var statistics = {
	numDem: membersDem.length,
	numRep: membersRep.length,
	numInd: membersInd.length,
	avDem: percentDem / membersDem.length,
	avRep: percentRep / membersRep.length,
	avInd: percentInd / membersInd.length,
	leastVotes: finalArrayLeast,
	leastVotesAtt: finalArrayLeast2,
	mostVotes: finalArrayMore,
	mostVotesAtt: finalArrayMore2,
};

///////////////*INSERT DATA FIRST TABLE*///////////////
tdRep.insertCell().innerHTML = statistics.numDem;
tdRep.insertCell().innerHTML = statistics.avDem.toFixed(2);

tdDem.insertCell().innerHTML = statistics.numRep;
tdDem.insertCell().innerHTML = statistics.avRep.toFixed(2);

tdInd.insertCell().innerHTML = statistics.numInd;
tdInd.insertCell().innerHTML = statistics.avInd.toFixed(2);

tdTotal.insertCell().innerHTML = statistics.numDem + statistics.numRep + statistics.numInd;
tdTotal.insertCell().innerHTML = ((Number(statistics.avDem.toFixed(2)) + Number (statistics.avRep.toFixed(2)) + Number (statistics.avInd.toFixed(2)))/3).toFixed(2);

///*INSERT DATA SECOND AND THIRD TABLE PARTY LOYALTY*//
var table2 = document.getElementById("secondTable");
var table3 = document.getElementById("thirdTable");

function LeastMoreInsert (property,tableX,dataVotes){
	for (var i = 0; i<property.length; i++){
		var row = tableX.insertRow();
		var senator = property[i];
		row.insertCell().innerHTML = senator.last_name + ", " + senator.first_name + " " + (senator.middle_name || "");
		row.insertCell().innerHTML = Math.round(((senator.total_votes - senator.missed_votes) * senator[dataVotes]) / 100);
		row.insertCell().innerHTML = senator[dataVotes];
	}
};

if (dataType == "attendance_senate.html" || dataType == "attendance_house.html") {
	LeastMoreInsert((statistics.leastVotesAtt),table2,"missed_votes_pct");
	LeastMoreInsert((statistics.mostVotesAtt),table3,"missed_votes_pct");
} else {
	LeastMoreInsert((statistics.leastVotes),table2,"votes_with_party_pct");
	LeastMoreInsert((statistics.mostVotes),table3,"votes_with_party_pct");
};
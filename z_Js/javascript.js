///////////////////GET JSON////////////////////
$(document).ready(function() {
	var members;
	var dataPage = window.location.pathname.split('/')[1];

	if (dataPage==="senate-page.html"){
		$.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/senate", insertAllData)
			.done (function(json){
			$("#loading").hide();
			$(".tableLoading").show();
			$(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
		}).fail (function (json){
			$("#loading").hide();
			$(".fail").show();
		});
	} else {
		$.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/house", insertAllData)
			.done (function(json){
			$("#loading").hide();
			$(".tableLoading").show();
			$(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
		})
	};

	////*CALL ALL THE FUNCTIONS TO INSERT DATA*////
	function insertAllData (data) {
		//MUSTACHE
		var template=$("#templateMustache").html();
		var dataResults = data.results[0];
		var convertedTemplate = Mustache.to_html(template,dataResults);
		$('#body-table').html(convertedTemplate);
		//MUSTACHE
		members = data.results[0].members;
		getNotRepeated();
		$("input[name='party']").on("change", updateInput);
		$("#FilterForm").on("change", updateInput);
	};

	/////////////////*GET STATES*/////////////////
	function getNotRepeated() {

		var formState = document.getElementById("checkboxState");
		var arrStates = [];

		for (var i = 0; i < members.length; i++) {
			if (!arrStates.includes(members[i].state)) {
				arrStates.push(members[i].state);
				arrStates.sort();
			}
		}

		for (var y = 0; y < arrStates.length; y++) {
			var newOption = document.createElement("option");
			formState.appendChild(newOption);
			newOption.innerHTML = arrStates[y];
		}
	}
});
//////////////////*CHECKBOX*//////////////////

function isIncluded(element, array) {
	return array.length === 0 || array.indexOf(element) != -1;
}

function updateInput(){
	var partiesSelected = $("input[name='party']:checked")
	.map(function () {
		return $(this).val();
	}).get();
	var state = $("#checkboxState").val();
	var states = state ? [state] : [];
	var input = $("#mySearchingInput").val();
	console.log ("input:" + input);
	$("#data tbody tr").each(function () {
		var valorTdName = $(this).find(".nameClass").text();
		valorTdName = valorTdName.toLowerCase();
		var valorTd = $(this).find(".partyClass").text();
		var rowIncludesParty = isIncluded(valorTd, partiesSelected);
		var state = $(this).find(".stateClass").text();
		var stateSelected = isIncluded(state, states);
		$(this).toggle(stateSelected && rowIncludesParty && valorTdName.includes(input));
	});
};
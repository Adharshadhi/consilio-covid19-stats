const updateDate = document.querySelector(".updatedate");
const confirmedText = document.querySelector(".confirmedtext");
const recoveredText = document.querySelector(".recoveredtext");
const activeText = document.querySelector(".activetext");
const deceasedText = document.querySelector(".deceasedtext");

//new cases
const newRecovered = document.querySelector(".newrecovered");
const newActive = document.querySelector(".newactive");
const newDeceased = document.querySelector(".newdeceased");

//statewise
const stateDetails = document.querySelector(".statedetails");

//newcases
function positiveOrNot(caseData) {
  let createdIcon = document.createElement("i");
  if (caseData.includes("-")) {
    createdIcon.classList.add("fas", "fa-arrow-down", "ml-2");
  } else {
    createdIcon.classList.add("fas", "fa-arrow-up", "ml-2");
  }
  return createdIcon;
}

fetch(
  "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true",
  {}
)
  .then((res) => res.json())
  .then((data) => {
    //Currentcases
    updateDate.textContent = data.lastUpdatedAtApify.split("T")[0];
    confirmedText.textContent = data.totalCases;
    recoveredText.textContent = data.recovered;
    activeText.textContent = data.activeCases;
    deceasedText.textContent = data.deaths;

    //Newcases
    newRecovered.textContent = data.recoveredNew;
    newRecovered.append(positiveOrNot(data.recoveredNew.toString()));
    if (data.recoveredNew.toString().includes("-")) {
      newRecovered.classList.add("negative");
    } else {
      newRecovered.classList.add("positive");
    }
    newActive.textContent = data.activeCasesNew;
    newActive.append(positiveOrNot(data.activeCasesNew.toString()));
    if (data.activeCasesNew.toString().includes("-")) {
      newActive.classList.add("positive");
    } else {
      newRecovered.classList.add("negative");
    }
    newDeceased.textContent = data.deathsNew;
    newDeceased.append(positiveOrNot(data.deathsNew.toString()));
    if (data.deathsNew.toString().includes("-")) {
      newDeceased.classList.add("positive");
    } else {
      newDeceased.classList.add("negative");
    }

    //chart

    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Confirmed", "Recovered", "Active", "Deceased"],
        datasets: [
          {
            label: "Number of cases",
            data: [
              data.totalCases,
              data.recovered,
              data.activeCases,
              data.deaths,
            ],
            backgroundColor: ["#cd113b", "#66de93", "#185adb", "#171717"],
            borderColor: [],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    //state wise
    data.regionData.forEach((stateUT) => {
      let stateName = document.createElement("td");
      let stateConfirmed = document.createElement("td");
      let stateRecovered = document.createElement("td");
      let stateActive = document.createElement("td");
      let stateDeceased = document.createElement("td");
      let newRow = document.createElement("tr");

      stateName.textContent = stateUT.region;
      stateConfirmed.textContent = stateUT.totalInfected;
      stateRecovered.textContent = stateUT.recovered;
      stateActive.textContent = stateUT.activeCases;
      stateDeceased.textContent = stateUT.deceased;

      newRow.append(
        stateName,
        stateConfirmed,
        stateRecovered,
        stateActive,
        stateDeceased
      );
      stateDetails.append(newRow);
    });
  });

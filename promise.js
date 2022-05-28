let usersTable = document.getElementById("usersTable");

const getUserData = async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");

    return response.json();
};

getUserData().then((result) => {
    let userDataTitles = Object.keys(result[0]);
    console.log(result);
    for (let title of userDataTitles) {
        let dataTitle = document.createElement("th");
        dataTitle.textContent = title.charAt(0).toUpperCase() + title.slice(1);
        usersTable
            .getElementsByTagName("thead")[0]
            .getElementsByTagName("tr")[0]
            .appendChild(dataTitle);
    }

    for (let i in result) {
        let resultRow = document.createElement("tr");
        //address data per user that is nested inside the response
        let addressData = `${result[i].address.suite} ${result[i].address.street} ${result[i].address.zipcode} ${result[i].address.city}. Lat:${result[i].address.geo.lat} Longitude:${result[i].address.geo.lng} `;
        //company data per user that is nested inside the response
        let companyData = `${result[i].company.name} , ${result[i].company.bs} , ${result[i].company.catchPhrase} `;
        usersTable.getElementsByTagName("tbody")[0].appendChild(resultRow);

        for (let key in result[i]) {
            let resultField = document.createElement("th");
            if (key === "address") {
                resultField.textContent = addressData;
            } else if (key === "company") {
                resultField.textContent = companyData;
            } else {
                resultField.textContent = result[i][key];
            }

            usersTable
                .getElementsByTagName("tbody")[0]
                .getElementsByTagName("tr")
                [i].appendChild(resultField);
        }
    }
});

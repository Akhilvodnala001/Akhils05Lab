const apiKey = 'AIzaSyCW4lLdUoMeITBgFPjh-MMbQj0KjMjFDzU';  // Replace with your API key
const sheetId = '1UrpZu29QrS-P965zII2o44LBC9qNlhnarl8A6Hu_DyE';  // Replace with your Google Sheet ID
const sheetName = 'Sheet1';  // Your sheet name

const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: sheetURL,
        dataType: "json",
        success: function (response) {
            // Convert CSV response to objects using jQuery-CSV plugin
            var data = response.values.slice(1); // Remove header row

            // Reverse data to show latest first
            data = data.reverse();

            // Process up to 60 rows
            const maxEntries = Math.min(data.length, 60);
            
            for (let i = 0; i < maxEntries; i++) {
                const row = data[i];
                const date = row[0] || 'Unknown';
                const time = row[1] || 'N/A';
                const cardID = row[2] || 'N/A';
                const name = row[3] || 'N/A';
                const rollNo = row[4] || 'N/A';
                const spo2 = row[5] || 'N/A';
                const pulse = row[6] || 'N/A';
                const temp = row[7] || 'N/A';

                // Create a profile card dynamically
                $('#profileContainer').append(`
                    <div class="profile">
                        <p>Name: <span>${name}</span></p>
                        <p>Date: <span>${date}</span></p>
                        <p>Time: <span>${time}</span></p>
                        <p>Card ID: <span>${cardID}</span></p>
                        <p>Roll No: <span>${rollNo}</span></p>
                        <p>SpO2: <span>${spo2}</span></p>
                        <p>Heart Rate: <span>${pulse}</span></p>
                        <p>Body Temperature: <span>${temp}</span></p>
                    </div>
                `);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching data:", error); // Log errors
        }
    });
});

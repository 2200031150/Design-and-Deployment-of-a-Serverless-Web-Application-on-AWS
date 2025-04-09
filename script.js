// Replace with your API Gateway URL
var API_ENDPOINT = "https://0f3h2rxkzf.execute-api.us-east-1.amazonaws.com/rithu";

// Save student data to DynamoDB
document.getElementById("savestudent").onclick = function () {
    var inputData = {
        "StudentID": $('#studentid').val(),
        "StudentName": $('#studentname').val(),
        "CourseCategory": $('#coursecategory').val(),
        "Course": $('#course').val(),
        "CourseFee": $('#coursefee').val(),
        "CourseStatus": $('input[name="coursestatus"]:checked').val(),
        "Duration": $('#duration').val(),
        "StartDate": $('#startdate').val(),
        "EndDate": $('#enddate').val(),
        "PaymentMethod": $('#paymentmethod').val(),
        "DownPayment": $('#downpayment').val(),
        "MonthlyInstallment": $('#monthlyinstallment').val(),
        "PaymentDate": $('#paymentdate').val()
    };

    $.ajax({
        url: API_ENDPOINT,
        type: 'POST',
        data: JSON.stringify(inputData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            alert("Student Data Saved Successfully!");
            $('#studentForm')[0].reset(); // clear the form
        },
        error: function () {
            alert("Error saving student data.");
        }
    });
};

// Optionally, get all students and show in a table (you can enhance this)
document.getElementById("getstudents").onclick = function () {
    $.ajax({
        url: API_ENDPOINT,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#studentTable tr').slice(1).remove(); // Clear old rows
            jQuery.each(response, function (i, data) {
                $("#studentTable").append("<tr> \
                    <td>" + data['StudentID'] + "</td> \
                    <td>" + data['StudentName'] + "</td> \
                    <td>" + data['Course'] + "</td> \
                    <td>" + data['PaymentMethod'] + "</td> \
                </tr>");
            });
        },
        error: function () {
            alert("Error retrieving student data.");
        }
    });
};

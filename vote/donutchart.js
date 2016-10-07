$(function () {
    var radiobtn1 = document.getElementById("off");
    var radiobtn2 = document.getElementById("on");

    if (radiobtn1.checked == true) {
        //alert("offがチェックされています。");
    } else if (radiobtn2.checked == true) {
        //alert("onがチェックされています。");
    }

    var know;
    know = Math.floor(Math.random() * 100) + 1;
    var dontknow = 100 - know;
    var percent = document.getElementById("percent");
    percent.innerHTML = "みんなの理解度は " + know + " %";
    var doughnutData = [
        {
            value: know,
            color: "#fbaa6e"
            },
        {
            value: dontknow,
            color: "#aaf2fb"
            }
        ];
    var myDoughnut = new Chart(document.getElementById("ugCanvas").getContext("2d")).Doughnut(doughnutData);


    $("#btnng,#btnok").on('click', function () {
        know = Math.floor(Math.random() * 100) + 1;
        dontknow = 100 - know;
        percent.innerHTML = "みんなの理解度は " + know + " %";
        doughnutData = [
            {
                value: know,
                color: "#fbaa6e"
                },
            {
                value: dontknow,
                color: "#aaf2fb"
                }
            ];
        myDoughnut = new Chart(document.getElementById("ugCanvas").getContext("2d")).Doughnut(doughnutData);
    });
});

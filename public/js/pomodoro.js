var pomodoro = function (timeInMins) {

    var timeInMS = parseInt(timeInMins)*60*1000;
    var remainingMS = timeInMS;
    var timerEnded = function () {
        alert("25 Minute Tomato Complete");
    };
    var displayCountDown = function(){

        remainingMS = remainingMS - 1000;

        var remainingSeconds = remainingMS / 1000;

        var minutes = parseInt( remainingSeconds / 60 ); // 60 seconds in 1 minute

        var seconds = remainingSeconds % 60;
        document.getElementById("timeLeft").innerHTML = minutes + "m " + seconds + "s";

        if (remainingMS < 0) {
            clearInterval(displayCountDown);
            document.getElementById("timeLeft").innerHTML = "25 Minute Tomato Complete";
        }
    };

    var startTimer = function (){
        setTimeout(timerEnded, timeInMS);
        setInterval(displayCountDown,1000);
    };


    return {
        startTimer: startTimer
    }
}(1);
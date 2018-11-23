var battleship = function (numOfShips) {
    var shipsList = [],
        numOfGuesses = 0,
        takenLocations = [],
        shipCount = 0,
        userShipsList = [],
        userTakenLocations = [],
        userShipCount = 0,
        pastComputerGuess = [],

    //Ship Object
        ship = function () {
            var shipName,
                locationCells;

            function checkYourself(userGuess) {
                var index = locationCells.indexOf(userGuess.toLowerCase()),
                    result;
                if (index !== -1) {
                    locationCells.splice(index, 1);
                    result = 'Hit!';
                    if (locationCells.length === 0) {
                        result = 'Hit and Kill!';
                    }
                } else {
                    result = 'Miss';
                }
                return result;
            }

            function setName(name) {
                shipName = name;
            }

            function getName() {
                return name;
            }

            function setLocationCells(location) {
                console.log(location);
                if (typeof location === 'object' && location.length > 2) {
                    locationCells = location;
                } else {
                    console.log('The location (' + location + ') of: ' + this + ' was not set correctly');
                }
            }

            function getLocationCells() {
                return locationCells;
            }

            return {
                setName: setName,
                getName: getName,
                setLocationCells: setLocationCells,
                getLocationCells: getLocationCells,
                checkYourself: checkYourself
            }
        },

    //Game Set Up
        gameSetUp = function (numOfShips) {
            var i, j, shipObject, len, shipSize, enemyNumOfShips, userNumOfShips;
            if (numOfShips > 0) {
                userNumOfShips = enemyNumOfShips = numOfShips / 2;
                for (i = 0; i < enemyNumOfShips; i++) {
                    shipObject = ship();
                    shipObject.name = 'shipNumber_' + (i + 1);
                    shipsList.push(shipObject);
                }
                len = shipsList.length;
                for (j = 0; j < len; j++) {
                    shipSize = randomIntFromInterval(3, 5);
                    shipsList[j].setLocationCells(placeShip(shipSize, shipCount, takenLocations));

                }
                for (j = 0; j < userNumOfShips; j++) {
                    shipObject = ship();
                    shipObject.name = 'shipNumber_' + (i + 1);
                    userShipsList.push(shipObject);
                }
                len = userShipsList.length;
                for (j = 0; j < len; j++) {
                    shipSize = randomIntFromInterval(3, 5);
                    userShipsList[j].setLocationCells(placeShip(shipSize, userShipCount, userTakenLocations));

                }
                placeUserShipsOnGrid();
            } else {
                alert('Please enter a number of ships greater than zero')
            }
        },

    //returns an array of letter number coordinates for a ship e.g [G2, G3, G4]
        placeShip = function (shipSize, currentShipCount, currentTakeLocations) {
            var gridLength = 7,
                gridSize = 49,
                alphabet = 'abcdefg',
                success = false,
                alphaCells = [],
                coordinates = [],
                x = 0,
                attempts = 0,
                y = 0,
                location, row, column, increment;

            currentShipCount += 1;
            increment = 1;
            if ((currentShipCount % 2) == 1) {
                increment = gridLength;
            }

            while (!success & attempts < 200) {
                location = randomIntFromInterval(1, 49);
                success = true;
                x = 0;
                while (success && x < shipSize) {
                    if (currentTakeLocations.indexOf(location) === -1) {
                        coordinates[x++] = location;
                        location += increment;
                        if (location >= gridSize) {
                            success = false;
                        }
                        if (x > 0 && (location % gridLength == 0)) {
                            success = false;
                        }
                    } else {
                        success = false;
                    }

                }

            }

            while (y < shipSize) {
                currentTakeLocations.push(coordinates[y]);
                row = Math.floor(coordinates[y] / gridLength);
                column = alphabet.charAt(coordinates[y] % gridLength);
                alphaCells.push(column + row);
                y++;
            }
            return alphaCells;
        },

    //return random whole number between min and max
        randomIntFromInterval = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

    //Takes in user's guess and prints to screen the result
        checkUsersGuess = function (userGuess) {
            if (userGuess && document.getElementById(userGuess.toLowerCase())) {
                var i,
                    len = shipsList.length,
                    result = 'Miss',
                    domElement = document.getElementById(userGuess.toLowerCase());
                numOfGuesses++;

                for (i = 0; i < len; i++) {
                    result = shipsList[i].checkYourself(userGuess);

                    if (result === 'Hit!') {
                        domElement.style.backgroundColor = "#FF6666";
                        domElement.innerHTML = 'HIT!';
                        break;
                    }
                    if (result === 'Hit and Kill!') {
                        domElement.style.backgroundColor = "#FF6666";
                        domElement.innerHTML = 'Ship Dead!';
                        shipsList.splice(i, 1);
                        if(shipsList.length === 0){
                            document.getElementById('outcome').innerHTML = 'GAME OVER YOU WIN!';
                        }
                        break;
                    }
                }
                if (result === 'Miss') {
                    domElement.style.backgroundColor = "#939393";
                    domElement.innerHTML = 'MISS!';
                }
                domElement.style.borderRadius = "75px";
                domElement.onclick = null;
                fireComputersGuess();
            }
        },

        checkComputersGuess = function(computersGuess) {
            if (computersGuess && document.getElementById(computersGuess.toLowerCase()+'u')) {
                var i,
                    len = userShipsList.length,
                    result = 'Miss',
                    domElement = document.getElementById(computersGuess.toLowerCase()+'u');

                for (i = 0; i < len; i++) {
                    result = userShipsList[i].checkYourself(computersGuess);

                    if (result === 'Hit!') {
                        domElement.style.backgroundColor = "#FF6666";
                        domElement.innerHTML = 'HIT!';
                        break;
                    }
                    if (result === 'Hit and Kill!') {
                        domElement.style.backgroundColor = "#FF6666";
                        domElement.innerHTML = 'Ship Dead!';
                        userShipsList.splice(i, 1);
                        if(userShipsList.length === 0){
                            document.getElementById('outcome').innerHTML = 'GAME OVER COMPUTER WINS!'
                        }
                        break;
                    }
                }
                if (result === 'Miss') {
                    domElement.style.backgroundColor = "#939393";
                    domElement.innerHTML = 'MISS!';
                }
                domElement.style.borderRadius = "75px";
            }
        },

        placeUserShipsOnGrid = function() {
            var len = userShipsList.length, i, shipLocation, len2, j;
            for (i = 0; i < len; i++) {
                debugger
                shipLocation = userShipsList[i].getLocationCells();
                len2 = shipLocation.length;
                for (j = 0; j < len2; j++) {
                    document.getElementById(shipLocation[j] + 'u').style.backgroundColor = "#00FF00";
                }
            }
        },

        fireComputersGuess = function() {
            var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
                row = randomIntFromInterval(0,6),
                column = alphabet[randomIntFromInterval(0,6)],
                guess = column + row;
            if(pastComputerGuess.indexOf(guess) === -1) {
                pastComputerGuess.push(guess);
                checkComputersGuess(guess);
            } else {
                fireComputersGuess();
            }
        }


    // Start Game
    gameSetUp(numOfShips);

    return {
        gameSetUp: gameSetUp,
        checkUsersGuess: checkUsersGuess,
    }

}(6);


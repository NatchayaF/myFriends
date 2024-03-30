function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    const friendCountElement = document.getElementById("friendCount");
    friendCountElement.textContent = `Number of Friends: ${randomNumber}`;

    const friendInputsDiv = document.getElementById("friendInputs");
    friendInputsDiv.innerHTML = '';

    for (let i = 1; i <= randomNumber; i++) {
        const div = document.createElement("div");
        div.innerHTML = `
            <label for="nickname${i}">Friend ${i} Nickname:</label>
            <input type="text" id="nickname${i}">
            <label for="age${i}">Age:</label>
            <input type="number" id="age${i}" min="1" max="100">
            <br>
        `;
        friendInputsDiv.appendChild(div);
    }
    document.getElementById("functionButtons").style.display = "block";
}

document.getElementById('resetBtn').addEventListener('click', function () {
    const inputs = document.querySelectorAll('#friendInputs input[type="text"], #friendInputs input[type="number"]');
    for (const input of inputs) {
        input.value = ''; // Reset input values to empty
    }
});

document.getElementById('totalAgeBtn').addEventListener('click', function() {
    if (checkInputs()) {
        calculateTotalAge();
    }
});

document.getElementById('averageAgeBtn').addEventListener('click', function() {
    if (checkInputs()) {
        calculateAverageAge();
    }
});

document.getElementById('youngestFriendBtn').addEventListener('click', function() {
    if (checkInputs()) {
        calculateYoungestFriend();
    }
});

document.getElementById('oldestFriendBtn').addEventListener('click', function() {
    if (checkInputs()) {
        calculateOldestFriend();
    }
});

function checkInputs() {
    //querySelectorAll is choose DOM from element by condition
    const inputs = document.querySelectorAll('#friendInputs input[type="text"], #friendInputs input[type="number"]');
    let isAnyEmpty = false;
    for (const input of inputs) {
        if (!input.value.trim()) { //trim is cut head or tail
            isAnyEmpty = true;
            break;
        }
    }
    if (isAnyEmpty) {
        alert("Please complete all the fields");
        return false;
    }
    return true;
}

function calculateTotalAge() {
    if (!checkInputs()) return; // If there is any field empty, Stop working and dont cal
    let totalAge = 0;
    const inputs = document.querySelectorAll('#friendInputs input[type="number"]');
    for (const input of inputs) {
        totalAge += parseInt(input.value); //parseInt is tranform value for cal
    }
    alert(`Total Age: ${Math.floor(totalAge)}`);
}

function calculateAverageAge() {
    if (!checkInputs()) return; // Ensure all fields are complete
    let totalAge = 0;
    const inputs = document.querySelectorAll('#friendInputs input[type="number"]');
    for (const input of inputs) {
        totalAge += parseInt(input.value);
    }
    const averageAge = totalAge / inputs.length;
    alert(`Average Age: ${averageAge.toFixed(2)}`);
}

function calculateYoungestFriend() {
    if (!checkInputs()) return; // Ensure all fields are complete
    let youngestAge = Number.MAX_VALUE;
    let youngestFriends = [];
    const friendInputs = document.querySelectorAll('#friendInputs div');
    friendInputs.forEach(friendDiv => { // for loop every input
        const nicknameInput = friendDiv.querySelector('input[type="text"]');
        const ageInput = friendDiv.querySelector('input[type="number"]');
        const age = parseInt(ageInput.value);
        const name = nicknameInput.value;
        if (age < youngestAge) {
            youngestAge = age;
            youngestFriends = [{ name: name, age: age }];
        } else if (age === youngestAge) {
            youngestFriends.push({ name: name, age: age });
        }
    });
    let message = "";
    if (youngestFriends.length === 1) {
        message = `Youngest Friend: ${youngestFriends[0].name} \nAge: ${youngestFriends[0].age}`;
    } else {
        const names = youngestFriends.map(friend => friend.name).join(", ");
        message = `Youngest Friends: ${names} \nAge: ${youngestAge}`;
    }
    alert(message);
}

function calculateOldestFriend() {
    if (!checkInputs()) return; // Ensure all fields are complete
    let oldestAge = 0;
    let oldestFriends = [];
    const friendInputs = document.querySelectorAll('#friendInputs div');
    friendInputs.forEach(friendDiv => {
        const nicknameInput = friendDiv.querySelector('input[type="text"]');
        const ageInput = friendDiv.querySelector('input[type="number"]');
        const age = parseInt(ageInput.value);
        const name = nicknameInput.value;
        if (age > oldestAge) {
            oldestAge = age;
            oldestFriends = [{ name: name, age: age }];
        } else if (age === oldestAge) {
            oldestFriends.push({ name: name, age: age });
        }
    });
    let message = "";
    if (oldestFriends.length === 1) {
        message = `Oldest Friend: ${oldestFriends[0].name} \nAge: ${oldestFriends[0].age}`;
    } else {
        const names = oldestFriends.map(friend => friend.name).join(", ");
        message = `Oldest Friends: ${names} \nAge: ${oldestAge}`;
    }
    alert(message);
}

function showMessage() {
    const messageDiv = document.getElementById("messageDiv");
    messageDiv.textContent = "Click for Random Number";
}

function hideMessage() {
    const messageDiv = document.getElementById("messageDiv");
    messageDiv.textContent = "";
}

const heading = document.getElementById('heading');

// Change color when mouse enters
heading.addEventListener('mouseover', function() {
    this.style.color = '#E8A0BF';
});

// Change color back when mouse leaves
heading.addEventListener('mouseout', function() {
    this.style.color = ''; //change to default color
});

heading.addEventListener('dblclick', function() {
    this.style.fontSize = '36px'; // Change font size to 36px
});

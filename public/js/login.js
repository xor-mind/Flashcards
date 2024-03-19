// document.getElementById('registerForm').addEventListener('submit', function(e) {
//     e.preventDefault();

//     const username = document.getElementById('registerUsername').value;
//     const password = document.getElementById('registerPassword').value;
//     const email = document.getElementById('registerEmail').value;

//     fetch('/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, email }),
//     })
//     .then(response => response.text())
//     .then(data => {
//         alert(data);
//         // Handle login redirection or UI update here
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// });

document.getElementById('loginForm').addEventListener('submit', function(e) 
{
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/login',
    {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({username, password}),
    })
    .then(response => response.json())
    .then(data => 
        { 
            localStorage.setItem('jwtToken', data.token);
            console.log("login successful!");
        })
    .catch(error => { console.error('Error:', error); });

});


// document.getElementById('authTestButton').addEventListener('click', function() 
// {
//     const token = localStorage.getItem('jwtToken');

//     if (!token)
//     {
//         console.error("there is no jwtToken!");
//         return;
//     }

//     const url = '/some-protected-route'; // Adjust the URL/port as necessary
//     const options = {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${token}` // Replace YOUR_JWT_TOKEN_HERE with your actual token
//         }
//     };

//     fetch(url, options)
//         .then(response => {
//             if (response.ok) {
//                 return response.text();
//             }
//             throw new Error('Network response was not ok.');
//         })
//         .then(data => {
//             console.log(data);
//             alert(data); // Display the response in an alert box (or handle as needed)
//         })
//         .catch(error => {
//             console.error('There has been a problem with your fetch operation:', error);
//         });
// });



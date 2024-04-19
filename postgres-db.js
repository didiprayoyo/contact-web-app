// use postgres db
const { Pool } = require('pg');
const dotenv = require('dotenv');
// load environment variables from .env file
dotenv.config();

// create a new postgres pool
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
// connect to the database
pool.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database!');
    })
    .catch((err) => {
        console.log('Error connecting to PostgreSQL database:', err);
    });


// GAJADIII, lgsg query aja

// {
// const contacts = [
//     ['Naruto', '08123456789', 'naruto@gmail.com'],
//     ['Sasuke', '0898765432', 'sasuke@gmail.com'],
//     ['Sakura', '08123456789', 'sakura@gmail.com']
// ];

// // Add data
// const addContact = (newContact) => {
//     return new Promise((resolve, reject) => {
//         pool.query('INSERT INTO contacts (name, mobile, email) VALUES ($1, $2, $3)', [...newContact])
//             .then(() => {
//                 console.log('Data inserted successfully.');
//                 resolve(); // untuk res.json() => tampilkan data inserted successfully
//             })
//             .catch((err) => {
//                 console.error('Error inserting data:', err);
//                 reject(false);
//             });
//     });
// }

// // Read/load contacts, can also be used for check small amount of data and debug
// // return contacts in json format
// const readAllContacts = () => {
//     return new Promise((resolve, reject) => {
//         pool.query('SELECT * FROM contacts')
//             .then((result) => {
//                 console.log('Query result (read list):', result.rows);
//                 resolve(result.rows);
//             })
//             .catch((err) => {
//                 console.error('Error executing query:', err);
//                 reject(err);
//             });
//     });
// }

// // // Detail data
// // pool.query('SELECT * FROM contacts WHERE name=$1', [contacts[0][0]])
// //     .then((result) => {
// //         console.log('Query result (detail):', result.rows);
// //     })
// //     .catch((err) => {
// //         console.error('Error executing query:', err);
// //     });

// // Update data a contact by name (as primary key)
// const updateContact = (name) => {

//     pool.query('UPDATE contacts SET name=$1, mobile=$2, email=$3 WHERE name=$4', [...contacts[2], contacts[0][0]])
//         .then((result) => {
//             console.log('Query result (updated):', result.rows);
//         })
//         .catch((err) => {
//             console.error('Error executing query:', err);
//         });
// }

// // Delete all records in table contacts
// const deleteAllContacts = () => {
//     return new Promise((resolve, reject) => {
//         pool.query('DELETE FROM contacts RETURNING *;');
//     });
// };

// // BLOMMMMMMMMMMMMMMMMM
// // Delete a contact by name (as primary key)
// const deleteContact = (name) => {
//     return new Promise((resolve, reject) => {
//         pool.query('')
//     });
// };

// pool.end()
//     .then(() => {
//       console.log('Connection closed.');
//     })
//     .catch((err) => {
//       console.error('Error closing connection:', err);
//     });

// }

module.exports = { pool };
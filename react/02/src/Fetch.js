import React, { useState, useEffect } from 'react'

const Fetch = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('https://api.github.com/users')
            .then((res) => res.json())          // res.json() is a method that parses the JSON response into a JavaScript object.
            .then(data => setUsers(data))       // setUsers(data) updates the users state with the fetched data.
            .catch((err) => console.log(err))   // catch any error that occurs during the fetch or parsing process and log it to the console.
            // .then
    }, [])

    return (
        <div>
            <h1>User List</h1>
            {/* <ol>
            {
                users.map((user) => (
                    <li key={user.id}>{user.login}</li>
                ))
            }
        </ol> */}
            <ul>
                {
                    users.map((user) => (
                        <li key={user.id}>
                            <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.login}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Fetch

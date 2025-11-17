import React, { useState, useEffect, use } from 'react'

const MultipleReturn = () => {

    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // The below function fetches user data from the GitHub API
        async function fetchUser() {
            try {
                // Fetch data from the API, parse it as JSON, update state and handle loading state
                const response = await fetch('https://api.github.com/users');
                const data = await response.json();
                setUser(data);
                setIsLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                // In case of an error, update the error state and set loading to false
                setError(error.message);
                setIsLoading(false);
            }
        }
        // Call the fetchUser function to initiate the data fetching
        fetchUser();
    }, []);
    // As the dependend array is empty, 
    // the useEffect will run (only) once when the component mounts
    // i.e., when it is rendered for the first time. Default Rendering

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Users List</h1>
            <ul>
                {
                    user.map((user) => {
                        return (
                            <li key={user.id}>
                                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                                    {user.login}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default MultipleReturn

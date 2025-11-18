import React, {useState} from 'react'

const Form = () => {
    // Multiple State to One State Example
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // Single handler for multiple inputs
    // const handleChange = (e) => {
    //     setName(e.target.value);
    // }
    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // }
    // const handlePasswordChange = (e) => {
    //     setPassword(e.target.value);
    // }

    const handleInput = (e) => {
        const {name, value} = e.target;
        // e.target.name gives the name attribute of input field and the value gives the value entered
        // Destructuring and storing in variables
        setFormData({
            ...formData, 
            // To store previous data else when name or email 
            // Is changed other value becomes empty So we spread previous data through ...formData
            [name]: value
        });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Form submitted with Name: ${formData.name}, Email: ${formData.email}`);
    }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input name='name' type="text" value={formData.name} onChange={handleInput} />
        <p>Your name is: {formData.name}</p>
      </label>
      <br/>
      <label>
        Email:
        <input name='email' type="email"  value={formData.email} onChange={handleInput} />
        <p>Your email is: {formData.email}</p>
      </label>
      <label>
        Password:
        <input name='password' type="password"  value={formData.password} onChange={handleInput} />
        {/* <p>Your password is: {formData.password}</p> */}
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form

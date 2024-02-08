import React, { useState} from 'react';
//import { useNavigate } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
import { useCreateAccountMutation } from '../../services/authApi';
import '../../styles/SignupPage.css';
import {Container,
        Row,
        Col,
        Card,
        Form,
        Button,
        Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';



export function SignupForm() {
  const [createAccount, { isLoading }] = useCreateAccountMutation();
  // bring navigate back when dashboard is working
  //const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    display_name: '',
    phone: '',
    picture_url: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const signUp = (accountData) => {
  accountData.display_name = `${accountData.first_name}.${accountData.last_name}`;
  createAccount(accountData)

  //need to create email and username already in use error
  .then(result => {
    if (result.error) {
      setError(`Could not create the account. Error: Please fill out all forms properly.`);
    }else{
      setFormData({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        display_name: '',
        phone: '',
        picture_url: ''
      });
      //bring navigate back delete seterror when dashboard is working
      setError("")
      //navigate("/dashboard")

    }})
};

const handleSubmit = (e) => {
  e.preventDefault();
  signUp(formData);


};

 return (
    <Container>
      <Row className="justify-content-md-center">
       <Col md={4} className="split signup-left">
         <div className="centered-signup-left" >
           <h1 className="sign-up-title" style={{ color: '#2EC4B6'}}>Signup</h1>
          <Card className ="signup-card shadow p-4 mt-4" style={{ border: '2px solid #2EC4B6' }}>
            <Card.Body>
               <Form onSubmit={handleSubmit}>
             {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group controlId="formFirstName"className="mt-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="first_name"
                    type="text"
                    placeholder="Enter first name"
                    value={formData.first_name}
                    onChange={handleFormChange}
                  />
                </Form.Group>


                <Form.Group controlId="formLastName" className="mt-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="last_name"
                    type="text"
                    placeholder="Enter last name"
                    value={formData.last_name}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group id="formUsername" >
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                 <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </Form.Group>


                 <Form.Group controlId="formPassword" className="mt-3" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleFormChange}
                  />
                </Form.Group>


                <Form.Group controlId="formDisplayName" className="formDisplayName mt-3">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    name="display_name"
                    type="text"
                    placeholder="Your display name will appear here..."
                    value={formData.first_name !== '' ? `${formData.first_name}.${formData.last_name}` : ''}
                     onChange={handleFormChange}
                     disabled readOnly
                  />
                </Form.Group>


                {/* <Form.Group controlId="formPhone" className="mt-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleFormChange}
                  />
                </Form.Group> */}

                {/* <Form.Group  controlId="formPictureUrl" className="mt-3">
                  <Form.Label>Picture URL</Form.Label>
                  <Form.Control
                    name="picture_url"
                    type="text"
                    placeholder="Enter picture URL"
                    value={formData.picture_url}
                    onChange={handleFormChange}
                  />
                </Form.Group> */}
                  <div className="text-center">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Button className="btn-signup mt-3" type="submit" disabled={isLoading}>
                      {isLoading ? 'Taking a short trip...' : 'Sign Up'}
                    </Button>
                  </div>



              </Form>
            </Card.Body>
          </Card>
         </div>
       </Col>

       <Col md={6} className="split signup-right">
         <div className="centered-signup-right">
           <img src="TB_transparent_logo_white.png" alt="" style={{ width: '400px', height: 'auto', filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5))' }} />
           <h2 style={{ color: 'white' }}>Welcome!</h2>
           <p>
            <Link className='already-a-buddy' to="/login">Already a buddy?</Link>
           </p>
         </div>
       </Col>

      </Row>
    </Container>
  );
}

export default SignupForm;

import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
import { useCreateAccountMutation } from '../../services/authApi';
import '../../styles/SignupPage.css';
import {Container,
        Row,
        Col,
        Card,
        Form,
        Button,
        Alert,
        FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../../state/auth/authSlice';



export function SignupForm() {
  const token = useSelector(selectToken)
  const navigate = useNavigate()
  const [createAccount, { isLoading }] = useCreateAccountMutation();
  // bring navigate back when dashboard is working
  //const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    // confirmPassword: '',
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
        // confirmPassword: '',
        first_name: '',
        last_name: '',
        display_name: '',
      });
      //bring navigate back delete seterror when dashboard is working
      setError("")
      //navigate("/dashboard")

    }})
};

useEffect(() => {
    if (token) {
        navigate('/dashboard')
    }
})    

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

                  <FloatingLabel controlId="formFirstName"className="mb-3" label='First name'>
                    <Form.Control
                        name="first_name"
                        type="text"
                        placeholder="Enter first name"
                        value={formData.first_name}
                        onChange={handleFormChange}
                    />
                  </FloatingLabel>


                  <FloatingLabel controlId="formLastName" className="mb-3" label='Last name'>
                    <Form.Control
                        name="last_name"
                        type="text"
                        placeholder="Enter last name"
                        value={formData.last_name}
                        onChange={handleFormChange}
                    />
                  </FloatingLabel>


                  <FloatingLabel id="formUsername" className='mb-3' label='Username'>
                    <Form.Control
                        name="username"
                        type="text"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleFormChange}
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="formEmail" className="mb-3" label='Email'>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleFormChange}
                    />
                  </FloatingLabel>


                  <FloatingLabel controlId="formPassword" className="mb-3" label='Password'>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleFormChange}
                    />
                  </FloatingLabel>
                  
                  {/* <FloatingLabel controlId="formConfirmPassword" className="mb-3" label='Confirm password'>
                    <Form.Control
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleFormChange}
                    />
                  </FloatingLabel> */}

                  <FloatingLabel controlId="formDisplayName" className="formDisplayName mb-3" label='Display name'>
                    <Form.Control
                        name="display_name"
                        type="text"
                        placeholder="Your display name will appear here..."
                        value={formData.first_name !== '' ? `${formData.first_name}.${formData.last_name}` : ''}
                        onChange={handleFormChange}
                        disabled readOnly
                    />
                  </FloatingLabel>

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
           <img src={require('../../public/TB_transparent_logo_white.png')} alt="" style={{ width: '400px', height: 'auto', filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5))' }} />
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

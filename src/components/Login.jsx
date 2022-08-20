import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Form,Button,Row,Col } from "react-bootstrap";
import { useDispatch,useSelector } from 'react-redux';
import { logIn } from '../redux/actions/userActions';
import Message from '../functionalities/Message';
import Loader from '../functionalities/Loader';
import FormContainer from '../functionalities/FormContainer';

const Login =()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(state=>state.userLogin);
    const {loading, error, userInfo} = userLogin;

    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(logIn(email,password))
      }
    
      useEffect(()=>{
          if(userInfo && userInfo.user){
              navigate("/bikes",{replace : true})
          }
      },[userInfo, navigate])

    return (
        <FormContainer>
      <h1>Login</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email' className='py-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type='email' 
            placeholder='Enter email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='py-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          ></Form.Control>
          <Button className='my-3' type='submit' variant='primary'>Sign In</Button>
        </Form.Group>
      </Form>
      <Row className='py-3'>
        <Col>
          Don't have an account yet? <Link to='/signup'>Sign Up</Link>
        </Col>
      </Row>
    </FormContainer>

    )

}

export default Login
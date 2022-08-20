import React,{ useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Form,Row,Col,Button } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux"; 
import FormContainer from '../functionalities/FormContainer';
import Loader from "../functionalities/Loader";
import Message from "../functionalities/Message";
import { signUp } from '../redux/actions/userActions';

const SignUp = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')

  const navigate=useNavigate()

  const userRegisterinfo = useSelector(state=>state.userRegister);
    const {loading, error, userInfo} = userRegisterinfo;
  const dispatch=useDispatch()

  const submitHandler=(e)=>{
    e.preventDefault()
    if(password!==confirmPassword){
      alert("Passwords do not match")
    }else{
      dispatch(signUp(email,password))
    }
  }

  useEffect(()=>{
    if(userInfo){
      navigate("/login")
      window.location.reload(false);
    }
  },[userInfo,navigate])
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address :</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password :</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword' className='my-3'>
          <Form.Label>Confirm Password :</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Confirm Password'
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className='my-3' type="submit" variant='primary'>Register</Button>
      </Form>
      <Row>
        <Col>
          Already have an account ? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default SignUp
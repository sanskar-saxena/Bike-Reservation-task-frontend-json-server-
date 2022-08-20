import React,{ useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { Form,Button } from "react-bootstrap";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormContainer from '../functionalities/FormContainer';
import { BsFillArrowLeftCircleFill } from "react-icons/bs"; 
import { createUser } from '../redux/actions/userActions';

const AddUser = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [role,setRole]=useState("REGULAR")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {users} = useSelector(state=>state.usersList)

    const submitHandler=(e)=>{
        e.preventDefault()
      if(email.length===0){
        toast("Email cannot be empty")
        return
      }

      if(password.length===0){
        toast("Password cannot be empty")
        return
      }
      else{
        for(let i=0; i<users.length; i++){
          if(users[i].email === email){
            toast("Email Already Exists")
            return;
          }
        }
        dispatch(createUser({email,password,role}))
        navigate("/manage/users",{replace:true})
      }
    }


  return (
  <>
  <Link to= "/manage/users"><BsFillArrowLeftCircleFill size={30}/></Link>
  <FormContainer>
      <h1>ADD USER :</h1>
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
          <ToastContainer></ToastContainer>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='rating'>
            <Form.Label>Role</Form.Label>
            <Form.Control
              as='select'
              value={role}
              onChange={(e)=>setRole(e.target.value)}
              >
              <option value="REGULAR">REGULAR</option>
              <option value="MANAGER">MANAGER</option>
            </Form.Control>
          </Form.Group>
        <Button 
            className='my-3' 
            type="submit" 
            variant='primary'
        >CREATE</Button>
      </Form>
    </FormContainer>
  </>
  )
}

export default AddUser

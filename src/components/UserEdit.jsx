import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser, userDetails } from '../redux/actions/userActions';
import { BsFillArrowLeftCircleFill } from "react-icons/bs"; 
import FormContainer from '../functionalities/FormContainer';
import Loader from "../functionalities/Loader";
import Message from "../functionalities/Message";
import { Form,Button } from "react-bootstrap";
import { ToastContainer,toast } from 'react-toastify';

const UserEdit = () => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("")
    const params = useParams()
    const dispatch = useDispatch()
    const detailsUser = useSelector(state=>state.userDetails)
    const {loading, error, user} = detailsUser;
    
    const {users} = useSelector(state=>state.usersList)
  
    // console.log(users)

    const navigate = useNavigate();

    const updateHandler = (e)=>{
        e.preventDefault();
        if(email.length===0){
            toast("Email Cannot be empty")
            return;
        }
        else{
          for(let i=0; i<users.length; i++){
            if(users[i].email === email){
              toast("Email Already Exists")
              return;
            }
          }
        dispatch(updateUser({id:+params.userId, role:role, email : email}))
        navigate("/manage/users", {replace : true});
        }

    }

    useEffect(()=>{
        if(user && user.id===+params.userId){
            setEmail(user.email)
            setRole(user.role)
        }
        else{
            dispatch(userDetails(params.userId))
        }
    }, [user,params.userId])
  return (
      <>
      <Link to= "/manage/users"><BsFillArrowLeftCircleFill size={30}/></Link>
      <FormContainer>
      <h1>EDIT USER :</h1>
      { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Form onSubmit={updateHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address :</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='role' className='my-3'>
          <ToastContainer></ToastContainer>
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
        >UPDATE</Button>
      </Form>
    )}
    </FormContainer>
  </>
  )
}

export default UserEdit
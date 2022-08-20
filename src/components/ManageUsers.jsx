import React,{ useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { Row,Col,Table,Button } from "react-bootstrap"; 
import { useSelector,useDispatch } from "react-redux";
import Loader from "../functionalities/Loader";
import Message from "../functionalities/Message";
import NoDataFound from "./NoDataFound";
import Paginate from "../functionalities/Paginate";
import { allUsers, deleteUser } from '../redux/actions/userActions';


const ManageUsers = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    
  const usersList=useSelector(state=>state.usersList)
  const { loading, error, users,totalCount }=usersList

  
  const editHandler = (id) => {
    navigate(`/manage/users/${+id}/edit`)
  }

  const createUser=()=>{
    navigate('/create/users')
  }

  const deleteHandler = (id) => {
    dispatch(deleteUser(+id))
    dispatch(allUsers(+params.pageNum))
  }

  useEffect(()=>{
    if(page!==+params.pageNum){
      setPage(+params.pageNum)
    }
    dispatch(allUsers(+params.pageNum))
  },[dispatch,params.pageNum])


  return (
    <>
    {loading && <Loader />}
    {error && <Message variant='danger'>{error}</Message>}
    {users && users.length===0 ? (
      <NoDataFound displayText="No user found" />
    ):(
      <Row>
          <Col md={11}>
            <h1>All Users : </h1>
          </Col>
          <Col md={1}>
            <Button 
              size='sm' 
              variant='primary' 
              type="button"
              onClick={()=>createUser()}
            >Create</Button>
          </Col>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button 
                    size={40}
                    variant='outline-info' 
                    type="button"
                    onClick={()=>editHandler(user.id)}
                    >Edit</Button>
                </td>
                <td>
                  <Button 
                    size='sm' 
                    variant='outline-danger' 
                    type="button"
                    onClick={()=>deleteHandler(user.id)}
                    >Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginate 
          page={page} 
          pages={Math.ceil((+totalCount)/9)}
          prefix="manage/users" 
        />
      </Row>
      )}
    </>
  )
}

export default ManageUsers

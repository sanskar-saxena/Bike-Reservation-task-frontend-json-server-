import axios from 'axios';

export const BIKE_LIST_REQ = 'BIKE_LIST_REQ' 
export const BIKE_LIST_SUCCESS='BIKE_LIST_SUCCESS'
export const BIKE_LIST_FAIL='BIKE_LIST_FAIL'
export const BIKE_LIST_FAIL_RESET = "BIKE_LIST_FAIL_RESET"
export const BIKE_DETAILS_REQ='BIKE_DETAILS_REQ'
export const BIKE_DETAILS_SUCCESS='BIKE_DETAILS_SUCCESS'
export const BIKE_DETAILS_FAIL='BIKE_DETAILS_FAIL'
export const BIKE_DETAILS_FAIL_RESET = "BIKE_DETAILS_FAIL_RESET";
export const BIKE_CREATE_REQ='BIKE_CREATE_REQ'
export const BIKE_CREATE_SUCCESS='BIKE_CREATE_SUCCESS'
export const BIKE_CREATE_FAIL='BIKE_CREATE_FAIL'
export const BIKE_CREATE_FAIL_RESET = "BIKE_CREATE_FAIL_RESET";
export const BIKE_UPDATE_REQ='BIKE_UPDATE_REQ'
export const BIKE_UPDATE_SUCCESS='BIKE_UPDATE_SUCCESS'
export const BIKE_UPDATE_FAIL='BIKE_UPDATE_FAIL'
export const BIKE_UPDATE_RESET='BIKE_UPDATE_RESET'
export const BIKE_UPDATE_FAIL_RESET = "BIKE_UPDATE_FAIL_RESET"
export const BIKE_DELETE_REQ='BIKE_DELETE_REQ'
export const BIKE_DELETE_SUCCESS='BIKE_DELETE_SUCCESS'
export const BIKE_DELETE_FAIL='BIKE_DELETE_FAIL'
export const BIKE_DELETE_FAIL_RESET = "BIKE_DELETE_FAIL_RESET"
export const MANAGER_BIKE_LIST_REQ='MANAGER_BIKE_LIST_REQ'
export const MANAGER_BIKE_LIST_SUCCESS='MANAGER_BIKE_LIST_SUCCESS'
export const MANAGER_BIKE_LIST_FAIL='MANAGER_BIKE_LIST_FAIL'
export const MANAGER_BIKE_LIST_FAIL_RESET = "MANAGER_BIKE_LIST_FAIL_RESET";

export const bikeList = (filter) => async(dispatch) =>{
    try {
        dispatch({
            type : BIKE_LIST_REQ,
        })
    
    for(let key in filter){
        if(filter[key]==="" || filter[key]===undefined){
            delete filter[key];
        }
    }
    const params = new URLSearchParams(filter); // query string
    const res = await axios.get(`https://bike-bungy.herokuapp.com/bikes?${params.toString()}`);
    dispatch({
        type : BIKE_LIST_SUCCESS,
        payload : {
            data : res.data,
            pages : res.headers["x-total-count"] 
        }
    })
    }
    catch(error){
        dispatch({
            type : BIKE_LIST_FAIL,
            payload : error.response && error.response.data ? error.response.data : error.message
        })
        setTimeout(()=>{
            dispatch({
                type : BIKE_LIST_FAIL_RESET,

            })
        },3000)
    }
}

export const bikeDetails = (id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type : BIKE_DETAILS_REQ
        })

        const {
            userLogin: { userInfo },
          } = getState();

          const headerInfo = {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          };

        const {data} = await axios.get(`https://bike-bungy.herokuapp.com/bikes/${id}`, headerInfo);
        dispatch({
            type : BIKE_DETAILS_SUCCESS,
            payload : data
        })
    }
    catch (error){
        dispatch({
            type : BIKE_DETAILS_FAIL,
            payload : error.response && error.response.data ? error.response.data : error.message
        })
        setTimeout(()=>{
            dispatch({
                type : BIKE_DETAILS_FAIL_RESET,

            })
        },3000)
    }
}

export const allBikes = (page, limit = 9)=>async(dispatch,getState) =>{
    try {
        dispatch({
            type : MANAGER_BIKE_LIST_REQ
        })

        const {
            userLogin: { userInfo },
          } = getState();

          const headerInfo = {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          };

          const res = await axios.get(`https://bike-bungy.herokuapp.com/bikes?_page=${page}&_limit=${limit}`,headerInfo);
        
          dispatch({
              type : MANAGER_BIKE_LIST_SUCCESS,
              payload : {data : res.data, pages : res.headers['x-total-count']}
          })
    } catch(error){
        dispatch({
            type : MANAGER_BIKE_LIST_FAIL,
            payload : error.response && error.response.data ? error.response.data : error.message
        })
        setTimeout(()=>{
            dispatch({
                type : MANAGER_BIKE_LIST_FAIL_RESET
            })
        }, 3000)
    }
}

export const createBike = (bike) =>async(dispatch, getState) =>{
    try {
        dispatch({
            type : BIKE_CREATE_REQ
        })
        const {
            userLogin: { userInfo },
          } = getState();

          const headerInfo = {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          };

          const { data } = await axios.post(`https://bike-bungy.herokuapp.com/bikes`, bike, headerInfo);
        dispatch({
            type : BIKE_CREATE_SUCCESS,
            payload : data
        })
    }
    catch(error){
        dispatch({
            type : BIKE_CREATE_FAIL,
            payload : error.response && error.response.data ? error.response.data : error.message
        })
        setTimeout(()=>{
            dispatch({
                type : BIKE_CREATE_FAIL_RESET,
            })
        }, 3000)
    }
}

export const deleteBike = (id) => async(dispatch, getState)=>{
    try {
        dispatch({
            type : BIKE_DELETE_REQ,
        })

        const {
            userLogin: { userInfo },
          } = getState();

          const headerInfo = {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          };
        
        const {data} = await axios.delete(`https://bike-bungy.herokuapp.com/bikes/${id}`, headerInfo)

        dispatch({
            type : BIKE_DELETE_SUCCESS,
            payload : data
        })
    }
    catch(error){
        dispatch({
            type : BIKE_DELETE_FAIL,
            payload : error.response && error.response.data ? error.response.data : error.message
 
        })
        setTimeout(()=>{
            dispatch({
                type : BIKE_DELETE_FAIL_RESET
            })
        },3000)
    }
}

export const updateBike = (bike) => async(dispatch,getState) =>{
    try {
        dispatch({
            type : BIKE_UPDATE_REQ,
        })

        const {
            userLogin: { userInfo },
          } = getState();

          const headerInfo = {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          };
        
        const {data} = await axios.patch(`https://bike-bungy.herokuapp.com/bikes/${bike.id}`, bike, headerInfo);
        console.log(data);
        dispatch({
            type : BIKE_UPDATE_SUCCESS,
            
        })
        dispatch({
            type : BIKE_DETAILS_SUCCESS,
            payload : data
        })
    }
    catch(error){
        console.log(error)
        dispatch({
            type : BIKE_UPDATE_FAIL,
            payload : error.response && error.response.data ? error.response.data : error.message
 
        })
        setTimeout(()=>{
            dispatch({
                type : BIKE_UPDATE_FAIL_RESET,
            })
        }, 3000)

    }
}
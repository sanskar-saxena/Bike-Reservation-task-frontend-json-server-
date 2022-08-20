import axios from "axios";

export const RESERVATION_LIST_REQ = "RESERVATION_LIST_REQ";
export const RESERVATION_LIST_SUCCESS = "RESERVATION_LIST_SUCCESS";
export const RESERVATION_LIST_FAIL = "RESERVATION_LIST_FAIL";
export const RESERVATION_LIST_FAIL_RESET = "RESERVATION_LIST_FAIL_RESET"
export const RESERVATION_CANCEL_FAIL_RESET = "RESERVATION_CANCEL_FAIL_RESET";
export const RESERVATION_BIKE_LIST_FAIL_RESET = "RESERVATION_BIKE_LIST_FAIL_RESET";
export const RESERVATION_CANCEL_REQ = "RESERVATION_CANCEL_REQ";
export const RESERVATION_CANCEL_SUCCESS = "RESERVATION_CANCEL_SUCCESS";
export const RESERVATION_CANCEL_FAIL = "RESERVATION_CANCEL_FAIL";
export const RESERVATION_CREATE_SUCCESS_RESET = "RESERVATION_CREATE_SUCCESS_RESET";
export const RESERVATION_CREATE_REQ = "RESERVATION_CREATE_REQ";
export const RESERVATION_CREATE_SUCCESS = "RESERVATION_CREATE_SUCCESS";
export const RESERVATION_CREATE_FAIL = "RESERVATION_CREATE_FAIL";
export const RESERVATION_CREATE_FAIL_RESET = "RESERVATION_CREATE_FAIL_RESET";
export const RESERVATION_USER_LIST_REQ = "RESERVATION_USER_LIST_REQ";
export const RESERVATION_USER_LIST_SUCCESS = "RESERVATION_USER_LIST_SUCCESS";
export const RESERVATION_USER_LIST_FAIL = "RESERVATION_USER_LIST_FAIL";
export const RESERVATION_USER_LIST_FAIL_RESET = "RESERVATION_USER_LIST_FAIL_RESET";
export const RESERVATION_BIKE_LIST_REQ = "RESERVATION_BIKE_LIST_REQ";
export const RESERVATION_BIKE_LIST_SUCCESS = "RESERVATION_BIKE_LIST_SUCCESS";
export const RESERVATION_BIKE_LIST_FAIL = "RESERVATION_BIKE_LIST_FAIL";


export const allReservations = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESERVATION_LIST_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const headerInfo = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const { data } = await axios.get("https://bike-bungy.herokuapp.com/reservations", headerInfo);

    dispatch({
      type: RESERVATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESERVATION_LIST_FAIL,
      payload: error.response && error.response.data ? error.response.data : error.response && error.response.data ? error.response.data : error.message,
    });
    setTimeout(()=>{
      dispatch({
        type : RESERVATION_LIST_FAIL_RESET,
      })
    },3000)
  }
};

export const createReservation =
  (reservation) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RESERVATION_CREATE_REQ,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const headerInfo = {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      };

      const { data } = await axios.post(
        "https://bike-bungy.herokuapp.com/reservations",
        reservation,
        headerInfo
      );

      console.log(data);

      dispatch({
        type: RESERVATION_CREATE_SUCCESS,
        payload: data,
      });
      setTimeout(()=>{
        dispatch({
          type : RESERVATION_CREATE_SUCCESS_RESET
        })
      },3000)

    } catch (error) {
      dispatch({
        type: RESERVATION_CREATE_FAIL,
        payload: error.response && error.response.data ? error.response.data : error.message,
      });
      setTimeout(()=>{
        dispatch({
          type : RESERVATION_CREATE_FAIL_RESET
        })
      },3000)
    }
  };

export const cancelReservation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESERVATION_CANCEL_REQ,
    });
    const updateData = { status: "CANCELLED" };
    const {
        userLogin: { userInfo },
      } = getState();

      const headerInfo = {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      };

    const { data } = await axios.patch(
      `https://bike-bungy.herokuapp.com/reservations/${id}`,
      updateData,
      headerInfo
    );

    dispatch({
      type: RESERVATION_CANCEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESERVATION_CANCEL_FAIL,
      payload: error.response && error.response.data ? error.response.data : error.message,
    });
    setTimeout(()=>{
      dispatch({
        type : RESERVATION_CANCEL_FAIL_RESET,
      })
    }, 3000)
  }
};

export const allUsersInReservation = (page=1, limit=9)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type : RESERVATION_USER_LIST_REQ
        })
        const {
            userLogin: { userInfo },
          } = getState();
    
          const headerInfo = {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          };

          const {data, headers} = await axios.get(`https://bike-bungy.herokuapp.com/reservations?_page=${page}&_limit=${limit}`);
          
          const userReservation = [];
          const users_inRes = [];
          for(let i=0; i<data.length; i++){
            let currUserReservation = axios.get(`https://bike-bungy.herokuapp.com/users/${data[i].userId}`, headerInfo);
            userReservation.push(data[i]);
            users_inRes.push(currUserReservation )
          }
          Promise.all(users_inRes)
          .then(users =>{
                const resList = [];
                for(let i=0; i<userReservation.length; i++) {
                   const newUser = {id: userReservation[i].id,
                    userEmail: users[i].data.email,
                    role: users[i].data.role,
                    bikeId: userReservation[i].bikeId,
                    startDate: userReservation[i].start_date,
                    endDate: userReservation[i].end_date,
                    status: userReservation[i].status
                    }
                  resList.push(newUser);
                }
            
                dispatch({
                    type : RESERVATION_USER_LIST_SUCCESS,
                    payload : {resList, totalCount : headers["x-total-count"]}
                })
          })
          .catch((error)=>{
            console.log(error)
              dispatch({
                  type : RESERVATION_USER_LIST_FAIL,
                  payload : error.response && error.response.data ? error.response.data : error.message
              })
          })  
    } catch(error){
      console.log(error)
        dispatch({
            type : RESERVATION_USER_LIST_FAIL,
            payload : error.response && error.response.data ? error.response.data : error.message
        })
        setTimeout(()=>{
          dispatch({
            type : RESERVATION_USER_LIST_FAIL_RESET,

          })
        },3000)
    }
}

export const allBikesInReservation = (page=1, limit, bikeId="")=>async(dispatch,getState)=>{
    try{
        dispatch({
            type : RESERVATION_BIKE_LIST_REQ
        })
        const {
            userLogin: { userInfo },
          } = getState();
    
          const headerInfo = {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          };

          let url = ""
          if(bikeId===""){
            url = `https://bike-bungy.herokuapp.com/reservations?_page=${page}&_limit=${limit}`;
          }
          else {
            url = `https://bike-bungy.herokuapp.com/reservations?_page=${page}&_limit=${limit}&bikeId=${bikeId}`
          }
            const {data,headers} = await axios.get(url)
         
          
          const bikesReservation = [];
          const bike_inRes = []
          for(let i=0; i<data.length; i++){
            let currBikeReservation = axios.get(`https://bike-bungy.herokuapp.com/bikes/${data[i].bikeId}`, headerInfo);
            bikesReservation.push(data[i])
            bike_inRes.push(currBikeReservation);
          }

          Promise.all(bike_inRes)
          .then(bikes =>{
                // console.log(bikes)
                const resList =[];
                for(let i=0; i<bikesReservation.length; i++){
                    const newBike = {
                    id: bikes[i].data.id,
                    model : bikes[i].data.model,
                    location : bikes[i].data.location,
                    color : bikes[i].data.color,
                    avgRating : bikes[i].data.avgRating,
                    bikeId: bikesReservation[i].bikeId,
                    startDate: bikesReservation[i].start_date,
                    endDate: bikesReservation[i].end_date,
                    status: bikesReservation[i].status
                    }
                    resList.push(newBike)
                  
                }
            
                dispatch({
                    type : RESERVATION_BIKE_LIST_SUCCESS,
                    payload : {resList, totalCount : headers["x-total-count"]}
                })
          })
          .catch((error)=>{
              dispatch({
                  type : RESERVATION_BIKE_LIST_FAIL,
                  payload : error.response && error.response.data ? error.response.data : error.message
              })
              setTimeout(()=>{
                dispatch({
                  type : RESERVATION_BIKE_LIST_FAIL_RESET
                })
              },3000)
          })  
    } catch(error){
        dispatch({
            type : RESERVATION_BIKE_LIST_FAIL,
            payload : error.response && error.response.data ? error.response.data : error.message
        })
        setTimeout(()=>{
          dispatch({
            type : RESERVATION_BIKE_LIST_FAIL_RESET
          })
        },3000)
    }
}
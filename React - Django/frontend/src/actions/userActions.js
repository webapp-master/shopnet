import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
} from "../constants/userConstants";
import axios from "axios";



export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login/",
      { username: email, password: password },
      config
    );


    // Log the 'data' received from the login request
  console.log("Login data:", data);

    // Get user details after successful login
    const userInfoResponse = await axios.get("/api/user/profile/", {

      headers: {
        Authorization: `Bearer ${data.access}`, // Include the token obtained after login
      },

    });

    // Extract required user information from userInfoResponse.data
    const { id, username, firstName, last_name } = userInfoResponse.data;



    // Dispatch success action with user information
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        ...data, // Include existing payload (token, etc.)
        id,
        
        username,
        firstName,
        last_name,
      },
    });
    
    // Log the updated payload after dispatching USER_LOGIN_SUCCESS
    const updatedPayload = {
      ...data,
      id,
      
      username,
      firstName,
      last_name,
    };
    console.log('Updated Payload:', updatedPayload);
    

    // Save user information to localStorage
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        ...data,
        id,
        
        username,
        firstName,
        last_name,
      })
    );
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};








export const register =
  (firstName, lastName, userName, email, phoneNumber, City, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register/",
        {
          firstName: firstName,
          last_name: lastName,
          username: userName,
          email: email,
          phoneNumber: phoneNumber,
          City: City,
          password: password, 
        },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};


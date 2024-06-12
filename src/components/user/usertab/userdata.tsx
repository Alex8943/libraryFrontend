import { useState } from "react";
import React, { CSSProperties } from 'react';
import {
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Box,
} from '@chakra-ui/react'
import { useUser } from '../userContext';
import axios from 'axios';
import Cookies from "js-cookie";
import { currentConfig } from '../../../../config';

interface Props {
  onClose: () => void;
}
export default function Userdata({ onClose }: Props) {
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [data, setData] = useState({
    new_email: "",
    new_password: "",
  });
  const { dispatch } = useUser();
  let { user } = useUser();
  const userEmail = user.user ? user.user.email : "Email missing";
  const endpoint = currentConfig.apiEnvEndpoint;

  const update_img_style: CSSProperties = {
    width: '1.25rem',
    float: 'right',
    cursor: 'pointer'
  }

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    let userData = {};
    try {
      // Check if updating email or password and send the appropriate data to the backend
      console.log("Userdata for the data update:", userData)
      if (isUpdatingEmail) {
        user.user.new_email = data.new_email;
        userData = {
          user: user.user
        };
      } else if (isUpdatingPassword) {
        user.user.new_password = data.new_password;
        userData = {
          user: user.user
        };
      }
      let userDataWithToken = { "authToken": Cookies.get("authToken"), "user": userData }
      const response = await axios.post(`http://localhost:3000/user/${user.user.user_id}/update`, userDataWithToken);
      console.log(response)
      dispatch({ type: 'LOGIN', user: response.data.user });
      Cookies.set('authToken', response.data.authToken);
      onClose();
    } catch (error) {
      console.error("Axios Error:", error);
    }
    // Reset the form and state after submitting
    setIsUpdatingEmail(false);
    setIsUpdatingPassword(false);
    setData({
      new_email: '',
      new_password: '',
    });
  };

  const deleteUser = async () => {
    try {
      let userDataWithToken = { "authToken": Cookies.get("authToken"), "user": user }
      const response = await axios.post(`${endpoint}/deleteUser/${user.user.user_id}`, userDataWithToken);
      console.log("Axios response:", response);
      dispatch({ type: 'LOGOUT' });
      Cookies.remove('authToken');
      onClose();
    } catch (error) {
      console.error("Axios Error:", error);
    }
  }
  const logOut = () => {
    dispatch({ type: 'LOGOUT' });
    Cookies.remove('authToken');
    onClose();
  }

  return (
    <>
      <ModalHeader fontWeight="bold">Your info</ModalHeader>
      <ModalCloseButton color='light.solid' />
      <ModalBody overflow="auto">
        {(!isUpdatingEmail && !isUpdatingPassword) && (
          <Box>
            <FormLabel fontWeight="bold">Email</FormLabel>
            <FormLabel>{userEmail || "Email missing"}
              <img src="assets/write.svg" style={update_img_style} alt="assets/write_svg" onClick={() => { setIsUpdatingEmail(true) }} />
            </FormLabel>
          </Box>
        )}

        <form >
          {(isUpdatingEmail) && (
            <Box>
              <FormLabel fontWeight="bold">Current email: {userEmail || "Email missing"}
                <img src="assets/x-close.svg" style={update_img_style} alt="assets/x-close_svg" onClick={() => { setIsUpdatingEmail(false) }} />
              </FormLabel>

              <FormControl id="email" marginTop="0.5rem">
                <FormLabel fontWeight="bold">New email</FormLabel>
                <Input type="email" name='new_email' placeholder="New email" value={data.new_email} onChange={handleChange} />
                <Button fontWeight="bold" marginTop="2rem" variant="confirm" onClick={handleSubmit}>Save new email</Button>
              </FormControl>
            </Box>
          )}

          {(!isUpdatingEmail && !isUpdatingPassword) && (
            <Box>
              <FormLabel fontWeight="bold">Password</FormLabel>
              <FormLabel>{"********" || "Password missing"}
                <img src="assets/write.svg" style={update_img_style} alt="assets/write_svg" onClick={() => { setIsUpdatingPassword(true) }} />
              </FormLabel>
            </Box>
          )}

          {(isUpdatingPassword) && (
            <Box>
              <FormLabel fontWeight="bold">Current password: {"********" || "Password missing"}
                <img src="assets/x-close.svg" style={update_img_style} alt="assets/x-close_svg" onClick={() => { setIsUpdatingPassword(false) }} />
              </FormLabel>
              <Box marginTop="2rem">
                <FormControl id="password">
                  <FormLabel fontWeight="bold">New password</FormLabel>
                  <Input type='password' name='new_password' placeholder='New password' value={data.new_password} onChange={handleChange} />
                  <FormLabel fontWeight="bold">Confirm new password</FormLabel>
                  <Input type="password" name="new_password" placeholder="New password" />
                  <Button fontWeight="bold" onClick={handleSubmit} variant="confirm" marginTop="2rem">Save new password</Button>
                </FormControl>
              </Box>
            </Box>
          )}
        </form>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" mr={3} onClick={logOut}>
          Log out
        </Button>
        <Button id='delete_user' variant='ghost' onClick={deleteUser}>
          Delete user
        </Button>
      </ModalFooter>
    </>
  )
}

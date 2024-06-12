import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
	useDisclosure,
	Box
} from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useUser } from './userContext';
import { currentConfig } from '../../../config';

const SignUp = () => {
	const endpoint = currentConfig.apiEnvEndpoint;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [data, setData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: ""
	});
	const [errors, setErrors] = useState<String[]>([]);
	const { dispatch } = useUser();



	const validateForm = (data: any) => {
		let errorlist = [];

		// Validate first name
		if (!data.first_name.trim()) {
			errorlist.push('First name is required');
		} else if (!/^[a-zA-Z]+$/.test(data.first_name)) {
			errorlist.push('First name should only contain letters');
		} else if (!/^(?:[A-Z][a-z]*)(?:\s[A-Z][a-z]*)*$/.test(data.first_name)) {
			errorlist.push('First name should contain capital letters only at the beginning of each word');
		}

		// Validate last name
		if (!data.last_name.trim()) {
			errorlist.push('Last name is required');
		} else if (!/^[a-zA-Z]+$/.test(data.last_name)) {
			errorlist.push('Last name should only contain letters');
		} else if (!/^(?:[A-Z][a-z]*)(?:\s[A-Z][a-z]*)*$/.test(data.last_name)) {
			errorlist.push('Last name should contain capital letters only at the beginning of each word');
		}

		// Validate email
		if (!data.email.trim()) {
			errorlist.push('Email is required');
		} else if (!/.*@.*\..*/.test(data.email)) {
			errorlist.push('Email must contain at least an @ and a .');
		}

		// Validate password
		if (!data.password.trim()) {
			errorlist.push('Password is required');
		} else if (data.password.length < 6) {
			errorlist.push('Password must be at least 6 characters long');
		}

		return errorlist;
	};

	const handleChange = (e: any) => {
		const value = e.target.value;
		setData({
			...data,
			[e.target.name]: value
		});
		setErrors(validateForm(data));
	};

	const isFormValid = errors.length === 0;
	const isAllFieldsFilled = Object.values(data).every(value => value.trim() !== '');
	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!isAllFieldsFilled) {
			setErrors(validateForm(data));
			return;
		}

		const userData = {
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			password: data.password
		};
		try {
			const response = await axios.post(`${endpoint}/auth/signup`, userData);
			console.log("Axios response:", response);
			dispatch({ type: 'LOGIN', user: response.data.user });
			Cookies.set("authToken", response.data.authToken);
			onClose();
		} catch (axiosError: any) {
			console.error("Axios Error:", axiosError);
		}
	};

	const errorStyle = {
		color: 'red',
		marginLeft: '15%',
	}

	const buttonStyleSignUp = {
		width: '50%',
		marginLeft: '25%',
		marginTop: '2rem'
	}

	return (
		<>
			<Button id='signup_button' variant="primary" onClick={onOpen}>Sign up</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg='light.gradient' >
					<Box background='red.gradient' className='modul_banner'>
						<img src="assets/userLogo.svg" alt="userlogo" />
						<ModalCloseButton color='light.solid' />
					</Box>
					<h2 className='center_this'>Welcome</h2>
					<p className='center_this'>The first step to nearly endless knowledge starts today</p>
					<form id='signup'>
						<ModalBody>
							<FormControl>
								{/* <FormLabel>First name</FormLabel> */}
								<Input type='text' name='first_name' placeholder='First name' value={data.first_name} onChange={handleChange} />
								{/* <FormLabel>Last name</FormLabel> */}
								<Input type='text' name='last_name' placeholder='Last name' value={data.last_name} onChange={handleChange} />
								<FormLabel htmlFor='email' className='hidden'>Email</FormLabel>
								<Input type='email' name='email' placeholder='Email' value={data.email} onChange={handleChange} />
								<FormLabel htmlFor='password' className='hidden'>Password</FormLabel>
								<Input type='password' name='password' placeholder='Password' value={data.password} onChange={handleChange} />
							</FormControl>
						</ModalBody>
						{errors.map((error) => (
							<li style={errorStyle}>{error}</li>
						))}
						<Button style={buttonStyleSignUp} type='submit' className='primary'
							variant={isFormValid && isAllFieldsFilled ? 'confirm' : 'ghost'}
							disabled={!isFormValid || !isAllFieldsFilled}
							onClick={handleSubmit}>
							Sign up
						</Button>
					</form>
					<Button variant='ghost' >
						Or log in
					</Button>
				</ModalContent>
			</Modal>
		</>
	)
};

export default SignUp;
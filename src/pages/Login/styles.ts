import styled from 'styled-components'

export const LoginContainer = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	h1 {
		text-align: center;
		color: #ffffff;
		font-size: 3rem;
		margin: 20px;
	}

	form {
		display: flex;
		flex-direction: column;
		background-color: #ab84a4;
		width: 280px;
		border-radius: 10px;

		label {
			display: flex;
			flex-direction: column;
			margin: 10px;

			input {
				padding: 2px;
			}

			.btn {
				width: 100%;
				background-color: #010512;
				color: #ffffff;
				border: none;
				cursor: pointer;
				transition: 0.5s;
				padding: 5px;
				border-radius: 5px;
				font-weight: 700;
			}

			.btn:hover {
				opacity: 0.6;
			}
		}

		@media screen and (max-width: 350px) {
			width: 80%;
		}
	}

	a {
		background-color: #010512;
		color: #ffffff;
		text-decoration: none;
		padding: 5px 20px;
		margin: 15px;
		border-radius: 5px;
		transition: 0.5s;
	}

	a:hover {
		opacity: 0.6;
	}
`

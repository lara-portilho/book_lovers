import styled from 'styled-components'

export const PasswordEditingContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	form {
		background-color: #ab84a4;
		display: flex;
		flex-direction: column;
		padding: 10px;
		border-radius: 10px;
		margin: 5px;

		hr {
			width: 100%;
		}

		h3 {
			font-size: 16px;
			font-weight: 400;
			margin: 5px;
		}

		label {
			margin: 5px;
			display: flex;
			width: 90%;
			flex-direction: column;

			.txtInput {
				color: #000000;
				padding: 2px;
			}
		}

		.finishEditBtn {
			align-self: center;
			width: 80%;
			background-color: #010512;
			cursor: pointer;
			transition: 0.5s;
			border: none;
			border-radius: 5px;
			color: #ffffff;
			padding: 5px;
			font-weight: 700;
			margin: 5px;
		}

		.finishEditBtn:hover {
			opacity: 0.6;
		}
	}

	.cancelBtn {
		background-color: red;
		color: #ffffff;
		text-decoration: none;
		padding: 5px 20px;
		margin: 5px;
		border-radius: 5px;
		transition: 0.5s;
		cursor: pointer;
	}

	.cancelBtn:hover {
		opacity: 0.6;
	}
`

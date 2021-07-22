import styled from 'styled-components'

export const ProfileContainer = styled.div`
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
		width: max-content;

		label {
			margin: 5px;
			display: flex;
			width: 90%;
			flex-direction: column;

			.txtInput {
				color: #000000;
				padding: 2px;
			}

			.verifyBtn {
				background-color: #ab84a4;
				border: none;
				text-decoration: underline solid;
				color: #08133b;
				transition: 0.5s;
				cursor: pointer;
			}

			.verifyBtn:hover {
				opacity: 0.6;
			}
		}

		.editBtn {
			align-self: center;
			width: 80%;
			background-color: #010512;
			cursor: pointer;
			transition: 0.5s;
			border-radius: 5px;
			color: #ffffff;
			text-decoration: none;
			text-align: center;
			padding: 5px;
			font-weight: 700;
			margin: 5px;
			font-size: 14px;
		}

		.editBtn:hover {
			opacity: 0.6;
		}
	}

	.btns {
		.outBtn {
			margin: 5px;
			border: none;
			border-radius: 5px;
			padding: 5px 10px;
			font-weight: 700;
			transition: 0.5s;
			cursor: pointer;
			background-color: red;
			color: #ffffff;
			font-size: 14px;
		}

		.passBtn {
			margin: 5px;
			border-radius: 5px;
			background-color: #ffffff;
			color: #000000;
			text-decoration: none;
			font-size: 14px;
			padding: 5px 10px;
			transition: 0.5s;
		}

		.passBtn:hover,
		.outBtn:hover {
			opacity: 0.6;
		}
	}

	.homeBtn {
		background-color: #010512;
		color: #ffffff;
		text-decoration: none;
		padding: 5px 20px;
		margin: 5px;
		border-radius: 5px;
		transition: 0.5s;
		margin-top: 30px;
	}

	.delBtn {
		color: red;
		transition: 0.5s;
		cursor: pointer;
		font-size: 13px;
	}

	.delBtn:hover,
	.homeBtn:hover {
		opacity: 0.6;
	}
`

import styled from 'styled-components'

export const ListContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
	padding-top: 70px;

	.filter {
		display: flex;
		width: 20%;
		flex-direction: column;
		background-color: #ab84a4;
		height: auto;
		border-radius: 10px;
		margin: 10px;
		padding: 10px;

		label {
			margin: 5px;

			.txtInput,
			select {
				padding: 2px;
				width: 100%;
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
	}

	.bookCont {
		padding: 10px;
		background-color: #ab84a4;
		height: auto;
		width: 60%;
		border-radius: 10px;
		margin: 10px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-template-rows: none;
		overflow: hidden;
		justify-content: center;

		.bookCard {
			color: #ffffff;
			background-color: #08133b;
			display: flex;
			flex-direction: column;
			padding: 10px;
			margin: 10px;
			height: auto;
			justify-content: space-between;
			border-radius: 10px;
			text-decoration: none;
			transition: 0.5s;
		}

		.bookCard:hover {
			opacity: 0.6;
		}

		.noneFound {
			color: #000000;
			text-align: center;
			font-size: 2rem;
			font-weight: 700;
			grid-column: span 4;
		}
	}

	@media screen and (max-width: 775px) {
		flex-direction: column;
		align-items: center;
		.filter {
			width: 80%;
		}
		.bookCont {
			width: 80%;
		}
	}
`

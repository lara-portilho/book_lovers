import styled from 'styled-components'

export const BookContainer = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	form {
		display: flex;
		flex-direction: row;
		background-color: #ab84a4;
		border-radius: 10px;

		div {
			label {
				display: flex;
				justify-content: space-between;
				margin: 20px;

				input {
					padding: 2px;
				}

				input:disabled {
					color: #000000;
				}
			}

			.buttons {
				display: grid;
				grid-template-columns: auto auto;
				grid-template-rows: auto;
				grid-auto-rows: 0px;
				width: 100%;
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

		@media screen and (max-width: 600px) {
			flex-direction: column;
		}
	}
`

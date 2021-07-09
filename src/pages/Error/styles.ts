import styled from 'styled-components'

export const ErrorContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	color: white;
	flex-direction: column;

	h1 {
		margin: 10px;
		font-size: 5rem;
	}

	p {
		font-size: 2rem;
		margin: 10px;
	}

	a {
		font-size: 1.5rem;
		background-color: #ab84a4;
		padding: 10px;
		color: #000000;
		text-decoration: none;
		border-radius: 6px;
		font-weight: bold;
		transition: 0.5s;
		margin: 10px;
	}

	a:hover {
		opacity: 0.6;
	}
`

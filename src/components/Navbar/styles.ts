import styled from 'styled-components'

export const NavbarContainer = styled.nav`
	background-color: #ab84a4;
	display: flex;
	justify-content: space-between;
	position: fixed;
	align-items: center;
	height: auto;
	top: 0;
	width: 100%;

	a {
		color: #000000;
		text-decoration: none;
		margin: 5px 20px;
		transition: 0.5s;
	}

	a:hover {
		opacity: 0.6;
	}

	.logo {
		font-weight: 900;
		font-size: 30px;
	}

	.add {
		font-size: 20px;
		display: flex;
		flex-direction: row;
		height: auto;
		align-items: center;

		p {
			margin-left: 5px;
		}

		@media screen and (max-width: 600px) {
			p {
				display: none;
			}
		}
	}
`

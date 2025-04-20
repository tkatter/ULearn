import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  HiOutlineHome,
  HiOutlineSquaresPlus,
  HiOutlineUserCircle,
} from 'react-icons/hi2';

const StyledMainNav = styled.nav``;

const NavList = styled.ul`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    gap: 1.2rem;
    align-items: center;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 0.6rem 1.2rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #0b956c;
    /* color: var(--color-brand-600); */
  }
`;

function MainNav() {
  return (
    <StyledMainNav>
      <NavList>
        <li>
          <StyledNavLink to="/homepage">
            <HiOutlineHome /> <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineSquaresPlus /> <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/account">
            <HiOutlineUserCircle /> <span>Account</span>
          </StyledNavLink>
        </li>
      </NavList>
    </StyledMainNav>
  );
}

export default MainNav;

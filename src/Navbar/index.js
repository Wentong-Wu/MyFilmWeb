import React from "react";
import { Nav, NavLink, NavMenu} from "./Navbar";

const Navbar = () => {
    return(
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/Home" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/Fight" activeStyle>
                        Fight
                    </NavLink>
                    <NavLink to="/Film" activeStyle>
                        Film
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default Navbar;
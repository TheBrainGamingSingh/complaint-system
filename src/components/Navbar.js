import React from "react";

const Navbar = () =>
{
    return(
        <nav className = "custom-bluegreen-bg-1">
            <div className="nav-wrapper container">
                <a href="#" class="brand-logo">Complaint Classifier</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a href="#">Option 1</a></li>
                    <li><a href="#">Option 2</a></li>
                    <li><a href="#">Option 3</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
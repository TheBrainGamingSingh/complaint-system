import React, { Component } from "react";

class ComplaintForm extends Component
{
    handleFormSubmit = (e) =>
    {
        e.preventDefault();
        console.log("Form submitted.");
    }

    render()
    {
        return(
            <div className = "container center">
                <h3>Complaint Form</h3>
                <form onSubmit = {this.handleFormSubmit}>
                    <div className = "row container">
                        <div className = "input-field col s6">
                            <input id = "first_name" type = "text" className = "validate" required />
                            <label for = "first_name">First Name</label>
                        </div>
                        <div className = "input-field col s6">
                            <input id = "last_name" type = "text" className="validate" required />
                            <label for = "last_name">Last Name</label>
                        </div>
                    </div>
                    <div className = "row container">
                        <div className = "input-field col s6">
                            <input id = "email" type = "email" className = "validate" required />
                            <label for = "email">E-Mail</label>
                        </div>
                        <div className = "input-field col s6">
                            <input id = "address" type = "text" className="validate" required />
                            <label for = "address">Address</label>
                        </div>
                    </div>
                    <div class="row container">
                        <div class="input-field col s12">
                            <input id = "complaint" type = "text" className = "validate" required />
                            <label for = "complaint">Enter complaint here</label>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action">Submit Complaint</button>
                </form>
            </div>
        );
    }
}

export default ComplaintForm;
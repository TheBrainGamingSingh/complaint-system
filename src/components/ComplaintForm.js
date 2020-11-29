import React, { Component } from "react";

class ComplaintForm extends Component
{
    state = {
        predictions: [],
        showState: false,
        categories: [
            ["Stray Animals", "pets", "iconorange"],
            ["Electrical", "electrical_services", "iconcyansus"],
            ["Gardens" , "local_florist", "iconyellow"],
            ["Roads", "add_road", "iconmagenta"],
            ["Building Permission", "location_city", "iconpurple"],
            ["Water Supply", "water_damage", "iconblue"],
            ["Encroachment", "follow_the_signs", "icondarkerorange"],
            ["Drainage", "waves", "iconviolet"],
            ["Traffic", "traffic", "iconred"],
            ["Property Tax", "monetization_on", "iconlightgreen"],
            ["Garbage", "delete", "icongrey"],
            ["Health", "local_hospital", "icongreen"]
        ]
    };

    handleFormSubmit = (e) =>
    {
        e.preventDefault();

        var request = {
            query: document.getElementById("complaint").value
        };

        fetch("/predict",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            }
        )
        .then(res => res.json())
        .then(
            res =>
            {
                this.setState(
                    {
                        predictions: res.labels,
                        showState: true
                    }
                );
                console.log(res);
            }
        );
    }

    handleButton = () =>
    {
        this.setState(
            {
                predictions: [],
                showState: false
            }
        );

    }

    render()
    {
        var allIcons = this.state.categories.map(
            category =>
            {
                return (<span><i className="medium material-icons">{category[1]}</i> {category[0]}<br /></span>);
            }
        );

        var displayOutput;

        if(this.state.showState)
        {
            displayOutput = this.state.predictions.map(
                label =>
                {
                    var confidence = label.confidence*100;
                    return(
                        <div className="col s4">
                            <div className="card z-depth-3 darken-1">
                                <ul className="card-content collection with-header">
                                    <li className = "collection-item center"><i className = {"material-icons medium " + this.state.categories[label.id][2]}>{this.state.categories[label.id][1]}</i></li>
                                    <li className="card-title collection-header center">{label.category}</li>
                                    <li className = "collection-item center">Confidence: {Math.round((confidence + Number.EPSILON)*100)/100}%</li>
                                </ul>
                            </div>
                        </div>
                    );
                }  
            );
        }
        else
        {
            displayOutput = null;
        }

        return(
            <div className = "container center">
                {!this.state.showState && (
                <div>
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
                )}
                <br />
                <br />
                <br />
                
                <div className="row">
                    {displayOutput}
                </div>
                {this.state.showState && (
                   <button class="btn waves-effect waves-light" onClick={this.handleButton}>Submit another Complaint</button>
                )}
            </div>
        );
    }
}

export default ComplaintForm;
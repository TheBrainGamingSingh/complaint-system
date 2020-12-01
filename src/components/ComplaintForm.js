import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import FadeOut from "@bit/formidablelabs.react-animations.fade-out";
import ZoomInDown from "@bit/formidablelabs.react-animations.zoom-in-down";
import ZoomInUp from "@bit/formidablelabs.react-animations.zoom-in-up";
const ZoomInUpAnimation = keyframes`${ZoomInUp}`;
const ZoomInUpDiv = styled.div`
  animation: 12s ${ZoomInUpAnimation};
`;
const ZoomInDownAnimation = keyframes`${ZoomInDown}`;
const ZoomInDownDiv = styled.div`
  animation: 15s ${ZoomInDownAnimation};
`;
const FadeOutAnimation = keyframes`${FadeOut}`;
const FadeOutDiv = styled.div`
  animation: 10s ${FadeOutAnimation};
`;

class ComplaintForm extends Component
{
    state = {
        predictions: [],
        showForm: true,
        showState: false,
        showLoader: false,
        timeOutnumber: 0,
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
                        showLoader: true,
                        showForm: false
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
                showState: false,
                showForm: true
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

        var allIconsDisplay;
        if(!this.state.showState){
            allIconsDisplay = this.state.categories.map(
                category =>
                {
                    return (
                        <div className="col s2">
                            <div className="card z-depth-3 darken-1" style={{height: "100%", width: "100%"}}>
                                <ul className="card-content collection with-header">
                                    <li className = "collection-item center"><i className = {"material-icons medium " + category[2]} style={{fontSize: "3rem"}}>{category[1]}</i></li>
                                    <li className="card-title collection-header center" style={{fontSize: "86%", padding: "0px"}}>{category[0]}</li>
                                </ul>
                            </div>
                        </div>
                    );
                }
            );
        }
        else{
            allIconsDisplay = null;
        }

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
        // if(this.state.showState) {
        //     mapboxgl.accessToken = 'pk.eyJ1IjoicGVjbWFqb3Jwcm9qZWN0IiwiYSI6ImNraTM5ZGRzMzc4cjgydGw2am5henA5bnkifQ.VqHWgC1qta525a2xhlIGXg';
        //     var map = new mapboxgl.Map({
        //     container: 'map',
        //     style: 'mapbox://styles/mapbox/streets-v11',
        //     center: [-74.5, 40], // starting position [lng, lat]
        //     zoom: 9 // starting zoom
        //     });
        // }
        return(
            <div className = "container center">
                {this.state.showForm && (
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
                
                {this.state.showLoader && (
                    <div className={this.state.showLoader ? "fadeIn" : ""}>
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                  </svg>
                  <div style={{visibility: "hidden"}}>
                  {
                   setTimeout( () => {
                    this.setState(
                        {
                            showState: true,
                            showLoader: false
                        })
                }, 2150)
                  }
                  </div>
                  </div>
                )}

                <div className="row">
                <div className={this.state.showLoader ? "fadeOut" : ""}>
                {/* <FadeOutDiv> */}
                    {allIconsDisplay} 
                {/* </FadeOutDiv> */}
                </div>
                </div>

                <div className="row">
                <div className={this.state.showState ? "fadeIn" : ""}>
                <ZoomInUpDiv>
                     {displayOutput} 
                </ZoomInUpDiv>
                </div>
                </div>

                {this.state.showState && (
                    <div className="row">
                   <button class="btn waves-effect waves-light" onClick={this.handleButton}>Submit another Complaint</button>
                   </div>
                )}

                {/* <br />
                <br />

                <div className="row">
                    {allIconsDisplay} 
                </div> */}
               
            </div>
        );
    }
}

export default ComplaintForm;
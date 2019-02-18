import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import 'bootstrap/dist/css/bootstrap.css';
import _ from "underscore";
import {  Online } from "react-detect-offline";

class ShowcaseComponent extends Component {



    returnTags(tags){
       return _.map(tags, function (tag){
            return (
                <span className="badge badge-pill badge-danger" style={{marginLeft: '2px', marginRight: '2px'}}>
                    {tag}
                    </span>

            )
        });
    }



    render() {
        let project = this.props.project;

        return (
            <div className="col-6" style={{marginTop:'5px', marginBottom: '5px'}}>
                <Paper>
                    <h3>{project.title}</h3>
                    <h6>
                        {project.tagline}
                        </h6>
                    {this.returnTags(project.tags)}
                    <Online>
                        <img src={"https://cmgt.hr.nl:8000/"+ project.headerImage} alt="..." className="img-thumbnail" />
                    </Online>
                </Paper>
            </div>

        );
    }
}

export default ShowcaseComponent;


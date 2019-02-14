import React, { Component } from 'react';
import _ from 'underscore';
import './App.css';
import ShowcaseComponent from './ShowcaseComponent';
import 'bootstrap/dist/css/bootstrap.css';
import CircularProgress from '@material-ui/core/CircularProgress';



class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            projects: []
        }
    }


        componentWillMount(){
                this.fetchProjects();
        }


        fetchProjects(){
            let apiUrl = new Request('https://cmgt.hr.nl:8000/api/projects/');

            fetch(apiUrl)
                .then((response) => { return response.json() })
                .then((data) => {
                    this.setState({
                        isLoading: false,
                        projects: data
                    });
                }).catch( error => { console.log(error); });
        }



        returnProjectComponents(){
        let projects = this.state.projects.projects;
            return  _.map(projects, function (project) {
                return (
                    <ShowcaseComponent
                        project={project}
                        key={project._id}
                        title={project.title}
                        author={project.author}/>)

            });


        }


        
  render() {

      if(this.state.isLoading === true){
          return (
              <div className="App">
                  <h1>Mooie Showcase</h1>
                  <CircularProgress  color="secondary" />
          </div>)
      }
      else {
            console.log(this.state);

          return (
              <div className="App">
                  <h1>Mooie Showcase</h1>
                  <div className="container">
                      <div className="row">
                  {this.returnProjectComponents()}
                      </div>
                  </div>
              </div>
          );
      }
  }
}

export default App;

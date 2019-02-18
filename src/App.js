import React, { Component } from 'react';
import localforage from 'localforage';
import _ from 'underscore';
import './App.css';
import ShowcaseComponent from './ShowcaseComponent';
import 'bootstrap/dist/css/bootstrap.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Offline, Online } from "react-detect-offline";

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            projects: []
        };
    }


        componentWillMount(){
            let online = window.navigator.onLine;
            console.log(online);
                if(online){
                    this.fetchProjects();
                }

                if(!online){
                    let projects = this.getData();
                    console.log('in de mount', projects);

                    this.setState({
                        isLoading: false,
                        projects: projects
                    });
                }
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


                    if(this.state.isLoading === false){
                        this.cacheProject(data);
                        this.getData();
                    }

                }).catch( error => {
                    console.log('hij doet het niet');
                    console.log(error); });


        }

        cacheProject(data){
        // _.map(data.projects, function (project) {
        //     localforage.setItem(project.slug, project).then(function (value) {
        //         // console.log(value);
        //     })
        //         .catch(function(err) {
        //             console.log(err);
        //         });
        //     })




                localforage.setItem('projects', data.projects).then(function (value) {
                    console.log('items have been set');
                })
                    .catch(function(err) {
                        console.log(err);
                    });

        }


        getData(){
            localforage.getItem('projects').then(function(value) {
                console.log('log de value', value);
                return value;
            }).catch(function(err) {
                console.log('ik heb niks');
                // This code runs if there were any errors
                console.log(err);
            });

        }


        returnProjectComponents(){
            let online = window.navigator.onLine;



            if(online) {
                let projects = this.state.projects.projects;
                return _.map(projects, function (project) {
                    return (
                        <ShowcaseComponent
                            project={project}
                            key={project._id}
                            title={project.title}
                            author={project.author}/>)
                });
            } else{
                let projects = this.getData();
                return _.map(projects, function (project) {
                    return (
                        <ShowcaseComponent
                            project={project}
                            key={project._id}
                            title={project.title}
                            author={project.author}/>)
                });
            }
        }


       returnOfflineProjectComponents(){
        let projects = this.getData();
        console.log('offline: ', projects);
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
                      <Online>je bent online</Online>
                      <Offline>Je bent offline </Offline>
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

/****************************************************************************
*  PROJECT MAIN : Displays all the projects done under a SIG                *
*****************************************************************************/


import React, { Component } from 'react';
import axios from 'axios'; 
import '../../Shared/CSS/projects_main.css';
import '../../Shared/CSS/main.css'

/* imports for card for the project display */
import Fade from 'react-reveal/Fade';
import Box from '@material-ui/core/Box';
import CallMadeIcon from '@material-ui/icons/CallMade';

import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { Link } from 'react-router-dom';


  /* function to display the list of projects */
  function SimpleAccordion({project}) {

    const link = 'https://nitk.acm.org/media/'

    return (
      <Fade bottom>
        <Box boxShadow={5} bgcolor="background.paper" m={1} p={1} className="project_box">
          <Link to={`/project/${project.id}`} >
            <div className="img_box">
              <img src={link + project.display_picture} alt='ex' height="250" width="100%" crop="fill" className="project_card_img"/>
            </div>
          </Link>
          <div className="projects_card_content">
            <div className="project_card_heading">{project.name}</div>
            <div className="project_card_description">{project.introduction}</div>
          </div>
          <div className="card_space"></div>
            <Link to={`/project/${project.id}`}  className="card_link"><CallMadeIcon /> Continue reading ...</Link>
        </Box>
      </Fade>
    );
  }


class Projects extends Component {

    state = { 
      project_list : [], 
      sig : [],
    }


  async componentDidMount() { 
    const {REACT_APP_URL} = process.env;
    try{
      const res = await axios.get(`${REACT_APP_URL}expo/${this.props.sigId}/${this.props.year}`) 
      this.setState({ project_list : res.data.projects }); 
      this.setState({ sig : res.data.sig }); 
      window.scrollTo(0, 0);
    }
    catch(error) {
      console.log(error);
    }
  }


    render () {   

        const projects = this.state.project_list.map((project) => {
          if(project.year === parseInt(this.props.year)) {
            return (
              <div className="col-12 col-md-4">
                <div key={project.id} className="project_card">
                  <SimpleAccordion project={project}/>
                </div>
              </div>
            );
          }
          else {
            return (<div></div>)
          }
        });

    return(
        <div>
          {/* banner area */}

          <div className="banner_background">
            <div className="banner">
              <header className="banner_text_area">
                <h1 className="banner_text1">{this.state.sig.name} Project Expo</h1>
              </header>
            </div>
          </div>

          {/* list of projects area */}
          <div className="project_space">
            <div className="container">
              <div className="row"> 
                <div className="col-12 col-md-12">
                  <h3 className="heading"> Projects <DoubleArrowIcon style={{ fontSize: 30 }} className="heading_icon"/></h3>
                  <hr className="hr"></hr>
                  <br></br><br></br><h5 className="project_heading">List of projects done under {this.state.sig.name} during the year {this.props.year} - {parseInt(this.props.year )+ 1} </h5> <br></br><br></br>
                  </div>
                  {/* <div className="project_cards_group"> */}
                      {projects}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Projects;
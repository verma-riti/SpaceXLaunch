import React, {useState, useEffect} from  'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {
	const [missionData, setMissionData] = useState([])
	const [filterData, setFilterData] = useState([])
	let uniqueYears = [];

	useEffect(() => {
		axios.get('https://api.spacexdata.com/v3/launches?limit=100')
          .then(function (response) {
          setMissionData(response.data)
          setFilterData(response.data)
	      })
	      .catch(function (error) {
	        console.log(error);
	      });
 
			filterData.map(item => {
		    if (uniqueYears.indexOf(item.launch_year) === -1) {
		        uniqueYears.push(item.launch_year)
		    }
			});
			console.log("uniqueYears = ", uniqueYears);
	}, []) 

	const onFilter = (year) => {
		let Searchyear;
		let  launch_success ="true";
		let land_success = "true";
		let url ='';

		if(year.launch_success){
			launch_success = year.launch_success;
			url = "https://api.spaceXdata.com/v3/launches?limit=100&launch_success="+launch_success+"&land_success="+land_success;
		}else if(year.landing_success){
			land_success = year.landing_success
			url = "https://api.spaceXdata.com/v3/launches?limit=100&launch_success="+launch_success+"&land_success="+land_success;
		}else{
			Searchyear = 2000 + year;
			url = "https://api.spaceXdata.com/v3/launches?limit=100&launch_success="+launch_success+"&land_success="+land_success+"&launch_year=" + Searchyear;
		}
	 	
	 	console.log(url)
	 	axios.get(url)
          .then(function (response) {
          setMissionData(response.data)
	      })
	      .catch(function (error) {
	        console.log(error);
	      });
	 }

	return( 
		<Container>
		<h1 className="mt30">SpaceX Launch Programs</h1>
		 	<Row>
			 	<Col sm={2}>
			 		<h3>Filters</h3>
			 		<Row>
			 		
			            {Array.apply(null, { length: 20 }).map((e, i) => (
								<Col sm={6} xs={6}  key={i} className="mt30 right_sidebar">
									<button onClick={() => onFilter(i)}><span>{2000+i}</span></button>
								</Col>
						))}	
			            <Col sm={12}  className="mt30 right_sidebar">
			            <p>Successful Launch</p>
	            		<button onClick={() => onFilter({'launch_success': 'true'})}><span>True</span></button>
	            		<button onClick={() => onFilter({'launch_success': 'false'})}><span>False</span></button>
	            		<p>Successful Landing</p>
	            		<button onClick={() => onFilter({'landing_success': 'true'})}><span>True</span></button>
	            		<button onClick={() => onFilter({'landing_success': 'false'})}><span>False</span></button>
	            		</Col>
			        </Row>
			 	</Col>
			 	<Col sm={10}>
				 	<Row>
				 		{missionData.map((item,i) =>{
			            return(
			              <Col sm={3}  key={i} className="mt30">
			              	<div className="card">
			              		<div className="mission_img">
		                          <img src={item.links.mission_patch}/>
		                        </div>
		                        <div className="mission_details">
									<h5><span>{item.mission_name} #{item.flight_number}</span></h5>
									<p>Mission Id : <span>{item.mission_id}</span></p>
									<p>Launch Year : <span>{item.launch_year}</span></p>
									<p>Successful Launch : <span>{item.launch_success}</span></p>
									<p>Successful Landing : <span>{item.launch_landing}</span></p>
								</div>
							</div>
			              </Col>
			            )
			          })}
			         </Row>
			 	</Col>
			    
			</Row>
		</Container>
	
	)
}

export default Home
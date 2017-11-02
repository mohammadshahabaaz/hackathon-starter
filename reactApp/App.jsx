import React from 'react';
import axios from'axios';
import Button from 'material-ui/Button';
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            posts:[]
        };

        this.updateVenuesList = this.updateVenuesList.bind(this);
        this.updateEditId = this.updateEditId.bind(this);
    }


    componentDidMount() {
        axios.get(`/api/venuesList`)
            .then(res => {
                console.log(res)
                const posts=res.data.values;
                this.setState({posts});
            });
    }

    updateEditId(id){
        this.setState({editId:id})
    }

    updateVenuesList(){
        axios.get(`/api/venuesList`)
            .then(res => {
                console.log(res)
                const posts=res.data.values;
                this.setState({posts});
            });

    }


    render(){
        return(
            <div>
                <h4>VenueList:</h4>

                <ul>
                    {this.state.posts.map((venue,i)=><Venue key={i} data={venue} updateEditId={this.updateEditId}/> )}

                </ul>
                CreateVenue: <CreateVenue xyz={this.updateVenuesList}/>
                <EditVenue editId={this.state.editId}/>

            </div>
        );
    }
}



class Venue extends React.Component{
    constructor(props){
        super(props);
        this.sendEditId = this.sendEditId.bind(this);
    }

    sendEditId(){

        this.props.updateEditId(this.props.data._id)
    }

    render(){
        return(
            <ul>

                <li><div>{this.props.data._id}</div></li>
                <li><div>{this.props.data.name}</div></li>
                <li><div>{this.props.data.email}</div></li>
                <input type="Button" value="edit" onClick={this.sendEditId} />

            </ul>



        );
    }
}
class CreateVenue extends React.Component{
    constructor(props){

        super(props);
        this.updateEmail = this.updateEmail.bind(this);
        this.createVenue = this.createVenue.bind(this);
        this.state={
            email:"",
            phone:"9581469690"
        };
    }
    updateEmail(e){
        this.setState({email:e.target.value})
        console.log(e.target.value)
        console.log(this.state)
    }
    createVenue(e) {
        axios.post(`/api/createVenue`,this.state)
            .then(res => {
                console.log(res.data.status)
                // const email=res;

                this.props.xyz()

            });
    }
    render(){
        return(
            <div>
                <input type="text" value={this.state.value}  onChange={this.updateEmail} />

                <Button onClick={this.createVenue} >Create</Button>
                {/*<input type="button" value="UpdateEmail" onClick={this.createVenue} />*/}
            </div>
        )
    }
}

class EditVenue extends React.Component{
    constructor(props){
        super(props);
        this.update = this.update.bind(this)
    }
    update(e){
        console.log(this.props);
    }


    render(){
        return(


            <Button onClick={this.update}>Update</Button>
        )
    }
}

export default App;
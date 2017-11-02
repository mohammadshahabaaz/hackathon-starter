import React from 'react';
import axios from'axios';
import Button from 'material-ui/Button';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            venues:[]
        }
    }
    componentDidMount() {
        axios.get(`/api/venuesList`)
            .then(res => {
                console.log(res)
                const venues=res.data.values;
                this.setState({venues});
            });
    }
    
    render() {
        var VenueListStyle = {
            color:'blue'
        }
        return (
            <div>
                    <h1>VenueList:</h1>
              <h4 style={VenueListStyle}> {this.state.venues.map((venue, i) => <VenueList key = {i}
                                                                  data = {venue} />)} </h4>


            <CreateVenue/>
            </div>
        )
    }
}

    class VenueList extends React.Component {
        render() {
        return (
            <ul>
                <li><div>{this.props.data._id}</div></li>
                <li><div>{this.props.data.name}</div></li>
                <li><div>{this.props.data.email}</div></li>

            </ul>

        );
    }
    }
    // Create Venue
    class CreateVenue extends React.Component {
            constructor(props){
                super(props);
                this.createVenue = this.createVenue.bind(this);
                this.updateEmail = this.updateEmail.bind(this);
                this.state={
                    email:"",
                    phone:""
                }
            }
        createVenue(e) {
            axios.post(`/api/createVenue`,this.state)
                .then(res => {
                    console.log(res.data.status)
                    // const email=res;

                    //this.props.xyz()

                });
        }
        updateEmail(e){
                this.setState({email:e.target.value})
        }
    render(){
        return(
            <form>
                <label>
                    Name:
                    <input type="text" name="name" defaultValue={this.state.value}  onChange={this.updateEmail} />
                </label>
                <Button  onClick={this.createVenue}>Create</Button>
            </form>
        )
    }
    }

export default App;
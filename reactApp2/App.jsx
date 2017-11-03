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
    updateVenuesList(){
        axios.get(`/api/venuesList`)
            .then(res => {
                console.log(res);
                const venues=res.data.values;
                this.setState({venues});
            });

    }
    render() {
        var VenueListStyle = {
            color:'blue'
        }
        var CreateVenueStyle={
            backgroundColor: "yellow",
           // justifyContent: 'flex-end'
        }

        return (
            <div>
                    <h1>Venue List:</h1>
              <h4 style={VenueListStyle}> {this.state.venues.map((venue, i) => <VenueList key = {i}
                                                                  data = {venue} />)} </h4>

                <h1>Create Venue</h1>
            <CreateVenue xyz={this.updateVenuesList()}/>
            </div>
        )
    }
}

    class VenueList extends React.Component {
        render() {

        return (
            <ul >
                <li><div>{this.props.data._id}</div></li>
                <li><div>{this.props.data.name}</div></li>
                <li><div>{this.props.data.email}</div></li>
                <li><div>{this.props.data.phone}</div></li>

            </ul>

        );
    }
    }
    // Create Venue
    class CreateVenue extends React.Component {
            constructor(props){
                super(props);
                this.createVenue = this.createVenue.bind(this);
                this.updateName = this.updateName.bind(this);
                this.updateEmail = this.updateEmail.bind(this);
                this.updatePhone = this.updatePhone.bind(this);
                this.state={
                    name:"",
                    email:"",
                    phone:""
                }
            }
        createVenue(e) {
            axios.post(`/api/createVenue`,this.state)
                .then(res => {
                    console.log(res.data.status)
                    // const email=res;

                    this.props.xyz()


                });
        }
        updateName(e){
            this.setState({name:e.target.value})
        }
        updateEmail(e){
                this.setState({email:e.target.value})
        }
        updatePhone(e){
            this.setState({phone:e.target.value})
        }
    render(){
        return(
            <form>
                <label>
                    Name:
                    <input type="text" name="name" defaultValue={this.state.value}  onChange={this.updateName} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" defaultValue={this.state.value}  onChange={this.updateEmail} />
                </label>
                <label>
                    Phone:
                    <input type="text" name="phone" defaultValue={this.state.value}  onChange={this.updatePhone} />
                </label>
                <Button  onClick={this.createVenue}>Create</Button>
            </form>
        )
    }
    }

export default App;
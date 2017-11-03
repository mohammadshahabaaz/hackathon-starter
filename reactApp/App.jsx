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

    updateEditId(id,name,email,phone){
        this.setState({editId:id,editName:name,editEmail:email,editPhone:phone})


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

                <EditVenue editId={this.state.editId} editName={this.state.editName} editEmail={this.state.editEmail} editPhone={this.state.editPhone}/>
                <h4>VenueList:</h4>

                <ul>
                    {this.state.posts.map((venue,i)=><Venue key={i} data={venue} updateEditId={this.updateEditId}/> )}

                </ul>
                CreateVenue: <CreateVenue xyz={this.updateVenuesList}/>

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

        this.props.updateEditId(this.props.data._id,this.props.data.name,this.props.data.email,this.props.data.phone)
    }

    render(){
        return(
            <ul>
                <li><div>{this.props.data._id}</div></li>
                <li><div>{this.props.data.name}</div></li>
                <li><div>{this.props.data.email}</div></li>
                <li><div>{this.props.data.phone}</div></li>

                <input type="Button" value="edit" readOnly onClick={this.sendEditId} />

            </ul>



        );
    }
}
class CreateVenue extends React.Component{
    constructor(props){

        super(props);
        this.updateEmail = this.updateEmail.bind(this);
        this.createVenue = this.createVenue.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updatePhone = this.updatePhone.bind(this);
        this.state={
            name:"",
            email:"",
            phone:""
        };
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
    createVenue(e) {
        axios.post(`/api/createVenue`,this.state)
            .then(res => {
                console.log(res.data.status)

                this.props.xyz()

            });
    }
    render(){
        return(
            <div>
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
           /*{ <form>
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
                <Button onClick={this.update}>Update</Button>
            </form>}*/
            <Button onClick={this.update}>Update</Button>
                    )
    }
}

export default App;
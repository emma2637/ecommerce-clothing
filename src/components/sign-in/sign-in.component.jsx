import React from 'react'
import FormInput from '../../components/form-input/form-input.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import {signInWithGoogle} from '../../firebase/firebase.utils'
import './sign-in.styles.scss'

class SignIn extends React.Component{
constructor(props){
    super (props);
    this.state ={
        email:'',
        password:''
    }
}
handleSubmit=event=>{
    event.preventDefault();
    this.setState({email:'',password:''})
}

handleChange=e=>{
    const {value, name }= e.target;
    this.setState({[name]:value})//dinamically  seeting property value
}
render(){
    return(
        <div className='sign-in'>
             <h2>I have already an account</h2>   
             <span>Sign in with your email and password</span>

             <form onSubmit={this.handleSubmit}>
                 <FormInput name="email" type="email" 
                            value={this.state.email} required
                            handleChange={this.handleChange}
                            label="email"/>
                 <FormInput name="password" type="password" 
                 value={this.state.password} required 
                 handleChange={this.handleChange}
                 label="password"/>
                <CustomButton type="submit" >Sign In</CustomButton>
                <CustomButton onclick={signInWithGoogle} > Sign In with Google</CustomButton>
             </form>

        </div>
    )
}
}
export default SignIn
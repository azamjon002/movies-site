/* eslint-disable react/prop-types */
import { Component } from 'react'
import Error from '../error/error'
import "./error-boundary.scss"

class ErrorBoundary extends Component {
  
    state = {
        error: false
    }

    componentDidCatch(){
        this.setState({error:true})
    }

    render(){
        const { error } = this.state

        if(error){
            return <Error/>
        }

        return this.props.children
    }
}
export default ErrorBoundary
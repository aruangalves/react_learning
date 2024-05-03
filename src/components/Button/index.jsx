import './styles.css';

import { Component } from "react";

export class Button extends Component{
    render(){
        const {disabled, onClick, text} = this.props;        

        return(
            <button disabled={disabled} className='btn' onClick={onClick}>{text}</button>
        );
        
    }
}
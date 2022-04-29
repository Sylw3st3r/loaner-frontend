import { Fragment, useRef } from "react"

export default function FormInput(props){
    const inputRef = useRef();
    const {name} = props;
    function changeInputHandler(){
        console.log(inputRef.current.value);
        props.setInput(name,inputRef.current.value)
    }
    return<Fragment>
        <label>{name}</label>
        <input type={props.type} onChange={changeInputHandler} ref={inputRef}></input>
    </Fragment>
}
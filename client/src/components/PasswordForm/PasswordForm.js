import React from "react";
import {FormGroup, FormControl, Button} from "react-bootstrap";
const PasswordForm =props => (
    
    <div>
        {props.message && <h3>wrong password</h3>}
        <FormGroup controlId={props.volunteer_id} bsSize="large">
            <FormControl
            type="password"
            value={props.password}
            placeholder="password"
            onChange={props.handlePasswordChange}
            />
            </FormGroup>
            <Button
                bsSize="large"
                type="submit"
                onClick={props.onSubmitPassword}
            >
                submit
            </Button>
            
    </div>
        
    
)
export default PasswordForm;
import { Button } from "@mui/material";

const SignupButton = () => {

    const handleSignUpClick = async () => {
        //console.log("sign up email");
        
        // check if both password fields are the same

        // check lengths of all fields



        const formData = new FormData();

        try {
            const response = await fetch('/api/createAccount', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                // Set user logged in through auth context

                // bring user to home page
    
                alert('Account created successfully');
            } else {
                // Handle server errors (e.g., validation errors)
                const errorData = await response.json();
                alert(`Failed to create account: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile.');
        }
    };

    return (
        <Button sx={{ minWidth: 150 }} variant="contained" onClick={handleSignUpClick}>
            Sign Up
        </Button>
    );
};

export default SignupButton;

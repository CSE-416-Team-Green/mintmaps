import { Button } from "@mui/material";

const SignupButton = () => {

    const handleSignUpClick = async () => {
        console.log("sign up email");
        
        const formData = new FormData();
        //formData.append('username', username);
        //formData.append('bio', bio);

        try {
            const response = await fetch('/api/createAccount', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                // Assuming the server sends back the updated user data
                const updatedData = await response.json();
                // Update the state with the updated data
                //setUsername(updatedData.username);
                //setBio(updatedData.bio);
    
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

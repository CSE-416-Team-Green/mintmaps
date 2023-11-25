import { useEffect } from 'react';

export default function GetMap() {
    useEffect(() => {
        //console.log("hellp");
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/getmap?name=cc`, {
                    method: 'GET',
                });
                if (response.ok) {
                   //console.log("work")
                }
                const data = await response.json();
                if(data){
                    console.log("we get data")
                }
                console
                console.log("12312");
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []); // Empty dependency array means this effect runs once after the component mounts

    return (
        <div>
            {}
        </div>
    );
}

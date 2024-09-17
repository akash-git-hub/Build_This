// Function to validate email
export const validateEmail = (email) => {
    // Simple regex pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};


export const option =[
    {name:"ABCD",value:"abcd"},
    {name:"XYZ",value:"xyz"}
]
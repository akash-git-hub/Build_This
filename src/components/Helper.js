// Function to validate email
export const validateEmail = (email) => {
    // Simple regex pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};


export const option =[
    {name:"Hindi",value:"123"},
    {name:"English",value:"english"}
]
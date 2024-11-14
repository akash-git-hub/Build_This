// Function to validate email
export const validateEmail = (email) => {
    // Simple regex pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};


export const option = [
    { name: "AR", value: "AR" },
    { name: "VR", value: "VR" },
    { name: "App-Development", value: "App-Development" },
    { name: "Web-Development", value: "Web-Development" }
]

export const filterProjectStatus = (option, status) => {
    const data = option.filter((e) => e.value === status);
    return data[0]?.name;
}

export const optionAccept = [
    { name: "Pending", value: "pending" },
    { name: "Accept", value: "accept" },
    { name: "Rejected", value: "rejected" }
]





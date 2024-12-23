import moment from "moment-timezone";

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

export const projectStatus = [
    { name: "Pending", value: 'pending' },
    { name: "Active", value: 'active' },
    { name: "Rejected", value: 'rejected' }
];


export const optionAccept = [
    { name: "Pending", value: "pending" },
    { name: "Accept", value: "accept" },
    { name: "Rejected", value: "rejected" }
]


export const skillsOption = [
    { name: "Composer", value: "Composer" },
    { name: "Graphic designer", value: "Graphic designer" },
    { name: "Coder", value: "Coder" },
    { name: "Roboticist", value: "Roboticist" },
    { name: "System architect", value: "System architect" },
    { name: "UX UI designer", value: "UX UI designer" },
    { name: "Mobile developer", value: "Mobile developer" },
    { name: "Game designer", value: "Game designer" },
    { name: "Software designer", value: "Software designer" },
]





export const getDayDifference = (startDate, endDate) => {
    // Create moment objects for start and end dates
    const start = moment(startDate);
    const end = moment(endDate);
    
    // Check if both dates are valid
    if (!start.isValid() || !end.isValid()) {
      return "Invalid date(s)";
    }
    
    // Calculate and return the difference in days
    return end.diff(start, 'days');
  }
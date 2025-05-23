export const TABLE_HEAD = [
  "Id",
  "service",
  "ProviderID",
  "Customer",
  "Date",
  "Amount",
  "Method",
  "Status",
];
export const TABLE_ROWS = [
  {
    id: 1144315,
    service: "Bathroom Cleaning",
    providerid: 102,
    customer: "Nirav Bhatiya",
    date: "01-03-23",
    amount: 1200,
    method: "Online Payment",
    status: "Approved",
  },
  {
    id: 1144316,
    service: "Manicure",
    providerid: 105,
    customer: "Aarohi Patel",
    date: "13-11-2022",
    amount: 1200,
    method: "Online Payment",
    status: "Pending",
  },
  {
    id: 1144317,
    service: "Home cleaning",
    providerid: 108,
    customer: "Kavya Sharma",
    date: "10-03-023",
    amount: 5550,
    method: "Online Payment",
    status: "Approved",
  },
  {
    id: 1144318,
    service: "Micro wave",
    providerid: 112,
    customer: "Aditya Singh",
    date: "11-11-2023",
    amount: 1000,
    method: "Online Payment",
    status: "Pending",
  },
  {
    id: 1144319,
    service: "Facial",
    providerid: 115,
    customer: "Riya Verma",
    date: "20-03-2023",
    amount: 1200,
    method: "Online Payment",
    status: "Approved",
  },
  {
    id: 1144320,
    service: "Hair trim",
    providerid: 118,
    customer: "Kabir Kapoor",
    date: "21-02-2022",
    amount: 800,
    method: "Online Payment",
    status: "Pending",
  },
  {
    id: 1144321,
    service: "Plumber",
    providerid: 122,
    customer: "Sanya Joshi",
    date: "01-04-2023",
    amount: 1500,
    method: "Online Payment",
    status: "Approved",
  },
  {
    id: 1144322,
    service: "Waxing",
    providerid: 125,
    customer: "Nidhi Vataliya",
    date: "01-02-2023",
    amount: 1000,
    method: "Online Payment",
    status: "Pending",
  },
  {
    id: 1144323,
    service: "Massage",
    providerid: 128,
    customer: "Tanvi Singhania",
    date: "23-05-2023",
    amount: 3000,
    method: "Online Payment",
    status: "Approved",
  },
];

//Reviews
export const ReviewHead = [
  "FeedbackID",
  "ServiceName",
  "UserName",
  "Rating",
  "Comment",
];
export const ReviewRows = [
  {
    feedbackid: 1,
    servicename: "Classic Bathroom Cleaning",
    username: "Aarushi Goel",
    rating: 5,
    comment:
      "This is an excellent product, the documentation is excellent and helped me get things done more efficiently.",
  },
  {
    feedbackid: 2,
    servicename: "Home Cleaning",
    username: "Rahul Kapoor",
    rating: 4,
    comment:
      "I am satisfied with the service. The professionals were punctual and did a great job.",
  },
  {
    feedbackid: 4,
    servicename: "Plumbing",
    username: "Aditya Singh",
    rating: 5,
    comment:
      "Exceptional service! The team went above and beyond to meet my expectations.",
  },
  {
    feedbackid: 5,
    servicename: "Waxing",
    username: "Riya Verma",
    rating: 4,
    comment: "Good service, but the response time could be quicker.",
  },
  {
    feedbackid: 6,
    servicename: "Facial",
    username: "Kabir Kapoor",
    rating: 3,
    comment: "The service was okay, but I expected better results.",
  },
];
//Prviding Services

export const ServiceOfferedHead = [
  "ServiceID",
  "MiniCategoryName",
  "Price",
  "AdminComission",
  "ServiceTime",
  "YOE",
  "CreatedAt",
  "UpdatedAt",
  "",
];
export const ServiceOfferedRows = [
  {
    serviceid: 101,
    minicategoryname: "Bathroom Cleaning",
    price: 300,
    admincomission: "5%",
    servicetime: "2hrs",
    yoe: "2years",
    createdat: "21-12-23",
    updatedat: "12-01-24",
  },
  {
    serviceid: 102,
    minicategoryname: "Threading",
    price: 450,
    admincomission: "5%",
    servicetime: "3hrs",
    yoe: "3years",
    createdat: "05-01-22",
    updatedat: "20-01-22",
  },
  {
    serviceid: 103,
    minicategoryname: "Appliance",
    price: 250,
    admincomission: "5%",
    servicetime: "1hr",
    yoe: "1.5years",
    createdat: "10-02-23",
    updatedat: "25-02-23",
  },
  {
    serviceid: 104,
    minicategoryname: "Full home cleaning",
    price: 350,
    admincomission: "5%",
    servicetime: "2hrs",
    yoe: "2years",
    createdat: "15-03-23",
    updatedat: "30-03-23",
  },
];

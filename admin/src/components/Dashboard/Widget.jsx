const Widget = ({ type, datas }) => {
  let data;
  switch (type) {
    case "user":
      data = {
        title: "TOTAL CUSTOMERS",
        isMoney: false,

        icon: (
          <i
            className="fa-regular fa-user"
            style={{
              color: "crimson",
              fontSize: "2rem",
              backgroundColor: "rgb(246, 212, 212)",
              padding: "1rem",
              borderRadius: "20%",
              marginTop: "0.6rem",
            }}
          ></i>
        ),
      };
      break;
    case "aprovider":
      data = {
        title: " Active Providers",
        isMoney: false,

        icon: (
          <i
            className="fa-regular fa-user"
            style={{
              color: "green",
              fontSize: "2rem",
              backgroundColor: "lightgreen",
              padding: "1rem",
              borderRadius: "20%",
              marginTop: "0.6rem",
            }}
          ></i>
        ),
      };
      break;
    case "dprovider":
      data = {
        title: " Deactive Providers",
        isMoney: false,

        icon: (
          <i
            className="fa-regular fa-user"
            style={{
              color: "crimson",
              fontSize: "2rem",
              backgroundColor: "rgb(246, 212, 212)",
              padding: "1rem",
              borderRadius: "20%",
              marginTop: "0.6rem",
            }}
          ></i>
        ),
      };
      break;
    case "tprovider":
      data = {
        title: " Total Providers",
        isMoney: false,

        icon: (
          <i
            className="fa-regular fa-user"
            style={{
              color: "blue",
              fontSize: "2rem",
              backgroundColor: "lightblue",
              padding: "1rem",
              borderRadius: "20%",
              marginTop: "0.6rem",
            }}
          ></i>
        ),
      };
      break;
    case "Torders":
      data = {
        title: "TOTAL ORDER",
        isMoney: false,

        icon: (
          <i
            className="fa-solid fa-cart-shopping"
            style={{
              color: "blue",
              fontSize: "2rem",
              backgroundColor: "lightblue",
              padding: "1rem",
              borderRadius: "20%",
              marginTop: "0.6rem",
            }}
          ></i>
        ),
      };
      break;
    case "Porders":
      data = {
        title: " Cancelled Orders",
        isMoney: false,

        icon: (
          <i
            className="fa-regular fa-user"
            style={{
              color: "crimson",
              fontSize: "2rem",
              backgroundColor: "rgb(246, 212, 212)",
              padding: "1rem",
              borderRadius: "20%",
              marginTop: "0.6rem",
            }}
          ></i>
        ),
      };
      break;
    case "Corders":
      data = {
        title: " Completed Orders",
        isMoney: false,

        icon: (
          <i
            className="fa-regular fa-user"
            style={{
              color: "green",
              fontSize: "2rem",
              backgroundColor: "lightgreen",
              padding: "1rem",
              borderRadius: "20%",
              marginTop: "0.6rem",
            }}
          ></i>
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNING",
        isMoney: true,

        icon: (
          <i
            className="fa-regular fa-dollar-sign"
            style={{
              color: "crimson",
              fontSize: "2rem",
              backgroundColor: "rgb(246, 212, 212)",
              padding: "1rem",
              borderRadius: "20%",
              marginTop: "0.6rem",
            }}
          ></i>
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,

        icon: (
          <i
            className="fa-solid fa-wallet"
            style={{
              color: "crimson",
              fontSize: "2rem",
              backgroundColor: "rgb(246, 212, 212)",
              padding: "1rem",
              borderRadius: "20%",
              marginTop: "0.6rem",
            }}
          ></i>
        ),
      };
  }
  return (
    <div className="widget shadow-md flex justify-between flex-1 p-4 rounded-lg h-28 bg-white">
      <div className="left flex flex-col justify-between">
        <span className="font-bold text-sm text-lightgray">{data.title}</span>
        <span className="text-4xl font-light">
          {data.isMoney ? `Rs. ${datas}` : datas}
        </span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};
export default Widget;

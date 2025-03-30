import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../../images/blacklogo.png";
import { sidebarLinksAdmin, sidebarLinksSp } from "../../../Data/SidebarLinks";
import { useAuth } from "../../../Context/AuthContext";

const Sidebar = ({ handleReportClick }) => {
  const history = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const Loggedin = localStorage.getItem("Loggedin");

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    history("/login");
  };

  return (
    <div className="sidebar shadow-xl">
      <div className="top">
        <Link to="/home">
          <span className="logo">
            <img src={logo} alt="logo"></img>
          </span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {Loggedin === "admin" &&
            sidebarLinksAdmin.map((item, index) => (
              <div key={index}>
                {item.label === "Reports" ? (
                  <div className="my-10">
                    <span className="text-xl text-gray-600">{item.label}</span>
                    <ul>
                      <li className="ml-5 p-1 hover:bg-yellow-500 my-5">
                        <Link
                          to="/admin/report/feedback-report"
                          onClick={() => handleReportClick("Feedback")}
                        >
                          <span>Feedback Report</span>
                        </Link>
                      </li>
                      <li className="ml-5 p-1 hover:bg-yellow-500 my-5">
                        <Link
                          to="/admin/report/totalSales-report"
                          onClick={() => handleReportClick("TotalSales")}
                        >
                          <span>Total Sales Report</span>
                        </Link>
                      </li>
                      <li className="ml-5 p-1 hover:bg-yellow-500 my-5">
                        <Link
                          to="/admin/report/MostPopular-report"
                          onClick={() => handleReportClick("MostPopular")}
                        >
                          <span>Most Popular Service Report</span>
                        </Link>
                      </li>
                      <li className="ml-5 p-1 hover:bg-yellow-500 my-5">
                        <Link
                          to="/admin/report/booking-report"
                          onClick={() => handleReportClick("Booking")}
                        >
                          <span>Booking Report</span>
                        </Link>
                      </li>
                      <li className="ml-5 p-1 hover:bg-yellow-500 my-5">
                        <Link
                          to="/admin/report/category-report"
                          onClick={() => handleReportClick("Category")}
                        >
                          <span>Category Report</span>
                        </Link>
                      </li>
                      <li className="ml-5 p-1 hover:bg-yellow-500 my-5">
                        <Link
                          to="/admin/report/chat-report"
                          onClick={() => handleReportClick("Chat")}
                        >
                          <span>Chat Report</span>
                        </Link>
                      </li>
                      <li className="ml-5 p-1 hover:bg-yellow-500 my-5">
                        <Link
                          to="/admin/report/service-report"
                          onClick={() => handleReportClick("Service")}
                        >
                          <span>Service Report</span>
                        </Link>
                      </li>
                      <li className="ml-5 p-1 hover:bg-yellow-500 my-5">
                        <Link
                          to="/admin/report/ServiceProvider-report"
                          onClick={() => handleReportClick("ServiceProvider")}
                        >
                          <span>ServiceProvider Report</span>
                        </Link>
                      </li>
                      {/* Add more report options here as needed */}
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className="text-xl text-gray-600 my-10"
                    key={index}
                  >
                    <li className="ml-5 p-1 hover:bg-yellow-500 my-5">
                      <span>{item.label}</span>
                    </li>
                  </Link>
                )}
              </div>
            ))}

          {Loggedin === "serviceprovider" &&
            sidebarLinksSp.map((item, index) => (
              <Link
                to={item.to}
                className="text-xl text-gray-600 my-10"
                key={index}
              >
                <li className="ml-5 p-1 hover:bg-yellow-500 my-5">
                  <span>{item.text}</span>
                </li>
              </Link>
            ))}
          {Loggedin && (
            <li
              className="text-xl text-gray-600 my-10 ml-5 p-1 hover:bg-yellow-500 "
              onClick={handleLogout}
            >
              <span>Logout</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

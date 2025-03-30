import { Routes, Route } from "react-router-dom";
import { NotFound } from "./Pages/NotFound";
import VisitorPage from "./Pages/Customer/VisitorPage/VisitorPage";
import Login from "./components/Login/Login";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard";
import SpDashboard from "./Pages/Provider/Dashboard/SpDashboard";
import Category1 from "./Pages/Customer/category/Category1";
import {
  CleanService,
  ApplianceService,
  EPCService,
  Womensalon,
  HairStudio,
  MenSalon,
} from "./Data/Customer/Database";
import DateTime from "./Pages/Customer/DateTime";
import { Category2 } from "./Pages/Customer/category/Category2";
import Register from "./components/Login/Register";
import Order from "./Pages/Customer/Order";
import Payment from "./Pages/Customer/Payment";
import { BookingDetails } from "./Pages/Customer/BookingDetails";
import Customer from "./Pages/Admin/customer/Customer";
import Provider from "./Pages/Admin/Sp/Provider";
import SingleProvider from "./components/Admin/Sp/Single/SingleProvider";
import Service from "./Pages/Admin/services/Service";
import Offer from "./Pages/Admin/offer/Offers";
import Report from "./Pages/Admin/Report/Report";
import { Chatview } from "./Pages/Admin/chat/ChatView";
import Chat from "./Pages/Admin/chat/Chats";
import Review from "./Pages/Admin/review/Reviews";
import Profile from "./Pages/Customer/Profile";
import Reviews from "./Pages/Provider/Review/Reviews";

import Availability from "./Pages/Provider/avalability/Availability";
import AOrder from "./Pages/Admin/order/Order";
import AdminProfile from "./Pages/Admin/AdminProfile";
import Earnings from "./Pages/Provider/Earnings";
import ProvideService from "./Pages/Provider/services/ProvidingService";
import ChatsBoard from "./Pages/Provider/chats/Chatpanel";
import OrderSP from "./Pages/Provider/OrderSp/OrderSp";
import SpProfile from "./Pages/Provider/SpProfile";
function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<VisitorPage />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="category1/:id" element={<Category1 />} />
          <Route
            path="home/cleaning"
            element={<Category1 data={CleanService} />}
          />

          <Route
            path="home/appliancerepair"
            element={<Category1 data={ApplianceService} />}
          />
          <Route
            path="home/electriccarpenterplumber"
            element={<Category1 data={EPCService} />}
          />
          <Route
            path="/grooming/womensalon"
            element={<Category1 data={Womensalon} />}
          />

          <Route
            path="/grooming/womenhair"
            element={<Category1 data={HairStudio} />}
          />
          <Route
            path="/grooming/mensalon"
            element={<Category1 data={MenSalon} />}
          />
          <Route path="datentime" element={<DateTime />} />
          <Route path="Cat" element={<Category2 />} />
          <Route path="order" element={<Order />} />
          <Route path="payment" element={<Payment />} />
          <Route path="bookingdetails" element={<BookingDetails />} />
          <Route path="bookingdetails/:id" element={<BookingDetails />} />
          <Route path="profile" element={<Profile />} />

          {/* Admin Links */}
          <Route path="admin/home" element={<AdminDashboard />} />
          <Route path="admin/customers" element={<Customer />} />
          <Route path="admin/providers">
            <Route index element={<Provider />} />
            <Route path=":providerId" element={<SingleProvider />} />
          </Route>

          <Route path="admin/services">
            <Route index element={<Service />} />
          </Route>
          <Route path="admin/offers">
            <Route index element={<Offer />} />
            {/* <Route path=":providerId" element={<Single />} /> */}
          </Route>
          <Route path="admin/reviews" element={<Review />} />
          <Route path="admin/chats">
            <Route index element={<Chat />} />
            <Route path=":chatview" element={<Chatview />} />
          </Route>
          <Route path="admin/orders" element={<AOrder />} />
          <Route path="admin/profile" element={<AdminProfile />} />
          <Route
            path="/admin/report/category-report"
            element={<Report rtype="Category" />}
          />
          <Route
            path="/admin/report/feedback-report"
            element={<Report rtype="Feedback" />}
          />
          <Route
            path="/admin/report/service-report"
            element={<Report rtype="Service" />}
          />
          <Route
            path="/admin/report/booking-report"
            element={<Report rtype="Booking" />}
          />
          <Route
            path="/admin/report/totalSales-report"
            element={<Report rtype="TotalSales" />}
          />
          <Route
            path="/admin/report/MostPopular-report"
            element={<Report rtype="MostPopular" />}
          />
          <Route
            path="/admin/report/ServiceProvider-report"
            element={<Report rtype="ServiceProvider" />}
          />
          <Route
            path="/admin/report/Chat-report"
            element={<Report rtype="Chat" />}
          />
          {/* Serviceprovider  */}

          <Route path="serviceprovider/home" element={<SpDashboard />} />
          <Route path="serviceprovider/profile" element={<SpProfile />} />
          <Route path="serviceprovider/earnings" element={<Earnings />} />
          <Route path="serviceprovider/services" element={<ProvideService />} />
          <Route path="serviceprovider/reviews" element={<Reviews />} />
          <Route path="serviceprovider/orders" element={<OrderSP />} />
          <Route path="serviceprovider/chats">
            <Route index element={<ChatsBoard />} />
            <Route path=":chatview" element={<Chatview />} />
          </Route>
          <Route
            path="serviceprovider/availability"
            element={<Availability />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

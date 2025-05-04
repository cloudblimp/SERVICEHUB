// import { Button, Drawer, Select, Option } from "@material-tailwind/react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getdata } from "../../../services/Apis";
// import { toast, ToastContainer } from "react-toastify";

// export const Cart = ({ id, name, price }) => {
//   const [open, setOpen] = useState(false);
//   const [minicat, setminicat] = useState([]);
//   const openDrawer = () => setOpen(true);
//   const closeDrawer = () => setOpen(false);
//   const [loading, setLoading] = useState(true);
//   const [offers, setOffers] = useState([]);
//   const [selectedOffer, setSelectedOffer] = useState(null);
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const fetchFilteredOffers = async () => {
//     try {
//       const response = await getdata("/offer/OfferForService");
//       setOffers(response.data);
//     } catch (error) {
//       console.error("Error fetching offers:", error);
//     }
//   };
//   const navigate = useNavigate();
//   useEffect(() => {
//     fetchFilteredOffers();
//   }, []);
//   useEffect(() => {
//     fetchData();
//   }, []);
//   const fetchData = async () => {
//     const id = localStorage.getItem("MinicatID");
//     try {
//       const response = await getdata(`/minicat/getMiniCatByID/${id}`);
//       setminicat(response.data.data);
//       setLoading(false); // Set loading to false after data is fetched
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setLoading(false); // Set loading to false in case of an error
//       toast.error("Error fetching data"); // Show error toast
//     }
//   };

//   localStorage.setItem("serviceID", id);

//   const handleOfferChange = (value) => {
//     setSelectedOffer(value); // Update selectedOffer state when an option is selected
//   };
//   useEffect(() => {
//     if (selectedOffer) {
//       setDiscountAmount((price * selectedOffer.discount) / 100);
//     }
//   }, [selectedOffer, price]);

//   let grandTotal = price - discountAmount;

//   const handleCheckout = () => {
//     localStorage.setItem("Price", grandTotal);
//     navigate("/order");
//   };
//   return (
//     <>
//       <Button
//         size="sm"
//         onClick={openDrawer}
//         className="m-2 bg-[#1A3570] rounded-none"
//       >
//         Select
//       </Button>
//       <Drawer
//         placement="right"
//         open={open}
//         onClose={closeDrawer}
//         className="p-4"
//       >
//         <ToastContainer />

//         {/* Render content based on loading state */}
//         {loading ? (
//           <p>Loading...</p> // Display loading indicator
//         ) : (
//           <div class="relative z-10" role="dialog" aria-modal="true">
//             <div className="fixed inset-0 overflow-hidden">
//               <div className="absolute inset-0 overflow-hidden">
//                 <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//                   <div className="pointer-events-auto w-screen max-w-md">
//                     <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
//                       <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
//                         <div className="flex items-start justify-between">
//                           <h2
//                             className="text-lg font-medium text-gray-900"
//                             id="slide-over-title"
//                           >
//                             Cart
//                           </h2>
//                           <div className="ml-3 flex h-7 items-center">
//                             <button
//                               type="button"
//                               className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
//                               onClick={closeDrawer}
//                             >
//                               <span className="absolute -inset-0.5"></span>
//                               <span className="sr-only">Close panel</span>
//                               <svg
//                                 className="h-6 w-6"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke-width="1.5"
//                                 stroke="currentColor"
//                                 aria-hidden="true"
//                               >
//                                 <path
//                                   stroke-linecap="round"
//                                   stroke-linejoin="round"
//                                   d="M6 18L18 6M6 6l12 12"
//                                 />
//                               </svg>
//                             </button>
//                           </div>
//                         </div>

//                         <div className="mt-8">
//                           <div className="flow-root">
//                             <ul
//                               role="list"
//                               className="-my-6 divide-y divide-gray-200"
//                             >
//                               <li className="flex py-6">
//                                 <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                                   <img
//                                     src={minicat?.[0]?.mini_cat_image || "default-image-url.jpg"}
//                                     alt="Mini Category"
//                                     className="h-full w-full object-cover object-center"
//                                   />
//                                 </div>

//                                 <div className="ml-4 flex flex-1 flex-col">
//                                   <div>
//                                     <div className="flex justify-between text-base font-medium text-gray-900">
//                                       <h3>{minicat[0].mini_cat_name}</h3>
//                                       <p className="ml-4">Rs{price}</p>
//                                     </div>
//                                     <p className="mt-1 text-sm text-gray-500">
//                                       {name}
//                                     </p>
//                                   </div>
//                                   <div className="flex flex-1 items-end justify-between text-sm">
//                                     <div className="flex">
//                                       <button
//                                         type="button"
//                                         className="font-medium text-indigo-600 hover:text-indigo-500"
//                                         onClick={closeDrawer}
//                                       >
//                                         Remove
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </li>
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//                         <div className="flex justify-between items-center text-base font-medium text-gray-900">
//                           <p className="mr-4">Discount</p>
//                           <Select
//                             label="Apply Coupon"
//                             className="py-5"
//                             value={selectedOffer}
//                             onChange={(option) => handleOfferChange(option)}
//                           >
//                             {offers.map((offer) => (
//                               <Option key={offer.id} value={offer}>
//                                 <p>{offer.title}</p>
//                                 <p className="text-[10px]">
//                                   {offer.description}
//                                 </p>
//                               </Option>
//                             ))}
//                           </Select>
//                         </div>
//                       </div>
//                       <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//                         <div>
//                           <span className="flex justify-between text-sm font-sm text-gray-900">
//                             <p>Subtotal</p>
//                             <p>Rs.{price}</p>
//                           </span>
//                           <span className="flex justify-between text-sm font-sm text-green-500">
//                             <p>Discount</p>
//                             <p>Rs.{discountAmount}</p>
//                           </span>
//                           <span className="flex justify-between text-base font-medium text-gray-900">
//                             <p>Grandtotal</p>
//                             <p>Rs.{grandTotal}</p>
//                           </span>
//                         </div>
//                         <p className="mt-0.5 text-sm text-gray-500">
//                           Shipping and taxes calculated at checkout.
//                         </p>
//                         <div className="mt-6">
//                           <a
//                             // href="/order"
//                             onClick={handleCheckout}
//                             className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
//                           >
//                             Checkout
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </Drawer>
//     </>
//   );
// };
import { Button, Drawer, Select, Option } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getdata } from "../../../services/Apis";
import { toast, ToastContainer } from "react-toastify";
import PropTypes from "prop-types";

// Default image URL for fallback
const DEFAULT_IMAGE_URL = "/path/to/default-image.jpg";

export const Cart = ({ id, name, price }) => {
  const [open, setOpen] = useState(false);
  const [minicat, setMinicat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const navigate = useNavigate();

  const openDrawer = () => {
    setOpen(true);
    localStorage.setItem("serviceID", id); // Set serviceID when drawer opens
  };
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch mini category
        const minicatId = localStorage.getItem("MinicatID");
        const minicatResponse = await getdata(`/minicat/getMiniCatByID/${minicatId}`);
        setMinicat(minicatResponse.data.data);

        // Fetch offers
        const offersResponse = await getdata("/offer/OfferForService");
        setOffers(offersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOfferChange = (offerId) => {
    setSelectedOfferId(offerId);
  };

  useEffect(() => {
    if (selectedOfferId) {
      const selectedOffer = offers.find((offer) => offer.id === selectedOfferId);
      if (selectedOffer) {
        setDiscountAmount((parseFloat(price) * selectedOffer.discount) / 100);
      }
    } else {
      setDiscountAmount(0);
    }
  }, [selectedOfferId, price, offers]);

  const grandTotal = parseFloat(price) - discountAmount;

  const handleCheckout = () => {
    localStorage.setItem("Price", grandTotal.toFixed(2));
    navigate("/order");
  };

  return (
    <>
      <Button
        size="sm"
        onClick={openDrawer}
        className="m-2 bg-primary rounded-none"
      >
        Select
      </Button>
      <Drawer placement="right" open={open} onClose={closeDrawer} className="p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="relative z-10" role="dialog" aria-modal="true">
            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <div className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                            Cart
                          </h2>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={closeDrawer}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {minicat && (
                                <li className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={minicat?.mini_cat_image || DEFAULT_IMAGE_URL}
                                      alt={minicat?.mini_cat_name || "Mini Category"}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{minicat.mini_cat_name}</h3>
                                        <p className="ml-4">Rs.{parseFloat(price).toFixed(2)}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{name}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={closeDrawer}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between items-center text-base font-medium text-gray-900">
                          <p className="mr-4">Discount</p>
                          <Select
                            label="Apply Coupon"
                            value={selectedOfferId}
                            onChange={handleOfferChange}
                          >
                            {offers.map((offer) => (
                              <Option key={offer.id} value={offer.id}>
                                <p>{offer.title}</p>
                                <p className="text-[10px]">{offer.description}</p>
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div>
                          <span className="flex justify-between text-sm font-sm text-gray-900">
                            <p>Subtotal</p>
                            <p>Rs.{parseFloat(price).toFixed(2)}</p>
                          </span>
                          <span className="flex justify-between text-sm font-sm text-green-500">
                            <p>Discount</p>
                            <p>Rs.{discountAmount.toFixed(2)}</p>
                          </span>
                          <span className="flex justify-between text-base font-medium text-gray-900">
                            <p>Grandtotal</p>
                            <p>Rs.{grandTotal.toFixed(2)}</p>
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <button
                            onClick={handleCheckout}
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

// Prop type validation
Cart.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
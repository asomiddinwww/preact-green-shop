import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Radio, message } from "antd";
import { useNavigate } from "react-router-dom";
import { CarOutlined, BankOutlined } from "@ant-design/icons";
import type { ShopCartType } from "../../../@types/inedx";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const { data, coupon } = useSelector((state: any) => state.shopSlice);
  const { user } = useSelector((state: any) => state.authSlice);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    state: "",
    zip: "",
    appartment: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || user.name || "",
        lastName: user.lastName || user.surname || "",
        email: user.email || "",
        phone: user.phone_number || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!data || data.length === 0) {
      navigate("/");
    }
  }, [data, navigate]);

  const subtotal =
    data?.reduce(
      (acc: number, item: ShopCartType) => acc + item.price * item.counter,
      0,
    ) || 0;
  const couponDiscount = coupon ? (subtotal * coupon) / 100 : 0;
  const shipping = 16.0;
  const total = subtotal - couponDiscount + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.length === 0) {
      message.error("Your cart is empty!");
      return;
    }
    setIsModalOpen(true);
  };

  const labelStyle =
    "text-[14px] font-medium text-[#4A4A4A] mb-1.5 flex items-center gap-1";
  const inputStyle =
    "w-full border border-[#E0E0E0] rounded-lg px-4 py-2.5 outline-none focus:border-[#46A358] focus:ring-2 focus:ring-[#46A358]/10 text-[14px] transition-all bg-white hover:border-[#46A358]/50";

  return (
    <div className="bg-[#F9FBFA] min-h-screen py-12">
      <div className="w-[92%] max-w-[1250px] m-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-[#3D3D3D]">Checkout</h1>
          <p className="text-gray-500 mt-1">
            Please enter your details to complete your purchase.
          </p>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="flex flex-col lg:flex-row gap-10 items-start"
        >
          <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
              <div className="w-8 h-8 bg-[#46A358] text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h2 className="text-xl font-bold text-[#3D3D3D]">
                Billing Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className={labelStyle}>
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className={inputStyle}
                  placeholder="John"
                />
              </div>
              <div className="space-y-1">
                <label className={labelStyle}>
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className={inputStyle}
                  placeholder="Doe"
                />
              </div>

              <div className="space-y-1">
                <label className={labelStyle}>
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  placeholder="Select country"
                  className={inputStyle}
                />
              </div>
              <div className="space-y-1">
                <label className={labelStyle}>
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  placeholder="City name"
                  className={inputStyle}
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className={labelStyle}>
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  placeholder="House number and street name"
                  className={inputStyle}
                />
                <input
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  className={`${inputStyle} mt-3`}
                />
              </div>

              <div className="space-y-1">
                <label className={labelStyle}>
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  placeholder="Select state"
                  className={inputStyle}
                />
              </div>
              <div className="space-y-1">
                <label className={labelStyle}>
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <input required placeholder="Zip code" className={inputStyle} />
              </div>

              <div className="space-y-1">
                <label className={labelStyle}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={inputStyle}
                  placeholder="example@mail.com"
                />
              </div>
              <div className="space-y-1">
                <label className={labelStyle}>
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex border border-[#E0E0E0] rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#46A358]/10 focus-within:border-[#46A358] transition-all">
                  <span className="bg-gray-50 px-4 py-2.5 text-gray-500 border-r border-[#E0E0E0] text-sm flex items-center">
                    +998
                  </span>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="flex-1 px-4 py-2.5 outline-none text-[14px]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                <div className="w-8 h-8 bg-[#46A358] text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-xl font-bold text-[#3D3D3D]">
                  Payment Method
                </h2>
              </div>

              <Radio.Group
                onChange={(e) => setPaymentMethod(e.target.value)}
                value={paymentMethod}
                className="flex! flex-col! w-full gap-4"
              >
                <div
                  className={`border rounded-xl p-4 transition-all hover:bg-gray-50 ${paymentMethod === "paypal" ? "border-[#46A358] bg-[#46A358]/5" : "border-gray-200"}`}
                >
                  <Radio value="paypal" className="w-full">
                    <div className="flex items-center gap-4 ml-2">
                      <span className="font-semibold text-gray-700">
                        PayPal / Cards
                      </span>
                      <div className="flex gap-2">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                          className="h-4"
                          alt="paypal"
                        />
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                          className="h-3"
                          alt="visa"
                        />
                      </div>
                    </div>
                  </Radio>
                </div>

                <div
                  className={`border rounded-xl p-4 transition-all hover:bg-gray-50 ${paymentMethod === "bank" ? "border-[#46A358] bg-[#46A358]/5" : "border-gray-200"}`}
                >
                  <Radio value="bank" className="w-full">
                    <span className="font-semibold text-gray-700 ml-2 flex items-center gap-2">
                      <BankOutlined /> Direct Bank Transfer
                    </span>
                  </Radio>
                </div>

                <div
                  className={`border rounded-xl p-4 transition-all hover:bg-gray-50 ${paymentMethod === "cash" ? "border-[#46A358] bg-[#46A358]/5" : "border-gray-200"}`}
                >
                  <Radio value="cash" className="w-full">
                    <span className="font-semibold text-gray-700 ml-2 flex items-center gap-2">
                      <CarOutlined /> Cash on Delivery
                    </span>
                  </Radio>
                </div>
              </Radio.Group>
            </div>
          </div>

          <div className="w-full lg:w-[400px] lg:sticky lg:top-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#3D3D3D] mb-6 border-b pb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {data?.map((item: ShopCartType) => (
                  <div key={item._id} className="flex gap-4 group">
                    <div className="relative overflow-hidden rounded-lg bg-gray-50 border border-gray-100 shrink-0">
                      <img
                        src={item.main_image}
                        alt={item.title}
                        className="w-16 h-16 object-cover transform group-hover:scale-110 transition-transform"
                      />
                      <span className="absolute -top-1 -right-1 bg-[#46A358] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                        {item.counter}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#3D3D3D] truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-400">
                        SKU: {item._id.slice(0, 8)}
                      </p>
                      <p className="text-[#46A358] font-bold text-sm mt-1">
                        ${(item.price * item.counter).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#F9FBFA] p-4 rounded-xl space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold text-gray-800">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Coupon Discount</span>
                  <span className="text-red-500 font-semibold">
                    -${couponDiscount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-semibold text-gray-800">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-[#3D3D3D]">
                    Total
                  </span>
                  <span className="text-2xl font-black text-[#46A358]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#46A358] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:bg-[#3d8d4c] transition-all active:scale-[0.98]"
              >
                Complete Order
              </button>

              <p className="text-center text-xs text-gray-400 mt-4 px-4">
                By clicking "Complete Order", you agree to our terms and
                conditions.
              </p>
            </div>
          </div>
        </form>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
        centered
        className="ultra-modern-modal"
        closeIcon={null}
      >
        <div className="flex flex-col md:flex-row min-h-[500px] overflow-hidden rounded-[40px] bg-white">
          <div className="w-full md:w-[280px] bg-[#46A358] p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>

            <div>
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 rotate-12 shadow-xl">
                <span className="text-[#46A358] text-3xl font-black">✓</span>
              </div>
              <h2 className="text-3xl font-black leading-tight mb-4">
                Great! <br /> Your order is on the way.
              </h2>
              <p className="text-white/80 text-sm">
                We've sent a confirmation to your email address.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <p className="text-[11px] uppercase tracking-widest opacity-70 mb-1">
                Estimated Delivery
              </p>
              <p className="text-lg font-bold">Feb 02 - Feb 05</p>
            </div>
          </div>

          <div className="flex-1 p-8 md:p-12 bg-[#FBFBFB] flex flex-col">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-2xl font-black text-[#3D3D3D]">Summary</h3>
                <p className="text-gray-400 text-xs mt-1 italic">
                  Order ID: #PS-{(Math.random() * 1000).toFixed(0)}998
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">
                  Total Paid
                </p>
                <p className="text-3xl font-black text-[#46A358]">
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar mb-8">
              <div className="grid gap-4">
                {data?.map((item: ShopCartType) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100/50 hover:shadow-md transition-all group"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={item.main_image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#3D3D3D] text-[13px] truncate">
                        {item.title}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[11px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-bold">
                          QTY: {item.counter}
                        </span>
                        <span className="font-black text-[#3D3D3D] text-[14px]">
                          ${(item.price * item.counter).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-200/60">
              <div className="flex justify-between items-center mb-6 px-2">
                <div className="text-[12px] text-gray-400">
                  Payment:
                  <span className="text-[#3D3D3D] font-bold capitalize">
                    {paymentMethod}
                  </span>
                </div>
                <div className="text-[12px] text-gray-400">
                  Shipping:
                  <span className="text-[#3D3D3D] font-bold">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  navigate("/ProfilePage");
                }}
                className="w-full bg-[#3D3D3D] hover:bg-[#46A358] text-white h-[60px] rounded-2xl font-black text-[16px] transition-all duration-300 shadow-2xl hover:shadow-[#46A358]/40 flex items-center justify-center gap-4 group"
              >
                CONTINUE TO PROFILE
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <style>{`
  .ultra-modern-modal .ant-modal-content {
    padding: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
  }
  .custom-scrollbar::-webkit-scrollbar { width: 3px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E2E2; border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #46A358; }
`}</style>
    </div>
  );
};

export default CheckoutPage;

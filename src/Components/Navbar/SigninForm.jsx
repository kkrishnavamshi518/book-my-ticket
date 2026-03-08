import React from "react";
export default function SigninForm({ open, closeModal, navbarData }) {
  const { signin } = open;
  return (
    <div>
      {signin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
             onClick={() => closeModal("signin")}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4"
                onClick={(e) => e.stopPropagation()} >
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="text-lg font-semibold">Get Started</h2>
              <button className="text-3xl cursor-pointer" onClick={() => closeModal("signin")} >
                <i className="bi bi-x"></i>
              </button>
            </div>
            <div className="px-5 py-4 space-y-3">
              {navbarData.Signin_Options.map((item) => (
                <button key={item.icon}
                  className="w-full border rounded-lg p-2 flex items-center 
                             justify-center text-sm hover:bg-gray-50 cursor-pointer">
                  <i className={`bi bi-${item.icon} mr-2 text-lg`} />
                  {item.label}
                </button>
              ))}
              <div className="flex items-center justify-center py-1">
                <span className="h-px w-10 bg-gray-300" />
                <span className="mx-3 text-xs text-gray-500">OR</span>
                <span className="h-px w-10 bg-gray-300" />
              </div>
              <form className="space-y-3">
                <label className="block text-xs font-medium text-gray-600 cursor-pointer">
                  Continue with mobile number
                </label>
                <div className="flex">
                  <div className="flex items-center border border-r-0 rounded-l-lg px-3 bg-gray-50">+91</div>
                  <input type="tel"
                         className="flex-1 border border-l-0 rounded-r-lg px-3 py-2 text-sm focus:outline-none"
                         placeholder="Enter mobile number"
                         required
                  />
                </div>
                <button className="w-full bg-red-500 text-white py-2 rounded-lg cursor-pointer">
                  Continue
                </button>
              </form>
              <p className="text-[11px] text-gray-500 text-center">By proceeding, you agree to our Terms & Conditions and Privacy Policy.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
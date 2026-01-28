import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { studentendpoints } from "../apis";
import rzplogo from "../../Asset/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

/* ===================== LOAD RAZORPAY SCRIPT ===================== */
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/* ===================== CLEANUP UI (IMPORTANT) ===================== */
function cleanupRazorpayUI() {
  document.body.classList.remove("razorpay-open");
  document.body.style.overflow = "auto";
}

/* ===================== BUY COURSE ===================== */
export async function buyCourse(token, courses, user, dispatch, navigate) {
  const toastId = toast.loading("Loading payment...");
  let paymentVerified = false;

  try {
    /* ---------- Load Razorpay ---------- */
    const loaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!loaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    /* ---------- Create Order ---------- */
    const orderResponse = await apiConnector(
      "POST",
      studentendpoints.CAPTUREPAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      toast.error(orderResponse.data.message);
      throw new Error(orderResponse.data.message);
    }

    const { orderId, amount, currency } = orderResponse.data;

    /* ---------- Razorpay Options ---------- */
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount,
      currency,
      order_id: orderId,
      name: "StudyNotion",
      description: "Course Purchase",
      image: rzplogo,
      prefill: {
        name: user.firstName,
        email: user.email,
      },
      handler: function (response) {
        verifyPayment(
          { ...response, courses },
          token,
          navigate,
          dispatch,
          () => {
            paymentVerified = true;
          }
        );
      },
      modal: {
        ondismiss: function () {
          cleanupRazorpayUI();
          if (!paymentVerified) {
            toast.error("Payment cancelled");
          }
        },
      },
    };

    /* ---------- OPEN RAZORPAY ---------- */
    document.body.classList.add("razorpay-open");
    document.body.style.overflow = "hidden";

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function () {
      cleanupRazorpayUI();
      toast.error("Payment failed");
    });

    paymentObject.open();
  } catch (error) {
    console.error("PAYMENT ERROR:", error);
    cleanupRazorpayUI();
    toast.error("Could not complete payment");
  } finally {
    toast.dismiss(toastId);
  }
}

/* ===================== VERIFY PAYMENT ===================== */
async function verifyPayment(
  bodyData,
  token,
  navigate,
  dispatch,
  markVerified
) {
  dispatch(setPaymentLoading(true));

  try {
    const res = await apiConnector(
      "POST",
      studentendpoints.VERIFYPAYMENT_API,
      bodyData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    markVerified();

    toast.success("Payment successful! You are enrolled 🎉");
    dispatch(resetCart());
    navigate("/dashboard/enrolled-courses");
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    toast.error("Payment verification failed");
  } finally {
    dispatch(setPaymentLoading(false));
    cleanupRazorpayUI();
  }
}

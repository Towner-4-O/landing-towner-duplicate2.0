
// // PRODUCTION 

export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL : 'http://localhost:8085/towner-app/api/v1';

export const media = {
  OIOT_URL: "https://oiot.app",
  TOWNER_PLAYSTORE:
    "https://play.google.com/store/apps/details?id=com.towner.app&hl=en",
  YOUTUBE_VIDEO: "https://youtu.be/GFXFxw81fJc?si=XyTQ5FieKA1_JNgz",
  YOUTUBE_VIDEO2: "https://youtu.be/XL82yNGfKlE?si=jVyFlmhmLHATqp7s",
  OIOT_PLAYSTORE: "https://play.google.com/store/apps/details?id=com.oiot.app",
  BECOMEADRIVER: "https://youtu.be/meWzLcEKIzI?si=OXSJ0jjjsRVI2VFy",
};

export const config = {
  forgotPassword: "/api/driverForgotPassword",
  resetPassword: "/api/driverResetPassword",
  getDriverById: "/api/driver",
  getCountry: "/api/countries",
  getState: "/api/state/:id",
  getCity: "/api/city/:id",
  getServiceCity: "/adminapi/AvailbleserviceCityforlanding",
  createDriverByCompany: "/api/driver",
  //rider:
  verifyNumber: "/api/verifyNumber",
  signUpRider: "/api/riders",
  expiredTheOtp: "/api/deleteDriverOldOtp",
  verifyOTP: "/api/verify-otp",
};

export const social = {
  instagram: "https://www.instagram.com/townerofficial/",
  linkedin: "https://www.linkedin.com/in/towner-marketing/",
  facebook: "https://www.facebook.com/profile.php?id=100091967880050",
  twitter: "https://x.com/one_towner30946",
  youtube: "https://www.youtube.com/@TownerTaxi",
  whatsapp: "https://wa.me/919364102995",
};

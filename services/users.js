import AxiosBase from "./AxiosBase";
class userServices {
  register(email, passWord, passWordRepeat, phone) {
    return AxiosBase.post("register", {
      email: email,
      passWord: passWord,
      passWordRepeat: passWordRepeat,
      phone: phone,
    });
  }   
  login(email, passWord) {
    return AxiosBase.post("Login", {
      email: email,
      passWord: passWord,
    });
  }
  getUserInfo() {
    return AxiosBase.get(`GetUsdersInfoo`);
  }
  updateMyInfo(email, phone, passWord) {
    return AxiosBase.get("UpdateMyInfoos", {
      Email: email,
      Phone: phone,
      pass: passWord,
    });
  }
}

export default new userServices();

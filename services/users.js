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
}

export default new userServices();

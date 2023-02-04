import AxiosBase from "./AxiosBase";

class contactsService {
  createContact(contactName, phoneNumber, description = "") {
    return AxiosBase.post(`InsertContaces`, [
      {
        Description: description,
        ContactName: contactName,
        ContactPhone: phoneNumber,
      },
    ]);
  }
  getMyContacts() {
    return AxiosBase.get(`GetMyContacts`);
  }
  searchOnMyContacts(searchTerm) {
    return AxiosBase.post(`SearchOnMyCantacts/${searchTerm}`);
  }
}

export default new contactsService();

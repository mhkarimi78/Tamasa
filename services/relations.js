import AxiosBase from "./AxiosBase";

class relationsService {
  createRelationType(relationInput) {
    return AxiosBase.post(`CreateRelationType/${relationInput}`);
  }
  createRelation(contactId, relationTypeId, location, description) {
    return AxiosBase.post(`CreateRelation`, {
      ownerId: null,
      contactId: contactId,
      relationTypeId: relationTypeId,
      location: location,
      discription: description,
    });
  }
  getMyRelation() {
    return AxiosBase.get(`GetMyRelations`);
  }
  getRelationTypes() {
    return AxiosBase.get(`GetSRelationType`);
  }
  searchOnMyRelation(searchTerm) {
    return AxiosBase.get(`SearchOnRElation/${searchTerm}`);
  }
  searchOnMyRelationTypes(searchTerm) {
    return AxiosBase.get(`SearchOnRElationTypes/${searchTerm}`);
  }
}

export default new relationsService();

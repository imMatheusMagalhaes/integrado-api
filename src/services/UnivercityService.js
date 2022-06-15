const HttpStatusCode = require("../helpers/HttpStatusCode");
const UniversityRepository = require("../repositories/UniversityRepository");

module.exports = class UnivercityService {
  constructor() {
    this.universityRepository = new UniversityRepository();
  }

  findAll = async () => {
    try {
      const data = await this.universityRepository.find({});
      return {
        status: HttpStatusCode.OK,
        data,
      };
    } catch (error) {
      return {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        data: error,
      };
    }
  };
};

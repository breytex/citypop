import http from "./HttpApi"


export default class CityApi {
        getCities(searchTerm: string) {
          return http.get("/cities");
        }
}

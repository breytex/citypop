import http from "./HttpApi"


export default class CityApi {
        getCities(searchTerm: string | null) {
          console.log(searchTerm);
          if (searchTerm !== null) {
            return http.get("/cities/?search=" + searchTerm);
          } else {
            return http.get("/cities");
          }  
        }

        getCity(url: string) {
            return http.get(url);
        }
}

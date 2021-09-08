interface City {
    _links: string[];
}
  
interface Embedded {
    _links: string[];
}

export default interface CitiesResponse {
    _embedded: any; 
}

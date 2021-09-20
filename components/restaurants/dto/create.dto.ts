export interface CreateRestaurantDto {
    geometry: {
        location: {
            lat: number,
            lon: number
        }
    },
    name: string,
}
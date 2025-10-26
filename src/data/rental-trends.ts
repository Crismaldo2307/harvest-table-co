export interface RentalTrend {
  year: number;
  avgRent: number; // Average monthly rent (EUR)
  touristNightsMillions: number; // Registered tourist overnight stays (millions)
  commerceIndex: number; // Retail turnover index (2015=100)
  employmentRate: number; // Employment rate percentage
}

export const rentalTrends: RentalTrend[] = [
  { year: 2015, avgRent: 696, touristNightsMillions: 17.4, commerceIndex: 98, employmentRate: 83.1 },
  { year: 2016, avgRent: 721, touristNightsMillions: 18.5, commerceIndex: 100, employmentRate: 83.6 },
  { year: 2017, avgRent: 787, touristNightsMillions: 19.9, commerceIndex: 103, employmentRate: 84.2 },
  { year: 2018, avgRent: 844, touristNightsMillions: 20.6, commerceIndex: 106, employmentRate: 85 },
  { year: 2019, avgRent: 914, touristNightsMillions: 21.3, commerceIndex: 108, employmentRate: 86.4 },
  { year: 2020, avgRent: 929, touristNightsMillions: 5.4, commerceIndex: 91, employmentRate: 79.2 },
  { year: 2021, avgRent: 947, touristNightsMillions: 9.1, commerceIndex: 96, employmentRate: 81.7 },
  { year: 2022, avgRent: 1007, touristNightsMillions: 18.9, commerceIndex: 109, employmentRate: 85.9 },
  { year: 2023, avgRent: 1037, touristNightsMillions: 21.8, commerceIndex: 112, employmentRate: 87.6 },
  { year: 2024, avgRent: 1139, touristNightsMillions: 22.7, commerceIndex: 116, employmentRate: 88.3 }
];

export interface DistrictSnapshot {
  district: string;
  avgRent: number;
  tourismPressureIndex: number; // indexed to city average = 100
  commerceDensity: number; // businesses per 1,000 residents
  shortTermRentals: number; // registered tourist rentals
}

export const districtSnapshots: DistrictSnapshot[] = [
  { district: "Ciutat Vella", avgRent: 1214, tourismPressureIndex: 178, commerceDensity: 142, shortTermRentals: 5741 },
  { district: "Eixample", avgRent: 1126, tourismPressureIndex: 143, commerceDensity: 128, shortTermRentals: 8124 },
  { district: "Sants-Montjuïc", avgRent: 982, tourismPressureIndex: 119, commerceDensity: 104, shortTermRentals: 3946 },
  { district: "Les Corts", avgRent: 1138, tourismPressureIndex: 95, commerceDensity: 136, shortTermRentals: 1263 },
  { district: "Sarrià-Sant Gervasi", avgRent: 1267, tourismPressureIndex: 92, commerceDensity: 140, shortTermRentals: 1984 },
  { district: "Gràcia", avgRent: 1031, tourismPressureIndex: 134, commerceDensity: 122, shortTermRentals: 3571 },
  { district: "Horta-Guinardó", avgRent: 889, tourismPressureIndex: 81, commerceDensity: 86, shortTermRentals: 1287 },
  { district: "Nou Barris", avgRent: 817, tourismPressureIndex: 54, commerceDensity: 72, shortTermRentals: 642 },
  { district: "Sant Andreu", avgRent: 884, tourismPressureIndex: 73, commerceDensity: 78, shortTermRentals: 834 },
  { district: "Sant Martí", avgRent: 994, tourismPressureIndex: 138, commerceDensity: 118, shortTermRentals: 5128 }
];

export interface TourismMix {
  label: string;
  value: number;
  description: string;
}

export const tourismMix: TourismMix[] = [
  {
    label: "Apartamentos turísticos",
    value: 41,
    description: "Reservas en viviendas de uso turístico registradas en la ciudad (2023)."
  },
  {
    label: "Hoteles y hostales",
    value: 36,
    description: "Pernoctaciones en establecimientos hoteleros tradicionales."
  },
  {
    label: "Plataformas flexibles",
    value: 15,
    description: "Alquileres de corta estancia gestionados por plataformas flexibles (coliving, residencias temporales)."
  },
  {
    label: "Otros",
    value: 8,
    description: "Intercambios, viviendas compartidas y fórmulas híbridas."
  }
];

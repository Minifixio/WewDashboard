import { HttpService } from 'src/app/services/http.service';
import { ErrorsService } from 'src/app/services/errors.service';

export interface DayForecast {
    main: string
    description: string
    icon: string
    temp: number
    temp_min: number
    temp_max: number
    wind_speed: number
    rain: {
        last_hour: number | null
        last_three_hours: number | null
    }
    cloudiness: number
    city: string
    date_unix: number
    rain_prob: number | null
}

export interface WeekForecast {
    day1: DayForecast[]
    day2: DayForecast[]
    day3: DayForecast[]
    day4: DayForecast[]
    day5: DayForecast[]
    day6: DayForecast[]
}

export interface CityData {
    name: string
}

export interface DayForecastJSON {
    coord: {
        lon: number
        lat: number
    }
    weather: {
        main: string
        description: string
        icon: string
    }[]
    main: {
        temp: number
        temp_min: number
        temp_max: number
    }
    clouds: {
        all: number
    }
    rain: {
        one_h: number
        three_h: number
    }
    dt: number
    wind: {
        speed: number
    }
    pop: number
}

export interface WeekForecastJSON {
    list: DayForecastJSON[]
}

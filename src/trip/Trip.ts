export interface Trip {
    name: string,
    start_date: number,
    end_date: number,
    total_km: number,
    summary: string,
    cover_photo_path: string,
    cover_photo: CoverPhoto,
    all_steps: Step[]
}

interface CoverPhoto {
    path: string
}

export interface Step {
    id: number,
    description: string,
    slug: string,
    start_time: number,
    location: StepLocation,
    weather_condition: string,
    weather_temperatur: number
}

interface StepLocation {
    name: string,
    detail: string,
    lat: number,
    lon: number
}

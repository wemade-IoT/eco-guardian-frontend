export const plantations = [
  {
    id: 1,
    type: "Greenhouse",
    user_id: 1,
    water_threshold: 0.8,
    created_at: "2025-05-01T08:00:00",
    updated_at: "2025-05-12T10:00:00",
    light_threshold: 0.9,
    temperature_threshold: 25.0,
    area_coverage: 100.5,
    states_id: 1,
    plants: [1, 4]
  },
  {
    id: 2,
    type: "Outdoor",
    user_id: 2,
    water_threshold: 0.7,
    created_at: "2025-05-02T09:00:00",
    updated_at: "2025-05-12T11:00:00",
    light_threshold: 0.8,
    temperature_threshold: 23.0,
    area_coverage: 200.75,
    states_id: 2,
    plants: [2, 5]
  },
  {
    id: 3,
    type: "Field",
    user_id: 3,
    water_threshold: 0.75,
    created_at: "2025-05-03T10:00:00",
    updated_at: "2025-05-12T12:00:00",
    light_threshold: 0.85,
    temperature_threshold: 22.0,
    area_coverage: 300.0,
    states_id: 3,
    plants: [3, 6]
  }
];
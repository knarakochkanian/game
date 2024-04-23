interface RegionOption {
    id: string;
    name: string;
}

interface Region {
    id: string;  // Adding id here since it's used in your Accordion component
    title: string;
    options: RegionOption[];
}
export const regions:Region[] = [
    {
        id: "1",
        "title": "наиболее вероятный выбор",
        "options": [
            { "id": "G7", "name": "G7" },
            { "id": "NATO", "name": "NATO" },
            { "id": "USA", "name": "USA" },
            { "id": "EU", "name": "EU" },
            { "id": "World", "name": "World" }
        ]
    },
    {
        id: "2",
        "title": "недружественные страны",
        "options": [
            { "id": "G7", "name": "G7" },
            { "id": "NATO", "name": "NATO" },
            { "id": "USA", "name": "USA" },
            { "id": "EU", "name": "EU" },
            { "id": "World", "name": "World" }
        ]
    }
];

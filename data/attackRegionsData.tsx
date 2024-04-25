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
            { "id": "НАТО", "name": "НАТО" },
            { "id": "США", "name": "США" },
            { "id": "ЕВРОСОЮЗ", "name": "ЕВРОСОЮЗ" },
            { "id": "ВЕСЬ МИР", "name": "ВЕСЬ МИР" }
        ]
    },
    {
        id: "2",
        "title": "недружественные страны",
        "options": []
    },    {
        id: "3",
        "title": "военные блоки",
        "options": []
    },    {
        id: "4",
        "title": "политичнские блоки",
        "options": []
    },    {
        id: "5",
        "title": "континеты",
        "options": []
    },
    {
        id: "6",
        "title": "регионы",
        "options": []
    },
    {
        id: "7",
        "title": "страны",
        "options": []
    }
];

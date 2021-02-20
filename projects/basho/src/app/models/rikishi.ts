export interface Rikishi {
    ID: string;
    Name: string;
    Rank: string;
    Avatar: string;
    Results: Result[];
    Matches: Match[];
}

export interface Result {
    Tournament: string;
    Wins: string;
    Losses: string;
}

export interface Match {
    Day: string;
    Opponent: string;
    Result: string;
}

export const DefaultRikishi = {
    Name: "",
    Rank: "",
    Avatar: ""
} 
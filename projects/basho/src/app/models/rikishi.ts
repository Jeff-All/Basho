export interface Rikishi {
    ID: string;
    Name: string;
    Rank: string;
    Avatar: string;
    Wins: number;
    Losses: number;
    Results: Result[];
    Matches: Map<number,Match>;
    DisplayMatches: DisplayMatch[];
}

export interface Result {
    Tournament: string;
    Wins: string;
    Losses: string;
}

export interface Match {
    Day: number;
    Opponent: number;
    Concluded: boolean;
    Won: boolean;
}

export interface DisplayMatch {
    Display: boolean;
    Day: number;
    Opponent: Rikishi;
    Concluded: boolean;
    Won: boolean;
}

export const DefaultRikishi = {
    Name: "",
    Rank: "",
    Avatar: ""
} 
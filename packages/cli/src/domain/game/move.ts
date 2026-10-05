export type Move = {
    skipped: boolean;
    color: "white" | "blue";
    piece: "1" | "2" | "3I" | "3L" | "4S" | "4T" | "4L";
    column: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    rotation: 0 | 1 | 2 | 3;
    mirrored: boolean;
}

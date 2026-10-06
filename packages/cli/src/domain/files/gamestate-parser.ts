import { Color, Move } from "../game/move.ts";

export function parseSaveFile(input: string): Array<Move> {
    const parts = input.split(" ");
    let color: Color = "blue";
    return parts.map((moveInput, index) => {
        if (index === 0 && /W/i.test(moveInput)) {
            color = "white";
        } else if (moveInput === "--") {
            reverseColor(color);
            return {
                skipped: true
            } as Move;
        } else {
            const pieceColor = color;
            let piece = extractPiece(moveInput);
            let column = moveInput[moveInput.length - 1];
            let rotation = extractRotation(moveInput);
            let mirrored = /m/i.test(moveInput);

            reverseColor(color);

            return {
                color: pieceColor,
                piece,
                column,
                rotation,
                mirrored,
            } as Move;
        }
    }).filter(m => !!m); // Necessary to exclude the undefined value from the white start flag if present
}

function reverseColor(color: Color): Color {
    if (color === "white") {
        return "blue";
    }
    return "white";
}

function extractPiece(moveInput: string): string {
    if (moveInput[0] === '1' || moveInput[0] === '2') {
        return moveInput[0];
    } else if (moveInput[0] === '3' || moveInput[0] === '4') {
        if (moveInput.length <=  1) {
            throw new Error(`The move "${moveInput}" is too short and does not contains the required information.`);
        }
        return moveInput[0] + moveInput[1]
    }
    throw new Error(`Piece ${moveInput[0]} not recognized.`);
}

function extractRotation(moveInput: string): number {
    const rotationInput = moveInput.match(/r\d/);
    if (rotationInput && rotationInput[1]) {
        return Number.parseInt(rotationInput[1].charAt(1));
    }
    return 0;
}
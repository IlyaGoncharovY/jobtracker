export type DirectionType = 'left' | 'right' | 'center';

export interface FighterState {
    id: string;
    hp: number;
    damage: number;
    move: DirectionType;
    setDamage: DirectionType;
}

export interface FightState {
    id: string;
    players: FighterState[];
    currentTurn: number;
    turnCount: number;
    maxTurns: number;
    gameOver: boolean;
}

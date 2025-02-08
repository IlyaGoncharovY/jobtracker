/**
 * Направление экшона для игрока в игре.
 * @example {'left' | 'right' | 'center'}
 */
export type DirectionType = 'left' | 'right' | 'center';

/**
 * Тип действия, используемого для движения или атаки.
 * @example {'move' | 'punch'}
 */
export type PunchOrMoveType = 'move' | 'punch';

/**
 * Состояние бойца.
 * @param {FighterState} props - props для типизации одного игрока.
 * @param {string} props.id - Идентификатор игрока.
 * @param {number} props.hp - Здоровье игрока.
 * @param {number} props.damage - Урон, который может нанести игрок.
 * @param {DirectionType | null} props.move - Направление движения игрока.
 * @param {DirectionType | null} props.setDamage - Направление атаки игрока.
 */
export interface FighterState {
    id: string;
    hp: number;
    damage: number;
    move: DirectionType | null;
    setDamage: DirectionType | null;
}

/**
 * Состояние игры.
 * @param {FighterState} props - props для состояния игры.
 * @param {string} props.id - Идентификатор игры.
 * @param {FighterState[]} props.players - Массив игроков.
 * @param {number} props.currentTurn - Текущий ход (используется для управления логикой игры).
 * @param {number} props.turnCount - Количество завершённых ходов.
 * @param {number} props.maxTurns - Максимальное количество ходов.
 * @param {boolean} props.gameOver - Флаг завершения игры.
 * @param {string} props.[result] - Результат игры (например, "Победил: ..." или "Ничья").
 */
export interface FightState {
    id: string;
    players: FighterState[];
    currentTurn: number;
    turnCount: number;
    maxTurns: number;
    gameOver: boolean;
    result?: string;
}

/**
 * Тип действия атаки.
 * @param {AttackActionType} props - props для действия "атака".
 * @param {DirectionType} props.attackDirection - Направление атаки.
 * @param {string} props.gameId - Идентификатор игры.
 * @param {string} props.playerId - Идентификатор игрока.
 * @param {PunchOrMoveType} props.type - Тип действия (должен быть 'punch').
 */
export interface AttackActionType {
    attackDirection: DirectionType
    gameId: string
    playerId: string
    type: PunchOrMoveType
}

/**
 * Тип действия манёвр.
 * @param {MoveActionType} props - props для действия "манёвр".
 * @param {DirectionType} props.direction - Направление атаки.
 * @param {string} props.gameId - Идентификатор игры.
 * @param {string} props.playerId - Идентификатор игрока.
 * @param {PunchOrMoveType} props.type - Тип действия (должен быть 'move').
 */
export interface MoveActionType {
    direction: DirectionType
    gameId: string
    playerId: string
    type: PunchOrMoveType
}

export type BlockType = "i" | "o" | "s" | "z" | "j" | "l" | "t";

export const BLOCK_TYPES: Readonly<BlockType[]> = [
  "i",
  "o",
  "s",
  "z",
  "j",
  "l",
  "t",
];

export type Block = {
  x: number;
  y: number;
  turn: Turn;
  type: BlockType;
};

export type Tile = {
  x: number;
  y: number;
  type: BlockType; // 表示時の色指定のために保持
};

export type BlockShapeType = Readonly<{
  [key in BlockType]: Readonly<{
    tiles: Readonly<
      [
        Readonly<[number, number]>,
        Readonly<[number, number]>,
        Readonly<[number, number]>,
        Readonly<[number, number]>,
      ]
    >;
    center: Readonly<[number, number]>;
  }>;
}>;

export type MoveType = "left" | "right" | "turn";

export type Turn = 0 | 1 | 2 | 3;

export const BLOCK_SHAPES: BlockShapeType = {
  i: {
    tiles: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    center: [0.5, 1.5],
  },
  o: {
    tiles: [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ],
    center: [0.5, 0.5],
  },
  s: {
    tiles: [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
    ],
    center: [0.5, 0.5],
  },
  z: {
    tiles: [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    center: [0.5, 0.5],
  },
  j: {
    tiles: [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
    center: [0.5, 0.5],
  },
  l: {
    tiles: [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
    ],
    center: [0.5, 0.5],
  },
  t: {
    tiles: [
      [0, 0],
      [1, 0],
      [2, 0],
      [1, 1],
    ],
    center: [0.5, 0.5],
  },
} as const;

export const COLOR_NAME = {
  i: "block-type-i",
  o: "block-type-o",
  s: "block-type-s",
  z: "block-type-z",
  j: "block-type-j",
  l: "block-type-l",
  t: "block-type-t",
} as const;

// あるブロックについての構成要素（Tile）の情報を取得する
export const getTiles = (block: Block): Tile[] => {
  const blockShape = BLOCK_SHAPES[block.type];
  return blockShape.tiles
    .map((tile) =>
      turn(
        tile[0],
        tile[1],
        blockShape.center[0],
        blockShape.center[1],
        block.turn,
      ),
    )
    .map(([x, y]) => ({
      x: block.x + x,
      y: block.y + y,
      type: block.type,
    }));
};

// 回転ロジック
export const turnOnce = (
  x: number,
  y: number,
  centerX: number,
  centerY: number,
): [number, number] => [centerX - (y - centerY), centerY + (x - centerX)];

// 回転ロジックをturnVal回分タイルに適用する
export const turn = (
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  turnVal: Turn,
): [number, number] => {
  let res: [number, number] = [x, y];
  for (let i = 0; i < turnVal; i++) {
    res = turnOnce(res[0], res[1], centerX, centerY);
  }
  return res;
};

// 次のステップのブロックを返却する
export const getNextBlock = (
  fallingBlock: Block | null,
  boardWidth: number,
  boardHeight: number,
  tiles: Tile[],
): Block | null => {
  // 落下中のブロックが存在しない場合は新しいブロックを作成
  if (fallingBlock === null) {
    const type = BLOCK_TYPES[Math.floor(BLOCK_TYPES.length * Math.random())];
    return {
      x: Math.floor(boardWidth / 2 - 0.5 - BLOCK_SHAPES[type].center[0]),
      y: -1,
      turn: 0,
      type,
    };
  }

  // 最下段に接したことを判定
  if (Math.max(...getTiles(fallingBlock).map((tile) => tile.y)) >= 19) {
    // すでに最下段にいる場合
    return null;
  }

  // ブロックを一段下に落とす
  const nextBlock = { ...fallingBlock, y: fallingBlock.y + 1 };
  // nextBlockのタイル位置に既にタイルがある場合は不整地なのでnullを返す
  for (const tile of getTiles(nextBlock)) {
    for (const t of tiles) {
      if (tile.x == t.x && tile.y == t.y) {
        return null;
      }
    }
  }

  return nextBlock;
};

// 左右と回転の移動ロジックをブロックに適用する
export const moveBlock = (
  block: Block,
  move: MoveType,
  boardWidth: number,
  tiles: Tile[],
): Block | null => {
  // move型によってx軸方向の移動後の座標遷移を制御
  const movedBlock = (() => {
    switch (move) {
      case "left":
        return {
          ...block,
          x: block.x - 1,
        };
      case "right":
        return {
          ...block,
          x: block.x + 1,
        };
      case "turn":
        return {
          ...block,
          turn: ((block.turn + 1) % 4) as Turn,
        };
    }
  })();

  // x軸方向の座標遷移の結果を元に回転ロジックを考慮したTile位置を取得
  const tilesX = getTiles(movedBlock).map(({ x }) => x);

  // 移動先が不正ならnullを返却する.
  if (Math.min(...tilesX) < 0 || Math.max(...tilesX) >= boardWidth) {
    return null;
  }

  // movedBlockが既存のタイルに接触したかどうかの判定
  // movedBlockのタイル位置に既にタイルがある場合は不整地なのでnullを返す
  for (const tile of getTiles(movedBlock)) {
    for (const t of tiles) {
      if (tile.x == t.x && tile.y == t.y) {
        return null;
      }
    }
  }

  return movedBlock;
};

// 揃った行の行番号を返すロジック
export const getCompletedRows = (
  tiles: Tile[],
  boardWidth: number,
): number[] => {
  return Array.from(new Set(tiles.map(({ y }) => y))).filter(
    (y) => tiles.filter((tile) => tile.y === y).length === boardWidth,
  );
};

// 行削除のロジック
export const deleteRows = (tiles: Tile[], rows: number[]): Tile[] => {
  return tiles
    .filter(({ y }) => !rows.includes(y))
    .map((tile) => ({
      ...tile,
      y: tile.y + rows.filter((row) => row > tile.y).length,
    }));
};

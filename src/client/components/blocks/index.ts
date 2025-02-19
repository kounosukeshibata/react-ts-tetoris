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
  type: BlockType;
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
    center: [1, 0.5],
  },
  z: {
    tiles: [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    center: [1, 0.5],
  },
  j: {
    tiles: [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
    center: [1, 0.5],
  },
  l: {
    tiles: [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
    ],
    center: [1, 0.5],
  },
  t: {
    tiles: [
      [0, 0],
      [1, 0],
      [2, 0],
      [1, 1],
    ],
    center: [1, 1.5],
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

export const findBlock = (
  blocks: Block[],
  x: number,
  y: number,
): Block | undefined => {
  for (const block of blocks) {
    for (const shape of BLOCK_SHAPES[block.type].tiles) {
      if (x === block.x + shape[0] && y === block.y + shape[1]) {
        return block;
      }
    }
  }
};

export const getNextBlock = (
  fallingBlock: Block | null,
  boardWidth: number,
  boardHeight: number,
): Block | null => {
  // 落下中のブロックが存在しない場合は新しいブロックを作成
  if (fallingBlock === null) {
    const type = BLOCK_TYPES[Math.floor(BLOCK_TYPES.length * Math.random())];
    return {
      x: Math.floor(boardWidth / 2 + 0.5 - BLOCK_SHAPES[type].center[0]),
      y: -1,
      type,
    };
  }

  // if (fallingBlock.y === 0) {
  //   // TODO: 既存のブロックに接したことを判定
  //   return null;
  // }

  return {
    ...fallingBlock,
    y: fallingBlock.y + 1,
  };
};

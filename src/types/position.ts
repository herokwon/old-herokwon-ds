import { ALIGNMENTS_X, ALIGNMENTS_Y } from "@/data/constant";

export type AlignmentX = typeof ALIGNMENTS_X[number];
export type AlignmentY = typeof ALIGNMENTS_Y[number];
export type AbsolutePositionX = `${Exclude<AlignmentX, 'center'>}-${AlignmentY}`;
export type AbsolutePositionY = `${Exclude<AlignmentY, 'middle'>}-${AlignmentX}`;

export type AbsolutePosition = AbsolutePositionX | AbsolutePositionY;
/** Tiny shared score tracker — no backend, just enough to show a fun number at the end. */
export const gameState = {
  wordGameMistakes: 0,
  wordGameCompleted: false,
}

const REACH_END_BONUS = 20
const WORD_GAME_BASE_SCORE = 100
const MISTAKE_PENALTY = 15
const MIN_WORD_GAME_SCORE = 20

export function computeScore(): number {
  let score = REACH_END_BONUS
  if (gameState.wordGameCompleted) {
    score += Math.max(MIN_WORD_GAME_SCORE, WORD_GAME_BASE_SCORE - gameState.wordGameMistakes * MISTAKE_PENALTY)
  }
  return score
}

const HIGH_SCORE_KEY = 'historias-magicas:high-score'

export function readHighScore(): number {
  const stored = Number(localStorage.getItem(HIGH_SCORE_KEY))
  return Number.isFinite(stored) ? stored : 0
}

export function saveHighScoreIfBetter(score: number): number {
  const current = readHighScore()
  if (score > current) {
    localStorage.setItem(HIGH_SCORE_KEY, String(score))
    return score
  }
  return current
}

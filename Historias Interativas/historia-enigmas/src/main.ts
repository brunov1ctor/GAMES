import './style/main.css'
import { SceneManager } from './sceneManager'
import { IntroScene } from './scenes/introScene'
import { PuzzleScene } from './scenes/puzzleScene'

const app = document.querySelector<HTMLDivElement>('#app')!
const sceneManager = new SceneManager(app)

const showIntro = () => sceneManager.goTo(new IntroScene(showPuzzle))
const showPuzzle = () => sceneManager.goTo(new PuzzleScene(showIntro))

showIntro()

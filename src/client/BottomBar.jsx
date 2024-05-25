import "./AppStyles.css"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import MiniStickyNote from "./MiniStickyNote"

export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <ul className="bottom-list">
        <div className="left-arrow">
          <FaAngleLeft />
        </div>
        <MiniStickyNote color="yellow" title="Mini 1" text="Text" />
        <MiniStickyNote color="blue" title="Mini 2" text="Another Text" />
        <MiniStickyNote color="pink" title="Mini 3" text="Yet Another Text" />
        <MiniStickyNote color="yellow" title="Mini 4" text="One More Text" />
        <MiniStickyNote color="blue" title="Mini 5" text="Another One Text" />
        <MiniStickyNote color="pink" title="Mini 6" text="Last Text" />
        <div className="right-arrow">
          <FaAngleRight />
        </div>
      </ul>
    </div>
  )
}

import "./AppStyles.css"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"
import { FaPencilAlt, FaRegStar } from "react-icons/fa"

export default function SideBar() {
  // List items
  const list1Items = ["Mark: 23 June", "Julia: 2 July", "Mom: 13 Aug"]
  const list2Items = ["1984 - George Orwell", "The Alchemist - Paulo Coelho", "The Catcher in the Rye - av J.D. Salinger"]
  const list3Items = ["1", "2", "3"]

  return (
    <div className="side-bar">
      <div>
        <h2>My Lists:</h2>
      </div>
        <div className="up-arrow">
        <FaAngleUp />
      </div>
      <div className="list-container">
        <div className="list-header">
        <h3 className="list-title"> Upcoming birthdays:
          </h3>
        <FaPencilAlt className="list-pen-icon" />
          <FaRegStar className="list-star-icon" />
        </div>
        <ul className="list">
          {list1Items.map((item, index) => (
            <li key={index} >
            <span style={{ marginRight: '5px' }}>&#x25A1;</span> {/* Tom ruta */}
            {item}</li>
          ))}
        </ul>
      </div>
      <div className="list-container">
        <div className="list-header">
        <h3 className="list-title">Books I wanna read:
          </h3>
          <FaRegStar className="list-star-icon" />
        </div>
        <ul className="list">
          {list2Items.map((item, index) => (
            <li key={index}>
            <span style={{ marginRight: '5px' }}>&#x25A1;</span> {/* Tom ruta */}
            {item}</li>
          ))}
        </ul>
      </div>
      <div className="list-container">
        <div className="list-header">
        <h3 className="list-title">Last list:
          </h3>
          <FaPencilAlt className="list-pen-icon" />
          <FaRegStar className="list-star-icon" />
        </div>
        <ul className="list">
          {list3Items.map((item, index) => (
            <li key={index}>
              <span style={{ marginRight: '5px' }}>&#x25A1;</span> {/* Tom ruta */}
            {item}</li>
          ))}
        </ul>
      </div>
      <div className="down-arrow">
        <FaAngleDown />
      </div>
    </div>
  )
}

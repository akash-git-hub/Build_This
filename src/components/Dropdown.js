import { useState } from "react"
import { Dropdown } from "react-bootstrap";

export const SelectDropdown = ({ title, items ,icon }) => {

  const [showDropdown, setShowDropdown] = useState();
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  return (
    <Dropdown show={showDropdown} onClick={toggleDropdown} autoClose>
      <h6 style={{cursor:'pointer'}}>{title} {icon}</h6>
      <Dropdown.Menu  >
        {items.map((item, index) => {
          return(
            <Dropdown.Item  key={index} href={item.href}>{item.name}</Dropdown.Item>
          )
         
        })}
      </Dropdown.Menu>
    </Dropdown>



  )
}

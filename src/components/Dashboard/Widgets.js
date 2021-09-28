import React from "react";
import { Card, Row, Col, Dropdown, CardGroup } from "react-bootstrap";
import { BsLayers, BsStar } from "react-icons/bs";
import { FiArrowDownCircle, FiUser,FiUserPlus } from "react-icons/fi";

export default function Widgets({users, lists, date}) {

  return (

      <div className="widget-container">
     
            <div className="widgets-column">
              <div className="widget-item">
                  <FiUser className="widget-icons" />
                  <div className="widget-title">+{users}</div>
                  <div className="widget-title">Users</div>
                  
              </div>
            </div>
            <div className="widgets-column">
              <div className="widget-item">
              <FiUserPlus className="widget-icons" />
                  
                  <div>Last 24 Hours Users</div>
                  
              </div>
            </div>
            <div className="widgets-column">
              <div className="widget-item">
              <BsLayers className="widget-icons" />
                <div>+{lists}</div>
                  <div>Lists</div>
                  {/* <div>+35K </div> */}
              </div>
            </div>
            <div className="widgets-column">
              <div className="widget-item">
              <BsLayers className="widget-icons" />
                  <div>+24</div>
                  <div>Last 24 Hours Lists</div>
                  {/* <div>+35K <FiUser className="widget-icons" /></div> */}
              </div>
            </div>
        </div>

  );
}

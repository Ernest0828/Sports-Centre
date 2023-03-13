import React from 'react'
import "./boxlistitem.css"

export default function boxListItems() {
  return (
    <div className='listOptions'>
        <div className="listItem">
            <img 
                src="https://images.pexels.com/photos/3848658/pexels-photo-3848658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="listItemImage"
            />
            <div className="listItemTitle">
                <h2>Swimming Pool</h2>
            </div>

        </div>
        <div className="listItem">
            <img 
                src="https://images.pexels.com/photos/3848658/pexels-photo-3848658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="listItemImage"
            />
            <div className="listItemTitle">
                <h2>Swimming Pool</h2>
            </div>

        </div>
        <div className="listItem">
            <img 
                src="https://images.pexels.com/photos/3848658/pexels-photo-3848658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="listItemImage"
            />
            <div className="listItemTitle">
                <h2>Swimming Pool</h2>
            </div>

        </div>
    </div>                 
  );
}

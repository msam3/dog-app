import React from 'react';

function BanList({ banList, removeFromBan }) {
  return (
    <div className="ban-list">
      <h2>Ban List</h2>
      {banList.length === 0 && <p>No bans yet!</p>}
      <div className="ban-items">
        {banList.map((item, index) => (
          <span key={index} className="ban-tag" onClick={() => removeFromBan(item)}>
            {item} ❌
          </span>
        ))}
      </div>
    </div>
  );
}

export default BanList;
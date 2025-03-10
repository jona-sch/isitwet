import React from 'react';


const ToggleButton = ({ isOn, handleToggle }) => {
    return (
        <button className="button button--secondary" onClick={handleToggle}>
            { isOn ? <div>Back to table</div> : <div>Show detailed view</div>}
        </button>
    );
};

export default ToggleButton;
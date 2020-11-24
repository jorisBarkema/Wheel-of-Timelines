import React from 'react';

function Patron(props) {
    return (
        <div className="col-12 col-lg-6 patron">
            <p>{props.name}</p>
        </div>
    )
}

export default Patron;
import React from 'react';

class DateContainer extends React.Component {

    render = () => {

        return <p className={this.props.className}> {this.props.date.toLocaleString('en', { year: 'numeric', month: 'long', day: 'numeric' })} </p>
    }
}

export default DateContainer;
import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div style={{ textAlign: "center", fontSize: '1.5em' }}
                className="padding-large margin-bottom-tiny text-white bg-primary">Weather</div>
        );
    }
}

export default Header;

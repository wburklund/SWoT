import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {
    red, pink, purple, deepPurple,
    indigo, blue, lightBlue, cyan,
    teal, green, lightGreen, lime,
    yellow, amber, orange, deepOrange,
    brown, blueGrey, grey
} from '@material-ui/core/colors';
import Palette from 'material-ui/svg-icons/image/palette';

class ColorSelectField extends Component {
    render() {
        let colors = [ 
            { name: 'Red', color: red[500] }, 
            { name: 'Pink', color: pink[500] }, 
            { name: 'Purple', color: purple[500] }, 
            { name: 'Deep Purple', color: deepPurple[500] }, 
            { name: 'Indigo', color: indigo[500] }, 
            { name: 'Blue', color: blue[500] }, 
            { name: 'Light Blue', color: lightBlue[500] }, 
            { name: 'Cyan', color: cyan[500] }, 
            { name: 'Teal', color: teal[500] }, 
            { name: 'Green', color: green[500] }, 
            { name: 'Light Green', color: lightGreen[500] }, 
            { name: 'Lime', color: lime[500] },
            { name: 'Yellow', color: yellow[500] }, 
            { name: 'Amber', color: amber[500] }, 
            { name: 'Orange', color: orange[500] }, 
            { name: 'Deep Orange', color: deepOrange[500] },
            { name: 'Brown', color: brown[500] },
            { name: 'Blue Grey', color: blueGrey[500] },
            { name: 'Grey', color: grey[500] },
        ];

        return (
            <SelectField { ...this.props }>
                {colors.map((color, index) => 
                    <MenuItem 
                        key={index} 
                        value={color.color} 
                        primaryText={color.name}
                        leftIcon={<Palette color={color.color}/>}
                    />
                )}
            </SelectField>
        );
    }
}

export default ColorSelectField;
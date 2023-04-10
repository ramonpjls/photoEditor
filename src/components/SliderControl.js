import React from 'react'
import { Grid, Slider, Typography, Input } from '@mui/material';

const SliderControl = ({name, value, state, max}) => {
  return (
    <div>
        <Typography id="input-slider" gutterBottom>
        {name}
        </Typography>
        <Slider 
        marks={true} 
        size='small' 
        aria-label='small' 
        valueLabelDisplay='auto' 
        value={value} 
        min={0} max={max} 
        onChange={e => state(e.target.value)} />
    </div>
  )
}

export default SliderControl
import Image from 'next/image';
import { Grid, Input, Typography, Button } from '@mui/material';
import {useState} from 'react'
import SliderControl from '@/components/SliderControl';

const Editor = () => {
    const [photoSelected, setPhotoSelected] = useState(null)
    const [contrastValue, setContrastValue] = useState(55)
    const [brightnessValue, setBrightnessValue] = useState(55)
    const [blurValue, setBlurValue] = useState(0)
    const [invertValue, setInvertValue] = useState(0)
    const [grayscaleValue, setGrayscalevalue] = useState(0)
    const [saturateValue, setSaturateValue] = useState(4)
    const [sepiaValue, setSepiaValue] = useState(10)

    const handlePhotoSelect = (e) => {
        setPhotoSelected(URL.createObjectURL(e.target.files[0]));
    };

    const filter = (effect, value) => {
        return `${effect}(${value})`;
    }

    const downloadImage = () => {
        const canvas = document.createElement('canvas');
        const image = document.createElement('img');
        image.src = photoSelected;
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx = canvas.getContext('2d');
          ctx.filter =
            `${filter('contrast', contrastValue + '%')}
             ${filter('brightness', brightnessValue + '%')}
             ${filter('blur', blurValue + 'px')}
             ${filter('invert', invertValue)}
             ${filter('grayscale', grayscaleValue + '%')}
             ${filter('saturate', saturateValue)}
             ${filter('sepia', sepiaValue + '%')}
             `;
          ctx.drawImage(image, 0, 0);
          const downloadLink = document.createElement('a');
          downloadLink.href = canvas.toDataURL();
          downloadLink.download = `image${Date.now()}.png`;
          downloadLink.click();
        };
      };
    
  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "10px"}}>
        <Grid style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
            <Grid style={{display: "flex", flexDirection: "column", alignSelf: "center", paddingLeft: "15px"}}>
                <Typography variant='h6'>
                    Seleccione su foto a editar
                </Typography>
                <Input type='file' onChange={handlePhotoSelect} style={{color: "white", padding: 10}} />
                {photoSelected && (<Button variant='contained' onClick={downloadImage}>descargar </Button>)}
            </Grid>
        {photoSelected && (<Grid style={{ margin: "10px", padding: "10px", border: "solid gray 1px", borderRadius: "10px", backgroundColor: "gray"}}>
            <Image 
            src={`${photoSelected}`}
            alt="Edit your picture" 
            width={400} height={400} 
            style={{filter: 
                `${filter('contrast',contrastValue+'%')}
                 ${filter('brightness',brightnessValue+'%')}
                 ${filter('blur', blurValue+'px')}
                 ${filter('invert', invertValue)}
                 ${filter('grayscale', grayscaleValue+'%')}
                 ${filter('saturate', saturateValue)}
                 ${filter('sepia', sepiaValue+'%')}
                 `}}
            />
        </Grid>)}
        </Grid>
        {photoSelected && (<Grid style={{ width: "80%", margin: 10}}>
        <SliderControl name={"Contraste"} value={contrastValue} state={setContrastValue} max={200} />
        <SliderControl name={"Brillo"} value={brightnessValue} state={setBrightnessValue} max={200} />
        <SliderControl name={"Enfoque"} value={blurValue} state={setBlurValue} max={20} />
        <SliderControl name={"Invertir"} value={invertValue} state={setInvertValue} max={1} />
        <SliderControl name={"Escala de Grises"} value={grayscaleValue} state={setGrayscalevalue} max={100} />
        <SliderControl name={"Sepia"} value={sepiaValue} state={setSepiaValue} max={100} />
        <SliderControl name={"Saturacion"} value={saturateValue} state={setSaturateValue} max={10} />
        </Grid>)}
       
    </div>
  )
}

export default Editor
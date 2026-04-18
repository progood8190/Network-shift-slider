const nfsDiv = document.querySelector('#controls-nfs-min').closest('div');

const sliderContainer = document.createElement('div');
sliderContainer.style.cssText = 'margin-top:10px; padding:8px;';

const style = document.createElement('style');
style.textContent = `
.nfs-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}
.nfs-slider:hover { opacity: 1; }
.nfs-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #4c00ff;
  background-image: linear-gradient(160deg, #4900f5 0%, #80D0C7 100%);
  cursor: pointer;
}
.nfs-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #0093E9;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
  cursor: pointer;
}
`;
document.head.appendChild(style);

const title = document.createElement('div');
title.textContent = 'See the bullet sooner or later:';
title.style.cssText = 'font-size:12px; margin-bottom:5px; color:inherit;';

const slider = document.createElement('input');
slider.type = 'range';
slider.className = 'nfs-slider';
slider.id = 'nfs-offset-slider';

const offsetLabel = document.createElement('div');
offsetLabel.style.cssText = 'font-size:11px; margin-top:4px; color:inherit; text-align:center;';

const minInput = document.querySelector('#controls-nfs-min');
const maxInput = document.querySelector('#controls-nfs-max');

function getRange() {
    return parseInt(maxInput.value) - parseInt(minInput.value);
}

function getMidpoint() {
    return (parseInt(minInput.value) + parseInt(maxInput.value)) / 2;
}

function setupSlider() {
    const range = getRange();
    const mid = getMidpoint();

    const halfRange = range / 2;
    const sliderMin = -10 + halfRange;  
    const sliderMax = 10 - halfRange;   

    slider.min = sliderMin;
    slider.max = sliderMax;
    slider.step = 1;
    slider.value = mid;

    updateLabel(mid, range);
}

function updateLabel(mid, range) {
    const nfsMin = Math.round(mid - range / 2);
    const nfsMax = Math.round(mid + range / 2);
    const direction = mid > 0 ? 'Later (bullet appears later)' : mid < 0 ? 'Sooner (bullet appears earlier)' : 'Neutral';
    offsetLabel.textContent = `Offset: ${mid >= 0 ? '+' : ''}${mid} | Min: ${nfsMin} Max: ${nfsMax} | ${direction}`;
}

slider.addEventListener('input', () => {
    const mid = parseFloat(slider.value);
    const range = getRange();
    const nfsMin = Math.round(mid - range / 2);
    const nfsMax = Math.round(mid + range / 2);

    const clampedMin = Math.max(-10, nfsMin);
    const clampedMax = Math.min(10, nfsMax);

    minInput.value = clampedMin;
    maxInput.value = clampedMax;
    defly.changeControls();
    updateLabel(mid, range);
});

minInput.addEventListener('change', () => { setupSlider(); offsetLabel.textContent = 'Slider reset (manual input detected)'; });
maxInput.addEventListener('change', () => { setupSlider(); offsetLabel.textContent = 'Slider reset (manual input detected)'; });

setupSlider();

sliderContainer.appendChild(title);
sliderContainer.appendChild(slider);
sliderContainer.appendChild(offsetLabel);
nfsDiv.appendChild(sliderContainer);

console.log('NFS slider injected!');

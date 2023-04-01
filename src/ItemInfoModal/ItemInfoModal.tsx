/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, keyframes } from '@emotion/react';
import { Car } from '../tools/car';

interface ItemInfoModalProps {
  item: Car;
  setInfoModal: Function;
}

const ItemInfoModal = (props: ItemInfoModalProps) => {
  const grow = keyframes`
          from, to {
            transform: scale(.1);
          }

          100% {
            transform: scale(1);
          }
        `
  return (<>
  <div className="popup flex fixed justify-center items-center top-0 w-full h-full z-10 bg-custom-100/80"
    css={css`
      animation: ${grow} .5s;
    `}
  >
    <div className="popup-info w-1/2 p-4 bg-custom-300 rounded-lg">
      <button type='button' className='popup-button info close'
        onClick={() => {
          // closed = true;
          // document.getElementById('popup')!.classList.toggle('lift-out');
          // document.getElementById('popup-info')!.classList.toggle('lift-out');
          // setTimeout(() => setInfoModal(null), 500);
          props.setInfoModal(null);
        }}
      >X</button>
      <img src={props.item.img}
        width="100%"
        className="object-scale-down"
        srcSet={`${props.item.img}-400 400w,
                ${props.item.img}-255 255w,
                ${props.item.img} 800w`}
                >
      </img>
      <p>{props.item.year} {props.item.make} {props.item.model}</p>
    </div>
  </div>
</>)
}

export default ItemInfoModal;
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import '../App.css';

const LoadingComponent = () => (
    <div className='loading-component'>
        <ThreeDots color="#00BFFF" height={100} width={100} />
    </div>
);

export default LoadingComponent;

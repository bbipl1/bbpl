import React from 'react';
import { LoaderCircle } from 'lucide-react';

const FullScreenLoading = () => {
    return (
        <div className='w-screen h-screen bg-slate-500 fixed left-0 top-0 z-50 opacity-90 cursor-not-allowed disabled:'>
            <LoaderCircle 
            className='text-white h-full flex justify-self-center self-center animate-spin'
            size={64}/>
        </div>
    );
};

export default FullScreenLoading;
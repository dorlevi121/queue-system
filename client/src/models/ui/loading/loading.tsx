import React from 'react';
import LoadingStyle from './loading.module.scss';

interface OwnProps {
    style?: {}
}

const Loading: React.FC<OwnProps> = (props) => {
    return (
        <div className={LoadingStyle.Loader} style={props.style}>
            Loading...
        </div>
    )
}

export default Loading;
import {useState, useEffect} from 'react';
const Loader = ({enabled}) => {
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        setLoader(enabled);
    }, [enabled]);

    return loader
}
export default Loader;

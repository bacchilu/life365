import React from 'react';
import ReactDOM from 'react-dom';

const offcanvasDomEl = document.body.appendChild(document.createElement('div'));

export const Offcanvas = function ({opened, setOpened, children}) {
    const [isShown, setIsShown] = React.useState(false);
    const offcanvasEl = React.useRef(null);
    const offcanvasJs = React.useRef(null);
    React.useEffect(function () {
        offcanvasJs.current = new bootstrap.Offcanvas(offcanvasEl.current);
        offcanvasEl.current.addEventListener('hidden.bs.offcanvas', function (event) {
            setIsShown(false);
            setOpened(false);
        });
        offcanvasEl.current.addEventListener('shown.bs.offcanvas', function () {
            setIsShown(true);
        });
    }, []);
    React.useEffect(
        function () {
            if (opened) offcanvasJs.current.show();
            else {
                setIsShown(false);
                offcanvasJs.current.hide();
            }
        },
        [opened]
    );

    return ReactDOM.createPortal(
        <div ref={offcanvasEl} className="offcanvas offcanvas-start" tabIndex="-1" style={{maxWidth: '75%'}}>
            {isShown ? children : null}
        </div>,
        offcanvasDomEl
    );
};

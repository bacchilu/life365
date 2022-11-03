import React from 'react';
import ReactDOM from 'react-dom';

declare var bootstrap: any;

interface Offcanvas {
    show: () => void;
    hide: () => void;
}

const offcanvasDomEl = document.body.appendChild(document.createElement('div'));

export const Offcanvas = function ({opened, setOpened, children}) {
    const [isShown, setIsShown] = React.useState(false);
    const offcanvasEl = React.useRef(null);
    const offcanvasJs = React.useRef<Offcanvas>({show: () => {}, hide: () => {}});
    React.useEffect(function () {
        const htmlDivElement: HTMLDivElement = offcanvasEl.current!;
        offcanvasJs.current = new bootstrap.Offcanvas(htmlDivElement);
        htmlDivElement.addEventListener('hidden.bs.offcanvas', function (event) {
            setIsShown(false);
            setOpened(false);
        });
        htmlDivElement.addEventListener('shown.bs.offcanvas', function () {
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
        <div ref={offcanvasEl} className="offcanvas offcanvas-start" tabIndex={-1} style={{maxWidth: '75%'}}>
            {isShown ? children : null}
        </div>,
        offcanvasDomEl
    );
};

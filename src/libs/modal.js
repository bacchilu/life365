import React from 'react';
import ReactDOM from 'react-dom';

const modalDomEl = document.body.appendChild(document.createElement('div'));

export const Modal = function ({opened, setOpened, children}) {
    const [isShown, setIsShown] = React.useState(false);
    const modalEl = React.useRef(null);
    const modalJs = React.useRef(null);
    React.useEffect(function () {
        modalJs.current = new bootstrap.Modal(modalEl.current);
        modalEl.current.addEventListener('hidden.bs.modal', function (event) {
            setIsShown(false);
            setOpened(false);
        });
        modalEl.current.addEventListener('shown.bs.modal', function () {
            setIsShown(true);
        });
    }, []);
    React.useEffect(
        function () {
            if (opened) modalJs.current.show();
            else {
                setIsShown(false);
                modalJs.current.hide();
            }
        },
        [opened]
    );

    return ReactDOM.createPortal(
        <div ref={modalEl} className="modal fade" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">{isShown ? children : null}</div>
            </div>
        </div>,
        modalDomEl
    );
};

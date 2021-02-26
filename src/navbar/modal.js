import React from 'react';
import ReactDOM from 'react-dom';

const Modal = function ({opened, hide, children}) {
    // https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
    const modalEl = React.useRef(null);
    const modalJs = React.useRef(null);
    const [isVisible, setIsVisible] = React.useState(false);
    React.useEffect(function () {
        modalJs.current = new bootstrap.Modal(modalEl.current, {});
        modalEl.current.addEventListener('hidden.bs.modal', function (event) {
            hide();
            setIsVisible(false);
        });
        modalEl.current.addEventListener('shown.bs.modal', function () {
            setIsVisible(true);
        });
    }, []);
    React.useEffect(
        function () {
            opened ? modalJs.current.show() : modalJs.current.hide();
        },
        [opened]
    );

    const childrenWithProps = React.Children.map(children, function (child) {
        return React.cloneElement(child, {isVisible: isVisible});
    });

    return ReactDOM.createPortal(
        <div ref={modalEl} className="modal fade" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Authentication</h5>
                        <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {childrenWithProps}
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
};

export const useModal = function () {
    const [opened, setOpened] = React.useState(false);
    const hide = function () {
        // setOpened(false);
        setTimeout(function () {
            setOpened(false);
        }, 0);
    };
    const show = function () {
        setOpened(true);
    };

    return [
        function ({children}) {
            return (
                <Modal opened={opened} hide={hide}>
                    {children}
                </Modal>
            );
        },
        show,
    ];
};

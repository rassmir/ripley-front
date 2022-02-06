import React, {Fragment} from 'react'

const Modal = ({height,children, onOpen, onClose}) => {
    return (
        <Fragment>
            {onOpen &&
                <Fragment>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className={`w-full ${height} my-6 mx-auto`}>
                            <div
                                className="border-0 rounded-3xl shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                                <button
                                    className="right-4 top-2 absolute h-8 w-8 border-0 text-3xl leading-none font-bold outline-none focus:outline-none"
                                    onClick={() => onClose()}
                                >
                            <span className="text-gray-default block outline-none focus:outline-none">
                             ×
                             </span>
                                </button>
                                {children}
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-10 bg-black"/>
                </Fragment>
            }
        </Fragment>
    );
}
export default Modal;
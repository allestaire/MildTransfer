import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { Modal } from 'flowbite';

const Dialog = ({
  children,
  title,
  footer = null,
  id = 'dialog',
  open = false,
  onClose = () => { }
}) => {
  const [modal, setModal] = useState(null)
  const modalRef = useRef(null)
  const containerId = 'modal-' + id


  useEffect(() => {
    let _modal = modal
    if (!modal) {
      _modal = new Modal(modalRef.current, {
        backdrop: 'static',
        closable: false
      })
      setModal(_modal)
    }
    if (open) {
      _modal.show()
    } else {
      _modal.hide()
    }
  }, [open])
  return (
    <div
      ref={modalRef}
      id={containerId}
      tabIndex={-1}
      aria-hidden="true"
      data-modal-backdrop="static"
      className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {
            title && (
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={onClose}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            )
          }
          <div className="p-6 space-y-6">
            {children}
          </div>
          {
            footer && (
              <div className="flex justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                {footer}
              </div>
            )
          }
        </div>
      </div>
    </div >

  )
}
Dialog.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string,
  footer: PropTypes.element,
  id: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default Dialog

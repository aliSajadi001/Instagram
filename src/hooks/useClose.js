import { useEffect } from 'react';
let useClose = (ref, cb) => {
  useEffect(() => {
    let listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      } else {
        cb();
      }
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref]);
};
export default useClose;

declare module 'toastify-js' {
  type ToastifyOptions = {
    text: string;
    position?: 'left' | 'right';
    className?: string;
    duration?: number;
    style?: Record<string, string>;
  }
  function Toastify(options: ToastifyOptions): {
    showToast: () => void;
  };
  export default Toastify;
}

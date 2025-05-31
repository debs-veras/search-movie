import { useRef } from "react";
import { Id, TypeOptions, toast as toastify } from "react-toastify";

type ToastType = TypeOptions | 'loading' | 'dismiss';

type toastLoadingProp = {
    mensagem?: string,
    tipo?: ToastType,
    isLoading?: boolean,
    onClose?: () => void
}

type useToastProp = (prop: toastLoadingProp) => void;

export default function useToastLoading(): useToastProp {
    const toastRef = useRef<Id | null>(null);

    function toast(props) {
        if (props.mensagem)
            props.mensagem = <div dangerouslySetInnerHTML={{ __html: props.mensagem }} />

        if (props.tipo) {
            if (props.tipo == 'dismiss') {
                toastify['dismiss'](props.mensagem);
                toastRef.current = null;
            } else {
                if (toastRef.current) {
                    toastify.update(toastRef.current, {
                        render: props.mensagem,
                        type: props.tipo,
                        autoClose: 5000,
                        isLoading: false,
                        closeButton: true,
                    });
                    setTimeout(props.onClose, 50);
                } else {
                    toastify[props.tipo](props.mensagem);
                }
            }
        } else {
            toastRef.current = toastify['loading'](props.mensagem)
        }
    }

    return toast;
}
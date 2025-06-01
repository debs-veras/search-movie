import React, { forwardRef, JSX } from 'react';
import { FaPrint } from 'react-icons/fa';
import classNames from '../../utils/classNames';

type Props = {
    id?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    carregando?: boolean,
    disabled?: boolean,
    tipo?: "erro" | "sucesso" | "padrao" | "aviso" | "impressao" | "informacao", //erro, aviso, sucesso, padrao, informacao
    texto?: string | JSX.Element,
    icone?: JSX.Element,
    className?: string,
    classNameText?: string,
    children?: JSX.Element | Array<JSX.Element> | string;
}

const Botao = forwardRef((props: Props, _) => {
    const {
        id,
        onClick,
        carregando = false,
        disabled = false,
        tipo, //erro, aviso, sucesso, padrao, informacao
        texto,
        icone,
        className = "",
        classNameText = "",
        children
    } = props

    return (
        <button
            id={id}
            type="button"
            onClick={onClick}
            className={classNames("relative flex flex-row gap-2 items-center text-sm font-medium rounded-md disabled:cursor-not-allowed",
                carregando && "grayscale-[50%] cursor-not-allowed ",
                tipo == "sucesso" && "bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white",
                tipo == "erro" && "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
                tipo == "padrao" && "border hover:bg-gray-50 hover:ring-white/30 focus:ring-white/10 border-gray-300 text-gray-700",
                tipo == "aviso" && "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 text-white",
                tipo == "impressao" && "bg-gray-600 hover:bg-gray-500 focus:ring-gray-500 text-white",
                tipo == "informacao" && "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white",
                tipo!=null && "px-4 py-2 shadow-sm",
                className
            )}
            disabled={carregando || disabled}
        >
            {/* <div className={`w-full flex gap-2 items-center ${!icone && "justify-center"}`}> */}
            <div className={`w-full flex gap-2 items-center justify-center `}>
                {
                    carregando ?
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        :
                        tipo == "impressao" ? <FaPrint /> : icone

                }

                {!!texto && <span className={classNames(classNameText)}>{texto}</span>}
                {children}
            </div>
        </button>

    )
}
)
export default Botao;
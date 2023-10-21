import loadingIcon from '../assets/loadingIcon.svg';

export function Loading() {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen bg-[#F37671]">
            <div className="animate-spin">
                <img src={loadingIcon} alt="loading-icon"/>
            </div>
            <p className="text-white h-2vh pl-6 m-6 text-3xl font-bold">Carregando...</p>
        </div>
    )
}
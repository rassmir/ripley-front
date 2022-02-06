import React, {Fragment, useEffect} from "react";
import {FaFemale, FaMale, FaUsers} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {getAll} from "../actions/generalActions";
import {ERROR_CLIENT, GET_ALL_CLIENTS, LOAD_CLIENT} from "../types/clientsTypes";

const Dashboard = () => {
    const dispatch = useDispatch();
    const {clients} = useSelector(state => state.clientsReducers);
    let female = 0;
    let male = [];
    useEffect(() => {
        dispatch(getAll('clients', LOAD_CLIENT, GET_ALL_CLIENTS, ERROR_CLIENT))
    }, [])
    clients.map((client) => {
        if (client.genre === 'male') {
              male.push('male')
        }
        female = clients.length - male.length;
    })
    return (
        <Fragment>
            <div>
                <h4 className="font-bold text-[32px] text-purple-800">Panel de Inicio</h4>
                <div className="grid md:grid-cols-3 md:gap-8 grid-cols-1 md:mt-4 mt-4">
                    <div className="bg-yellow-500 px-14 py-6 rounded-lg text-white">
                        <h4 className="text-center text-[24px] font-semibold">Usuario totales</h4>
                        <div className="flex items-center">
                            <FaUsers className="h-20 w-20"/>
                            <h2 className="font-black text-[60px] flex-1 text-center">{clients.length}</h2>
                        </div>
                    </div>
                    <div className="bg-purple-800 px-14 py-6 rounded-lg text-white md:mt-0 mt-4">
                        <h4 className="text-center text-[24px] font-semibold">Mujeres totales</h4>
                        <div className="flex items-center">
                            <FaFemale className="h-20 w-20"/>
                            <h2 className="font-black text-[60px] flex-1 text-center">{female}</h2>
                        </div>
                    </div>
                    <div className="bg-red-500 px-14 py-6 rounded-lg text-white md:mt-0 mt-4">
                        <h4 className="text-center text-[24px] font-semibold">Hombres totales</h4>
                        <div className="flex items-center">
                            <FaMale className="h-20 w-20"/>
                            <h2 className="font-black text-[60px] flex-1 text-center">{male.length}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Dashboard;